import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
// import { isIphoneX } from 'react-native-iphone-x-helper'
import ButtonItem from '../../component/button';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../../component/mapStyle';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';
import {useSelector, useDispatch} from 'react-redux';
import * as userService from '../../axios/user';
import {userSelectLP} from '../../src/action';

const Lock = props => {
  const loginReducer = useSelector(state => state.loginReducer);
  const userSelectLPReducer = useSelector(state => state.userSelectLPReducer);
  const userLoadingReducer = useSelector(state => state.userLoadingReducer);
  const {loading} = userLoadingReducer
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const devid = route.params.devid ? route.params.devid : null;
  const propsLPNo = route.params.LPNo ? route.params.LPNo : '';
  const [propsLP,setPropsLP] = useState(propsLPNo)
  const [locked,setLocked] = useState(false)
  const [list,setList] = useState([])
  const [LPNo,setLPNo] = useState('')
  const [paking,setParking] = useState([])
  const [region, setRegion] = useState({
    latitude: 25.0576375,
    longitude: 121.5461531,
    latitudeDelta: 0,
    longitudeDelta: 0.05,
  });
  const [buttonData, setButtonData] = useState({
    navigateTxt: 'Locked',
    buttonTxt: '確認上鎖我的機車',
  });
  const [flag,setFlag] = useState(true) 
  useEffect(()=>{
   
    if(loginReducer.login){
      dispatch(userSelectLP('','',''))
      if(list.length === 0){
        let req = {
          PhoneNo: loginReducer.phone,
          ptime: userService.time(),
        };
        userService
        .userQLPList(req)
        .then(res => {
          if (res.data.status === 0) {
              setList(res.data)
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
        let req2 = {
          PhoneNo: loginReducer.phone,
          devid:devid,
          ptime: userService.time(),
        };
        userService
        .userQDevice(req2)
        .then(res => {
          // console.log(res.data)
          if (res.data.status === 0) {
            setParking(res.data.data[0])
            setRegion({
              latitude: res.data.data[0].lat,
              longitude: res.data.data[0].lon,
              latitudeDelta: 0,
              longitudeDelta: 0.05,
            })
            if(res.data.data[0].Lock === '0'){
              setFlag(false)
            }
            if(res.data.data[0].Lock === '1'){
              let LPNo = res.data.data[0].LPNo
              if(LPNo === '0'){
                setFlag(false)
                setLocked(true)
                setButtonData({
                  navigateTxt: 'Locked',
                  buttonTxt: '確認綁定我的機車',
                });
                navigation.setOptions({title: '綁定車鎖與機車車牌'});
              }else if(LPNo === '1'){
                navigation.navigate('Parkey');
                Alert.alert(
                  '錯誤',
                  '此車鎖已上鎖，選擇其他車鎖綁定。',
                  [
                    {text: '確定'},
                  ]
                )
              }else{
                if(flag){
                  navigation.navigate('Parkey');
                  Alert.alert(
                    '錯誤',
                    '您已上鎖，車牌為:'+ LPNo,
                    [
                      {text: '確定'},
                    ]
                  )
                }
  
              }
            } 
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
      }else{       
        if(userSelectLPReducer.selectLP !== ''){
          if(propsLP !== ''){
            setLPNo(propsLP)
            list.forEach(item => {
              if(item.LPNo === propsLP){
                dispatch(userSelectLP(
                  item.LPNo,
                  item.LPNickname,
                  item.LPType
                ))
              }
            });
          }else{
            setLPNo(userSelectLPReducer.selectLP)
          }
        }
      }

    }
  },[userSelectLPReducer.selectLP])

  const data1 = {
    text1: '您要上鎖的機車車號為',
    text2: '選擇車牌',
    text3: LPNo,
    navigationTxt: 'License',
  };
  const data2 = {
    text1: '您的機車將上鎖在',
    text2: '重選地點',
    text3: paking.SC + ' 第'+paking.ParkNo +'號車格',
    navigationTxt: 'Camera',
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
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
        <View style={styles.container}>
          {locked ? (
            <View style={styles.message}>
              <Text style={styles.messageTxt}>
                您的機車已上鎖，若您要取回車輛，需先綁定車鎖與車牌。
              </Text>
            </View>
          ) : (
            <></>
          )}

          <Item data={data1} navigation={navigation} list={list} setPropsLP={setPropsLP}></Item>
          <Item data={data2} navigation={navigation} list={list} locked={locked} setPropsLP={setPropsLP}></Item>
          <View style={styles.bottomItem}>
            <View style={styles.bottomItemRow1}>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.bottomItemTxt3}>收費狀態 : 
                  {
                    paking.OpenState === 1 ? str4 = '營業中': '休息打烊'
                  }
                  </Text>
                  
                </View>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.bottomItemTxt3}>目前費率 : {paking.FeeRate}</Text>
                </View>
              </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
                flexDirection:'row',
                marginBottom:15
              }}>
              <Text style={styles.bottomItemTxt}>
                收費方式： 
              </Text>
              <Text style={styles.bottomItemTxt1}>
               {paking.BZTime}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
                flexDirection:'row',
                marginBottom:15
              }}>
              <Text style={styles.bottomItemTxt2}>
                備註： 
              </Text>
              <Text style={styles.bottomItemTxt1}>
               {paking.Remark}
              </Text>
            </View>
            <View style={styles.mapItem} pointerEvents="none">
              <MapView
                style={styles.map}
                provider={MapView.PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                initialRegion={region}
                region={region}>
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
      <View style={styles.buttonWrap}>
        <View style={styles.buttonBox}>
          <ButtonItem data={buttonData} navigation={navigation} paking={paking} lockData={{
            devid:devid,
            LPNo:LPNo
          }}></ButtonItem>
        </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonItem}
            onPress={() => {
              navigation.navigate('Parkey');
            }}>
            <Text style={styles.buttonItemTxt}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const Item = props => {
  const {navigation} = props;
  const {text1, text2, text3, navigationTxt} = props.data;
  const {list} = props;
  const {setPropsLP} = props;
  return (
    <>
      <View style={styles.topItem}>
        <View style={{width: '90%', paddingLeft: 5}}>
          <Text style={styles.text}>{text1}</Text>
        </View>
        <View
          style={{
            width: '90%',
            alignItems: 'flex-end',
            paddingRight: 5,
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              if(navigationTxt==='Camera') {
                navigation.goBack()
                return false
              }
              setPropsLP('')
              navigation.navigate(navigationTxt,{list:list});
            }}>
            {props.locked ? <></> : <Text style={styles.text2}>{text2}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.text3}>{text3}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: 10,
  },
  message: {
    width: '70%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTxt: {
    color: '#f00',
    fontSize: 16,
  },
  topItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#212121',
  },
  text2: {
    fontSize: 14,
    color: '#009378',
  },
  text3: {
    fontSize: 15,
    color: '#212121',
  },
  textWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c7c7cc',
  },
  bottomItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
    height: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    paddingTop:5,
  },
  bottomItemTxt: {
    width:'25%',
    paddingTop:5,
    paddingBottom:5,
    fontSize: 14,
    color: '#757575',
  },
  bottomItemTxt1: {
    width:'75%',
    paddingTop:5,
    paddingBottom:5,
    fontSize: 14,
    color: '#757575',
  },
  bottomItemTxt2: {
    width:'15%',
    paddingTop:5,
    paddingBottom:5,
    fontSize: 14,
    color: '#757575',
  },
  mapItem: {
    width: '100%',
    height: '80%',
    paddingTop: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fafafa',
    height:150,
    // position: 'absolute',
    // bottom: isIphoneX()? 60 : 20,
  },
  buttonBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:20
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
  bottomItemRow1: {
    width: '100%',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft:10,
    paddingRight:10
  },
  bottomItemTxt3: {
    color: '#757575',
    fontSize: 15,
    fontWeight:'bold'
  },
});
export default Lock;
