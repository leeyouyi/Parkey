import React, {useState, useEffect} from 'react';
import {
  StyleSheet, 
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import ButtonItem from '../../component/button';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../../component/mapStyle';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';
import Modal from 'react-native-modalbox';

class Ticket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 25.0576375,
        longitude: 121.5461531,
        latitudeDelta: 0,
        longitudeDelta: 0.05,
      },
      type:'',
      Modal1_title: '中山南路二場',
      Modal1_description: '費率: 5元/1小時',
      Modal1_description2: '收費時間: 周一至周六 9:00至17:00',
    }
  }

  componentDidMount() {
    const {route} = this.props;
    const {tickInfo} = route.params;
    this.setState({Modal1_title:tickInfo.Area})
    this.setState({Modal1_description:`費率: ${tickInfo.FeeRate}`})
    this.setState({Modal1_description2:`收費時間: ${tickInfo.BZTime}`})
    this.setState({
      region:{
        latitude: tickInfo.lat,
        longitude: tickInfo.lon,
        latitudeDelta: 0,
        longitudeDelta: 0.05,
      }
    })
    switch (tickInfo.CarType) {
      case '9':
        this.setState({type:'輕型機車(綠牌)'})
        break;
      case '109':
        this.setState({type:'輕型機車(綠牌)，電動車'})
        break;
      case '110':
        this.setState({type:'普通重型機車(白牌)，電動車'});
        break;
      case '10':
        this.setState({type:'普通重型機車(白牌)'});
        break;
    }
  }
  render(){
    const {navigation, route} = this.props;
    const {pay} = route.params;
    const {tickInfo} = route.params;
    const mapHight = pay ? styles.mapWrap2 : styles.mapWrap;
    const buttonData = {
      navigateTxt: 'GoPay',
      buttonTxt: '繳交停車費',
    };
    const type = this.state.type
    const region = this.state.region
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
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.titleItemWrap}>
              <View style={styles.titleItem}>
                <Text style={styles.titleTxt}>{tickInfo.Nick}</Text>
                <Text style={styles.titleTxt1}>{tickInfo.LpNo}</Text>
              </View>
            </View>
            <TxtItem pay={pay} tickInfo={tickInfo} type={type} this={this}></TxtItem>
            <View style={mapHight}>
              <View style={styles.mapItem} pointerEvents="none">
                <MapView
                  style={styles.map}
                  provider={MapView.PROVIDER_GOOGLE}
                  customMapStyle={mapStyle}
                  initialRegion={region}>
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
        
          {!pay ? (
            <View style={styles.button}>
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonItem}
                  onPress={() => {
                    navigation.navigate('List');
                  }}>
                  <Text style={styles.buttonItemTxt}>所有紀錄</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonWrap}>
                <ButtonItem
                  data={buttonData}
                  navigation={navigation}
                  tickInfo={tickInfo}
                  ></ButtonItem>
              </View>
            </View>
          ) : (
          <></>
          )}

      </>
    )
  }

};
const TxtItem = props => {
  const {pay} = props;
  const {tickInfo} = props;
  const {type} = props;
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const propsThis = props.this;

  useEffect(()=>{
    let _minute = tickInfo.ParkTime || 0;
    let _hour = 0;
    let _day = 0;
    if (_minute > 60) {
      _hour = parseInt(_minute / 60);
      _minute = _minute % 60;
      if (_hour > 24) {
        _day = parseInt(_hour / 24);
      }
    }
    setDay(_day)
    setHour(_hour)
    setMinute(_minute)
  },[])

  const data = [
    {
      txt: '停車單號',
      txt1: tickInfo.TicketNo,
      txt2: '前往北市停管處網站查詢',
      space: true,
      uri:true
    },
    {
      txt: '停放場域',
      txt1: tickInfo.SC,
      txt2: '顯示場域費率與時段',
      model:true
    },
    {
      txt: '停放車格編號',
      txt1: `第${tickInfo.ParkNo}號車格`,
    },
    {
      txt: '車種',
      txt1: type,
    },
    {
      txt: '開始停放時間',
      txt1: tickInfo.BeginTime,
    },
    {
      txt: '累計停放時長',
      txt1: `${day}天 ${hour}小時${minute}分`,
    },
    {
      txt: '總計停車費用',
      txt1: `${tickInfo.Amount} 元`,
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
                  {item.txt2 ? 
                  item.uri ? (
                    <TouchableOpacity
                    onPress={()=>{
                      Linking.openURL('https://parkingfee.pma.gov.taipei/')
                    }}
                    >
                      <Text style={styles.txtItemTxt1}>{item.txt2}</Text>
                    </TouchableOpacity>
                  )
                  :
                  // item.model?(
                  //   <TouchableOpacity
                  //   onPress={()=>{
                  //     propsThis.refs['modal'].open();
                  //   }}
                  //   >
                  //     <Text style={styles.txtItemTxt1}>{item.txt2}</Text>
                  //   </TouchableOpacity>
                  // )
                  // :
                  // (
                    
                    <Text style={styles.txtItemTxt1}>{item.txt2}</Text>
                  // ) 
                  : (
                    <></>
                  )}
                  {item.payTxt && !pay ? (
                    <Text style={styles.txtItemTxt2}>{item.payTxt}</Text>
                  ) : item.payTxt2 && pay ? (
                    <Text style={styles.txtItemTxt1}>{item.payTxt2}</Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
            {item.space ? (
              <View
                style={{
                  width: '100%',
                  height: 10,
                  backgroundColor: '#fafafa',
                }}></View>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </>
  );
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
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // height: Dimensions.get('window').height - 90,
  },
  titleItemWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height:70,
    backgroundColor: '#fafafa',
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1,
  },
  titleItem: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  svgItem: {
    justifyContent: 'center',
    alignItems: 'center',
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
    height:55,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1,
  },
  txtItem: {
    width: '90%',
    padding: 5,
    paddingTop: 8,
    paddingBottom: 8,
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
  txtItemTxt1: {
    fontSize: 12,
    color: '#009378',
  },
  txtItemTxt2: {
    fontSize: 12,
    color: '#ff3b30',
  },
  button: {
    width: '100%',
    height:100,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // position: 'absolute',
    // bottom: isIphoneX()? 60 : Platform.OS === 'ios' ? 0 : 20,
  },
  mapWrap: {
    width: '100%',
    height: Dimensions.get('window').height < 600 ? 70 : 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    marginTop: 15,
  },
  mapWrap2: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  mapItem: {
    width: '90%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
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
});
export default Ticket;
