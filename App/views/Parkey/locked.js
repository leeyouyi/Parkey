import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper'
import ButtonItem from '../../component/button';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../../component/mapStyle';
import * as userService from '../../axios/user';
import {userSelectLP,userUpdateLP} from '../../src/action';
import store from '../../src/store';
import Modal from 'react-native-modalbox';


class Locked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 25.0576375,
        longitude: 121.5461531,
        latitudeDelta: 0,
        longitudeDelta: 0.05,
      },
      reload: false,
      Modal1_title: '中山南路二場',
      Modal1_description: '費率: 5元/1小時',
      Modal1_description2: '收費時間: 周一至周六 9:00至17:00',
      Modal2_title: '您確定現在要解鎖您的機車嗎',
      Modal2_description:
        '確認解鎖機車後Parkey智慧車鎖會立即解鎖，並且會立即開立停車單據。',
      pakingInfo: {},
      loading:false,
      LPNickname : '',
      selectLP : '',
      LPType: '',
    };
  }

  componentDidMount() {
    this.getApi();
  }
  getApi() {
    const loginReducer = store.getState().loginReducer;
    const {LPNo} = this.props.route.params.lockData;
    let req = {
      PhoneNo: loginReducer.phone,
      ptime: userService.time(),
    };
    userService
      .userQLPList(req)
      .then(res => {
        if (res.data.status === 0) {
          res.data.data.forEach(item => {
            if (item.LPNo === LPNo) {
              store.dispatch(
                userSelectLP(item.LPNo, item.LPNickname, item.LPType),
              );
              this.setState({LPNickname:item.LPNickname});
              this.setState({selectLP: item.LPNo});
              switch (item.LPType) {
                case 9:
                  this.setState({LPType: '輕型機車(綠牌)'});
                  break;
                case 109:
                  this.setState({LPType: '輕型機車(綠牌)，電動車'});
                  break;
                case 110:
                  this.setState({LPType: '普通重型機車(白牌)，電動車'});
                  break;
                default:
                  this.setState({LPType: '普通重型機車(白牌)'});
                  break;
              }
            }
            this.setState({reload: !this.state.reload});
          });
        } else {
          console.log(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    const devid = this.props.route.params.lockData
      ? this.props.route.params.lockData.devid
      : '';
    let req2 = {
      PhoneNo: loginReducer.phone,
      devid: devid,
      ptime: userService.time(),
    };
    userService
      .userQLockedDevice(req2)
      .then(res => {
        if (res.data.status === 0) {
          
          if(res.data.data[0].BeginTime){
            this.setState({Modal1_title:res.data.data[0].Area})
            this.setState({Modal1_description:`費率: ${res.data.data[0].FeeRate}`})
            this.setState({Modal1_description2:`收費時間: ${res.data.data[0].BZTime}`})
            let date = [];
            date[0] = res.data.data[0].BeginTime.substr(0, 4) || 0;
            date[1] = res.data.data[0].BeginTime.substr(4, 2) || 0;
            date[2] = res.data.data[0].BeginTime.substr(6, 2) || 0;
            date[3] = res.data.data[0].BeginTime.substr(8, 2) || 0;
            date[4] = res.data.data[0].BeginTime.substr(10, 2) || 0;
            let dateTxt =
              date[0] +
              '/' +
              date[1] +
              '/' +
              date[2] +
              ' ' +
              date[3] +
              ':' +
              date[4];
            let minute = res.data.data[0].ParkTime || 0;
            let hour = 0;
            let day = 0;
            if (minute > 60) {
              hour = parseInt(minute / 60);
              minute = minute % 60;
              if (hour > 24) {
                day = parseInt(hour / 24);
              }
            }
            this.setState({
              pakingInfo: {
                dateTxt: dateTxt,
                Amount: res.data.data[0].Amount,
                day: day,
                hour: hour,
                minute: minute,
              },
            });
          }else{
            const {route} = this.props;
            const devid = route.params.lockData.devid 
            let req3 = {
              PhoneNo: loginReducer.phone,
              devid:devid,
              ptime: userService.time(),
            };
            userService
            .userQDevice(req3)
            .then(res => {
              if (res.data.status === 0) {
                this.setState({
                  region: {
                    latitude: res.data.data[0].lat,
                    longitude: res.data.data[0].lon,
                    latitudeDelta: 0,
                    longitudeDelta: 0.05,
                  },
                })
              }else{
                console.log(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
          }
        } else {
          console.log(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const userInfoReducer = store.getState().userInfoReducer;
    const userUpdateLPReducer = store.getState().userUpdateLPReducer;
    const dispatch = store.dispatch;
    const {navigation, route} = this.props;
    const lockData = route.params.lockData ? route.params.lockData : '';
    const paking = route.params.paking ? route.params.paking : '';
    const region = route.params.region ? route.params.region : this.state.region;
    const buttonData = {
      navigateTxt: 'Parkey',
      buttonTxt: '解鎖機車',
    };
    const loading = this.state.loading
    const LPNickname = this.state.LPNickname
    const selectLP = this.state.selectLP
    const devid = route.params.lockData.devid 
    return (
      <>
        <Modal
          style={styles.modal}
          ref={'modal'}
          isOpen={false}
          coverScreen={true}
          position={'center'}>
          <View
            style={{
              width: '100%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.modalItem}>
              <Text style={styles.modalTitle}>{this.state.Modal1_title}</Text>
            </View>
            <View style={styles.modalItem2}>
              <Text style={styles.modalTxt}>
                {this.state.Modal1_description}
              </Text>
              <Text style={styles.modalTxt}>
                {this.state.Modal1_description2}
              </Text>
            </View>
          </View>
          <View style={styles.modalButtonIRow}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                this.refs.modal.close();
              }}>
              <Text style={styles.modalButtonTxt}>知道了</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          style={styles.modal}
          ref={'modal2'}
          isOpen={false}
          coverScreen={true}
          position={'center'}>
          <View
            style={{
              width: '100%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position:'absolute',
                zIndex:2,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 90,
              }}>
              <ActivityIndicator size="large" color="#ff9500" />
            </View>
          ) : (
            <></>
          )} 
            <View style={styles.modalItem}>
              <Text style={styles.modalTitle}>{this.state.Modal2_title}</Text>
            </View>
            <View style={styles.modalItem2}>
              <Text style={styles.modalTxt}>
                {this.state.Modal2_description}
              </Text>
            </View>
          </View>
          <View style={styles.modalButtonIRow}>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={() => {
                this.refs.modal2.close();
              }}>
              <Text style={styles.modalButtonTxt}>先不要</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                this.setState({loading:true})
                unlockDevice(
                  userInfoReducer.phone,
                  lockData,
                  navigation,
                  buttonData.navigateTxt,
                  dispatch,
                  userUpdateLPReducer,
                  this,
                  devid
                );
              }}>
              <Text style={styles.modalButtonTxt}>確認解鎖</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.titleItemWrap}>
              <View style={styles.titleItemTop}>
                <Text style={styles.titleTxtTop}>目前停放</Text>
              </View>
              <View style={styles.titleItem}>
                <Text style={styles.titleTxt}>
                  {LPNickname}
                </Text>
                <Text style={styles.titleTxt1}>
                  {selectLP}
                </Text>
              </View>
            </View>
            <TxtItem
              LPType={this.state.LPType}
              paking={paking}
              this={this}
              navigation={navigation}
              pakingInfo={this.state.pakingInfo}
            />
            <View style={styles.mapWrap} pointerEvents="none">
              <View style={styles.mapItem}>
                <MapView
                  style={styles.map}
                  provider={MapView.PROVIDER_GOOGLE}
                  customMapStyle={mapStyle}
                  initialRegion={region}
                  region={region}
                  >
                  <Marker
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    title="Demo"
                    description="A location to test">
                    <SvgXml xml={Svgs.mark} width="50" height="50" />
                  </Marker>
                </MapView>
              </View>
            </View>

          </View>
        </ScrollView>
          <View style={styles.button}>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonItem}
                onPress={() => {
                  navigation.navigate('Parkey');
                  store.dispatch(userUpdateLP(true));
                }}>
                <Text style={styles.buttonItemTxt}>所有停放</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrap}>
              <ButtonItem
                  data={buttonData}
                  navigation={navigation}
                  lockData={lockData}
                  modal2={this.refs.modal2}
              />
            </View>

          </View>
      </>
    );
  }
}

const TxtItem = props => {
  const {LPType, paking, pakingInfo} = props;
  const propsThis = props.this;
  useEffect(() => {
    if (pakingInfo.day === undefined) {
      pakingInfo.day = 0;
      pakingInfo.hour = 0;
      pakingInfo.minute = 0;
    }
  }, []);
  const data = [
    {
      txt: '車種',
      txt1: LPType,
      space: true,
      spaceTxt: '顯示場域費率與時段',
    },
    {
      txt: '停放場域',
      txt1: paking.SC,
      txt2: '顯示場域費率與時段',
    },

    {
      txt: '停放車格編號',
      txt1: '第' + paking.ParkNo + '號車格',
    },
    {
      txt: '開始停放時間',
      txt1: pakingInfo.dateTxt?pakingInfo.dateTxt:0,
    },
    {
      txt: '累計停放時長',
      txt1: `${pakingInfo.day}天 ${pakingInfo.hour}小時${pakingInfo.minute}分`,
    },
    {
      txt: '目前累計費用',
      txt1: pakingInfo.Amount ? pakingInfo.Amount + '元' : 0 +'元',
      payTxt: '您尚未繳交停車費',
      payTxt2: '已完成繳費',
    },
  ];
  return (
    <>
      {data.map(item => {
        return (
          <>
            <View style={styles.txtItemWrap}>
              <View style={styles.txtItem}>
                <View>
                  <Text style={styles.txtItemTxt}>{item.txt}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.txtItemTxt}>{item.txt1}</Text>
                </View>
              </View>
            </View>
            {item.space ? (
              <TouchableOpacity
                style={styles.spaceItemWrap}
                onPress={() => {
                  propsThis.refs['modal'].open();
                }}>
                  <View style={styles.spaceItem}>
                    <Text style={styles.spaceTxt}>顯示場域費率與時段</Text>
                  </View>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </>
  );
};

//解鎖機車
const unlockDevice = (phone, lockData, navigation, navigateTxt, dispatch, userUpdateLPReducer,component,devid) => {
  const {updateLP} =userUpdateLPReducer
  let req = {
    PhoneNo: phone,
    devid: parseInt(lockData.devid),
    LPNo: lockData.LPNo,
    ptime: userService.time(),
  };
  userService
    .userUnlockDevice(req)
    .then(res => {
      if (res.data.status === 0) {
        // navigation.navigate(navigateTxt,{reload:true});
        
        dispatch(userUpdateLP(true))
        let req2 = {
          PhoneNo: phone,
          devid:devid,
          ptime: userService.time(),
        };
        userService
        .userQDevice(req2)
        .then(res => {
          // console.log(res.data)
          if (res.data.status === 0) {
            let {TicketNo} = res.data.data[0]
            // console.log(TicketNo)
            let req3 = {
              PhoneNo: phone,
              ptime: userService.time(),
            };
            userService
            .userQTickets(req3)
            .then(res => {
              // console.log(res.data)
              if (res.data.status === 0) {
                let data = res.data.data
                let filterData = data.filter(item=>{
                  return item.TicketNo === TicketNo
                })
                // console.log(filterData)
                filterData.forEach(item=>{
                  let date = [];
                  date[0] = item.BeginTime.substr(0, 4);
                  date[1] = item.BeginTime.substr(4, 2);
                  date[2] = item.BeginTime.substr(6, 2);
                  date[3] = item.BeginTime.substr(8, 2);
                  date[4] = item.BeginTime.substr(10, 2);
                  let dateTxt =
                    date[0] +
                    '/' +
                    date[1] +
                    '/' +
                    date[2] +
                    ' ' +
                    date[3] +
                    ':' +
                    date[4];
                  let pay = item.PStatus === 1 ? true : false;
                  navigation.navigate('Ticket', {
                    pay: pay,
                    tickInfo:{
                      TicketNo:item.TicketNo,
                      SC:item.SC,
                      ParkNo:item.ParkNo,
                      lat:item.lat,
                      lon:item.lon,
                      Amount:item.Amount,
                      BeginTime:dateTxt,
                      ParkTime:item.ParkTime,
                      LpNo:item.LPNo,
                      Nick:item.Nick,
                      CarType:item.CarType,
                      Area:item.Area,
                      FeeRate:item.FeeRate,
                      BZTime:item.BZTime
                    }
                  });
                  component.setState({loading:false})
                  component.refs.modal2.close();
                })

              }
            })
            .catch(err => {
              console.log(err);
            });

          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        console.log(res.data.msg);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalItem: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem2: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    width: '100%',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  modalTxt: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  modalButtonIRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#DEDFE0',
    borderTopWidth: 1,
  },
  modalButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton1: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton2: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#DEDFE0',
    borderLeftWidth: 1,
  },
  modalButtonTxt: {
    color: '#6DA0F3',
    fontSize: 22,
  },
  scrollView: {
    backgroundColor: '#EFEFF5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // height: Dimensions.get('window').height - 90,
  },
  titleItemWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#fafafa',
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1,
  },
  titleItemTop: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  titleTxtTop: {
    fontSize: 25,
    color: '#5c5c5c',
    textAlign: 'center',
  },
  titleItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 5,
  },
  titleTxt: {
    fontSize: 20,
    color: '#5c5c5c',
    textAlign: 'center',
  },
  titleTxt1: {
    fontSize: 20,
    color: '#1ee494',
    textAlign: 'center',
    paddingLeft: 10,
  },
  txtItemWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:60,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1,
  },
  txtItem: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  txtItemTxt: {
    fontSize: 14,
    color: '#5c5c5c',
  },
  spaceItemWrap: {
    width: '100%',
    height: 30,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceItem: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '90%',
    height: 30,
    paddingBottom: 5,
  },
  spaceTxt: {
    fontSize: 12,
    color: '#009378',
  },
  button: {
    width: '100%',
    height: 100,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor:'#fff'
    // position: 'absolute',
    // bottom: isIphoneX()? 60 : 20,
  },
  buttonWrap:{
    width:'45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#E5E5EB',
    borderRadius: 20,
  },
  buttonItemTxt: {
    fontSize: 18,
    color: '#7C7C7E',
  },
  mapWrap: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    marginTop: 5,
  },
  mapItem: {
    width: '90%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default Locked;
