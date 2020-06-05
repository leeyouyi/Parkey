import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper'
import FootItem from '../../component/footer';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../../component/mapStyle';
import {useSelector, useDispatch} from 'react-redux';
import * as userService from '../../axios/user';
import {userUpdateLP,login,userinfo} from '../../src/action';

const Parkey = props => {
  const userUpdateLPReducer = useSelector(state => state.userUpdateLPReducer);
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const dispatch = useDispatch();
  const loginReducer = useSelector(state => state.loginReducer);
  const {navigation, route} = props;
  const num = 1;
  const [hasLock, setHasLock] = useState(true);
  const [list, seList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({});
  const [reload, seReload] = useState(false);

  useEffect(() => {
      AsyncStorage.multiGet(['token', 'login_phone','login_pw','random']).then((data)=>{
        let token = data[0][1] || null;
        if (token == 'asdfghjkl410') {
          let phone = data[1][1]
          let password = data[2][1]
          let random = data[3][1]
          let req = {
            PhoneNo: phone,
            Password: password,
            ptime: userService.time(),
          };
          userService
          .userLogin(req)
          .then(res => {
            if (res.data.status === 0) {
              dispatch(login(true, phone, password,random));
              let req2 = {
                PhoneNo: phone,
                ptime: userService.time(),
              };
              userService
                .userQMemberInfo(req2)
                .then(res => {
                  if (res.data.status === 0) {
                    let {UName, email, FName, PID} = res.data;
                    dispatch(userinfo(UName, FName, phone, email, PID,userInfoReducer.status));
                  }
                })
                .catch(err => {
                  console.log(err);
                })
              } 
            })
          .catch(err => {
            console.log(err);
          })      
        }
      });
    if (loginReducer.login) {
      getApi(loginReducer,seList,setLoading,reload,seReload,setHasLock)
    }
  }, [loginReducer.login]);
  useEffect(() => {
    if(userInfoReducer.status === 4){
      navigation.navigate('Verification');
    }
    if(userUpdateLPReducer.updateLP){
      getApi(loginReducer,seList,setLoading,reload,seReload,setHasLock)
      dispatch(userUpdateLP(false))
    }
  }, [userUpdateLPReducer.updateLP]);
  useEffect(()=>{
    if(userInfoReducer.status){
      getApi(loginReducer,seList,setLoading,reload,seReload,setHasLock)
    }
  },[userInfoReducer.status])
  return (
    <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.leftItem}>
                  <Text style={styles.leftItemTxt}>正在上鎖的機車</Text>
                </View>

                {hasLock ? (

                  <ListItem
                    navigation={navigation}
                    setRegion={setRegion}
                    setHasLock={setHasLock}
                    list={list}
                    loading={loading}
                  />
                ) : (
                  <View style={styles.topItem}>
                    <Text style={styles.topItemTxt}>您目前沒有綁定任何車輛</Text>
                  </View>
                )}
            </View>
          </ScrollView>

      <View style={styles.qrItemWrap}>
            <View style={styles.qrItem}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  let req = {
                    PhoneNo: loginReducer.phone,
                    ptime: userService.time(),
                  };
                  userService
                  .userQLPList(req)
                  .then(res => {
                    if (res.data.status === 0) {
                      if(!res.data.data){
                        alert('請先設定車牌')
                        navigation.navigate('Edit');
                      }else{
                        navigation.navigate('Camera');
                      }
                    }else{
                      console.log(res.data.msg);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });

                }}>
                <SvgXml
                  xml={Svgs.qrcode}
                  width="25"
                  height="25"
                  style={{marginRight: 10}}
                />
                <Text style={styles.qrTxt}>掃QRCODE新綁定機車</Text>
              </TouchableOpacity>
            </View>
          </View> 
      <FootItem navigation={navigation} num={num} />         
    </>
  );
};

const ListItem = props => {
  const {navigation} = props;
  const {list} = props;
  const {loading} = props;

  return (
    <>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color="#ff9500" />
        </View>
      ) : (
        <></>
      )}

      {list.length !== 0 ? (
        list.map((item, index) => {
          let region = {
            latitude: item.Lat,
            longitude: item.Lon,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          };
          return (
            <>
              <TouchableOpacity
                style={styles.itemWrap}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('Locked', {
                    devid: item.devid,
                    LPNo: item.txt1,
                    paking: {
                      SC: item.SC,
                      ParkNo: item.ParkNo,
                    },
                    lockData: {
                      devid: item.devid,
                      LPNo: item.txt1,
                    },
                    region: region,
                  });
                }}>
                <View style={styles.item}>
                  <View style={styles.row1}>
                    <View style={styles.row3}>
                      <Text style={styles.txt1}>{item.txt1}</Text>
                    </View>
                    <View>
                      <Text style={styles.txt4}>{item.txt4}</Text>
                    </View>
                  </View>
                  <View style={styles.row2}>
                    <Text style={styles.txt2}>{item.txt2}</Text>
                    <Text style={styles.txt3}>{item.txt3}</Text>
                  </View>
                  <View style={styles.mapItem} pointerEvents="none">
                    <MapView
                      style={styles.map}
                      provider={MapView.PROVIDER_GOOGLE}
                      customMapStyle={mapStyle}
                      initialRegion={region}
                    >
                      <Marker
                        coordinate={{
                          latitude: item.Lat,
                          longitude: item.Lon,
                        }}
                        title="您的位置"
                      >
                        <SvgXml xml={Svgs.mark} width="30" height="30" />
                      </Marker>
                    </MapView>
                  </View>
                </View>
              </TouchableOpacity>
            
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
const  getApi = (loginReducer,seList,setLoading,reload,seReload,setHasLock)=>{

  const listData = [];
  let req = {
    PhoneNo: loginReducer.phone,
    ptime: userService.time(),
  };
  userService
    .userQBoundDevices(req)
    .then(res => {
      if (res.data.status === 0) {
        if (!res.data.data) setHasLock(false);
        if (res.data.data) setHasLock(true);
        let lockList = res.data.data;
        let count = 0;
        if(res.data.data){
          lockList.forEach(item => {
            let req2 = {
              PhoneNo: loginReducer.phone,
              devid: item.devid,
              ptime: userService.time(),
            };
            userService
              .userQDevice(req2)
              .then(res2 => {
                if (res2.data.status === 0) {
                  for (let i = 0; i < res2.data.data.length; i++) {
                    let paking = res2.data.data[i];
                    let BStatus = '';
                    switch (item.BStatus) {
                      case 0:
                        BStatus = '處理中';
                        break;
                      case 1:
                        BStatus = '上鎖中';
                        break;
                      case 2:
                        BStatus = '未上鎖';
                      case 3:
                        BStatus = '已解鎖';
                    }
                    let date = [];
                    date[0] = item.BTime.substr(0, 4);
                    date[1] = item.BTime.substr(4, 2);
                    date[2] = item.BTime.substr(6, 2);
                    date[3] = item.BTime.substr(8, 2);
                    date[4] = item.BTime.substr(10, 2);
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
                    let data = {
                      txt1: item.LPNo,
                      txt2: paking.SC + ' 第' + paking.ParkNo + '號車格',
                      txt3: dateTxt,
                      txt4: BStatus,
                      devid: item.devid,
                      SC: paking.SC,
                      ParkNo: paking.ParkNo,
                      Lat: item.Lat,
                      Lon: item.Lon,
                    };
                    count += 1;
                    listData.push(data);
                  }
                  if (count === res.data.data.length) {
                    setLoading(false);
                    seList(listData);
                    seReload(!reload);
                  }
                } else {
                  console.log(res.data.msg);
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        }

      }else {
        if(res.data.msg !== '會員尚未認證'){
          if(res.data.msg === '錯誤的登入資訊'){
            console.log(res.data.msg);
          }else{
             Alert.alert('錯誤', res.data.msg, [{text: '確定'}])
          }
        }
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err);
    });
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#EFEFF5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF5',

  },
  leftItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: '5%',
    marginTop: 10,
    marginBottom: 5,
  },
  leftItemTxt: {
    fontSize: 25,
    color: '#5c5c5c',
  },
  topItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: (Dimensions.get('window').height - 200) / 2,
  },
  topItemTxt: {
    fontSize: 20,
    color: '#757575',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  qrItemWrap: {
    width: '90%',
    height:60,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // position: 'absolute',
    bottom: isIphoneX() ? 90:20,
    left:10,
  },
  qrItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',

  },
  qrTxt: {
    color: '#ff9500',
    fontSize: 16,
  },
  itemWrap: {
    width: '100%',
    height:'90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    // height: '25%',
    height: 150,
  },
  item: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 15,
    marginTop: 10,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: 14,
    color: '#5c5c5c',
  },
  txt2: {
    fontSize: 12,
    color: '#5c5c5c',
    paddingTop: 5,
  },
  txt3: {
    fontSize: 12,
    color: '#757575',
    paddingTop: 5,
  },
  txt4: {
    width: 60,
    height: 20,
    fontSize: 12,
    color: '#1ee494',
    textAlign: 'right',
    textAlignVertical: 'center',
  },

  mapItem: {
    width: '100%',
    height: '60%',
    paddingTop: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default Parkey;
