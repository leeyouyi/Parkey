/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  PermissionsAndroid,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../img/icon/new/svgs';
import mapSvgs from '../img/icon/map/svgs';
import navSvgs from '../img/icon/nav/svgs';
import MapView, {Marker} from 'react-native-maps';
import FootItem from '../component/footer';
import mapStyle from '../component/mapStyle';
// import Modal from 'react-native-modalbox';
import Geolocation from '@react-native-community/geolocation';
import * as userService from '../axios/user';
import store from '../src/store'
import {login,userinfo} from '../src/action';
import Modal from '../component/modalbox'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      displayType:'none',
      mapType:'standard',
      showsTraffic:false,
      login:false,
      value: '',
      origin:{
        latitude: 25.0576375,
        longitude: 121.5461531,
        latitudeDelta: 0,
        longitudeDelta: 0.05,
      },
      region: {
        latitude: 25.0576375,
        longitude: 121.5461531,
        latitudeDelta: 0,
        longitudeDelta: 0.05,
      },
      list:[],
      info:[],
      infoTest:[],
      userParking:[],
      predictions:[],
      marker:false,
      loading:false,
      northWest:0,
      southEast:0,
      typeAry:[
        {txt:'預設',type:'standard',active:true},
        {txt:'衛星',type:'hybrid',active:false},
        {txt:'地形',type:'terrain',active:false},
        {txt:'街道',active:false},
      ],
      random:null
    };
  }
  _login_event(){
    const loginReducer =  store.getState().loginReducer
    if(!loginReducer.login){
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
              store.dispatch(login(true, phone, password,random));
              let req2 = {
                PhoneNo: phone,
                ptime: userService.time(),
              };
              userService
                .userQMemberInfo(req2)
                .then(res => {
                  if (res.data.status === 0) {
                    let {UName, email, FName, PID} = res.data;
                    store.dispatch(userinfo(UName, FName, phone, email, PID));
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
        }else{
          this.setState({userParking:[]})
        }
      });
    }

  }

  async requestLocationPermission() {
    if(Platform.OS === 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Example App',
            message: 'Example App access to your location ',
          },
        );

      } catch (err) {
        console.warn(err);
      }
    }
  }
  getSnapshotBeforeUpdate(){
    const loginReducer =  store.getState().loginReducer
    if(this.state.random !== loginReducer.random){
      this.getApi()
    }
  }
  componentDidMount() {
    this._login_event()
    this.requestLocationPermission();
    Geolocation.getCurrentPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta:0,
        longitudeDelta: 0.05
      };
      this.setState({region: region})
      this.setState({origin: region})
    })
    this.getApi()
  }
  getApi(northWest,southEast,region) {
      const loginReducer =  store.getState().loginReducer
      this.setState({random:loginReducer.random})
      let lat1 = northWest ? northWest.latitude : 25.043885
      let Lon1 = northWest ? northWest.longitude : 121.556940
      let Lat2 = southEast ? southEast.latitude : 25.031739
      let Lon2 = southEast ? southEast.longitude : 121.574879
      this.store = store.getState()
      let userInfoReducer =  this.store.userInfoReducer
      let req = {
        PhoneNo: '',
        Lat1: lat1,
        Lon1: Lon1,
        Lat2: Lat2,
        Lon2: Lon2,
        QType: 0,      
        ptime: userService.time()
      }
      userService.userQMapPinList(req)
      .then(res => {
        if (res.data.status === 0) {
          let resAry=[]
          let resData = res.data.data
           resData.forEach(el => {
            resAry[el.ID]= el
           });
          this.setState({list: resAry})
          // this.setState({list: res.data.data})
          let list = this.state.list
          let ary = []
          list.forEach(item=>{
            let req2 = {
              PhoneNo: '',
              ID:item.ID,
              QType: 0,          
              ptime: userService.time()
            }
            userService.userQMapPin(req2)
            .then(res => {
              if (res.data.status === 0) {
                let data ={ ...res.data,ID:item.ID}
                // ary.push(data)
                ary[item.ID] = data
                this.setState({info: ary})
              }
            })
            .catch(err => {
              console.log(err)
            })
          })
        }
        this.setState({loading: false})
      })
      .catch(err => {
        console.log(err)
      })
      let req3 = {
        PhoneNo: userInfoReducer.phone,     
        ptime: userService.time()
      }
      userService.userQBoundDevices(req3)
      .then(res => {
        if (res.data.status === 0) {
          this.setState({userParking:res.data.data})

        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  async onChangeText(text){
    this.setState({value: text});
    const apiKey = 'AIzaSyABrh0f0n7vEMeO-GD634bnsm19UGHfUls'
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}&language=zh-TW
    &location=${this.state.region.latitude},${this.state.region.longitude}&origin=${this.state.region.latitude},${this.state.region.longitude}&radios=100`;
    try{
      const result = await fetch(apiUrl)
      const json = await result.json()
      this.setState({
        predictions:json.predictions
      })
    }catch(err){
      console.error(err)
    }
  }
  async getposition(place_id){
    const apiKey = 'AIzaSyABrh0f0n7vEMeO-GD634bnsm19UGHfUls'
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${apiKey}`;
    try{
      const result = await fetch(apiUrl)
      const json = await result.json()
      let location = json.results[0].geometry.location

      this.map.animateToRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0,
          longitudeDelta: 0.05,
      })
      this.setState({
        marker:{
          latitude: location.lat,
          longitude: location.lng,
        }
      })
      Keyboard.dismiss()

    }catch(err){
      console.error(err)
    }
  }
  render() {
    const {navigation} = this.props;
    const num = 0;
    const list =this.state.list
    const info = this.state.info
    const strAry = []
    const strAry2 = []
    const userParking = this.state.userParking
    const predictions = this.state.predictions
    const marker = this.state.marker
    const loading = this.state.loading
    const typeAry = this.state.typeAry
    return (
      <>
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
        <Modalbox></Modalbox>

        {
          list.map((item,index)=>{
            let str = !info[index] ? '' : info[index].BZTime
             strAry[index] = str ? str.split('') : ''
            let str2 = !info[index] ? '' : info[index].FeeRate
            strAry2[index] = str2 ? str2.split('') : ''
            return(
              <Modal
              style={styles.modal2}
              ref={'modal'+item.ID}
              isOpen={false}
              position={'bottom'}
              backdropOpacity={0.5}
              top={ Dimensions.get('window').height * 0.6}
              >
   
              <View style={styles.modal2Wrap}>
                <View style={styles.modal2Item}>
                  <Text style={styles.modal2Txt}>{ !info[index] ? '' : info[index].SC}</Text>
                  {/* <Text style={styles.modal2Txt}>{ !info[index] ? '' : info[index].ID}</Text> */}
                  {/* <Text style={styles.modal2Txt}>{ !info[index] ? '' : info[index].ID }</Text> */}
                  <TouchableOpacity style={styles.modal2Button}
                  onPress={()=>{
                    const loginReducer =  store.getState().loginReducer
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <SvgXml xml={Svgs.start} width="20" height="20" />
                      <Text style={styles.modal2ButtonTxt}>開始使用</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.modal2Item2}>
                  <Text style={styles.modal2Txt2}>剩餘車位</Text>
                </View>
                <View style={styles.modal2Row}>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.modal2Txt3}>一般車位 : { !info[index] ? 0 : info[index].FreeSp}席</Text>
                    
                  </View>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.modal2Txt3}>殘障車位 : { !info[index] ? 0 : info[index].FreeHandicapeSp}席</Text>
                  </View>
                </View>

                
                <View style={styles.modal2Row2}>
                  <Text style={styles.modal2Txt4}>收費時段:周</Text>
                  <Text style={styles.modal2Txt5}>{strAry[index][1]}</Text>
                  <Text style={styles.modal2Txt4}>至周</Text>
                  <Text style={styles.modal2Txt5}>{strAry[index][4]}</Text>
                  <Text style={styles.modal2Txt4}>，</Text>
                  <Text style={styles.modal2Txt5}>{strAry[index][5]}</Text>
                  <Text style={styles.modal2Txt4}>至</Text>
                  <Text style={styles.modal2Txt5}>{strAry[index][8]}{strAry[index][9]}</Text>
                  <Text style={styles.modal2Txt4}>時 </Text>
                  <Text style={styles.modal2Txt4}> 停車費率:每小時</Text>
                  <Text style={styles.modal2Txt5}>{strAry2[index][0]}{strAry2[index][1]}</Text>
                  <Text style={styles.modal2Txt4}>元</Text>
                </View>
              </View>

            </Modal>
            )
          })
        }

        <View style={styles.searchWrap}>
          <View style={styles.search}>
            <View style={styles.svgItem}>
              <SvgXml xml={Svgs.map_search} width="18" height="18" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="搜尋車位地點"
              placeholderTextColor="#d1d1d6"
              onChangeText={text => {
                this.setState({display: 'flex'});
                this.onChangeText(text)
              }}
              value={this.state.value}
            />

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 15,
                display: this.state.display,
              }}
              onPress={() => {
                this.setState({display: 'none'});
                this.setState({value: ''});
                this.setState({
                  predictions:[]
                })
                this.setState({marker: false});
                Keyboard.dismiss()
              }}>
              <SvgXml xml={navSvgs.close} width="18" height="18" />
            </TouchableOpacity>
          </View> 
        </View>
        <View style={{
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 9,
          top: 60,
          left: '5%',
          backgroundColor:'#fff',
          borderRadius:10
        }}>
          {predictions.map( prediction => {
              return (
                <TouchableOpacity
                style={{
                  width:'100%'
                }}
                onPress={()=>{
                  this.getposition(prediction.place_id)
                  this.setState({value: ''});
                  this.setState({
                    predictions:[]
                  })
                 }}>
                  <Text style={{
                    width:'100%',
                    padding:10,
                    borderBottomColor:'#ccc',
                    borderBottomWidth:1
                  }} key={prediction.id}>{prediction.description}</Text>
                </TouchableOpacity> 
              )
            })

          }
        </View>
        <TouchableOpacity style={styles.location} activeOpacity={1}
         onPress={()=>{
          this.setState({region: this.state.origin})
          this.map.animateToRegion(this.state.origin)
         }}> 
         <SvgXml xml={mapSvgs.gps} width="35" height="35" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.reload} activeOpacity={0.5}
        onPress={()=>{
          this.setState({loading:true})
          this.getApi(this.state.northWest,this.state.southEast)

        }}>
          <SvgXml xml={mapSvgs.reload} width="35" height="35" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layer} activeOpacity={1}
        onPress={()=>{
          let css = this.state.displayType === 'none'? 'flex' : 'none'
          this.setState({displayType:css})
         }}>
          <SvgXml xml={mapSvgs.layer} width="35" height="35" />
        </TouchableOpacity>
        <View style={{
          width:'70%',
          position: 'absolute',
          zIndex: 1,
          right: 60,
          bottom: 115,
        }}>
          <View style={{
            width:'100%',
            backgroundColor:'#fff',
            borderRadius:15,
            flexDirection:'row',
            justifyContent:'space-around',
            display:this.state.displayType
          }}>
            {
              typeAry.map((item,index)=>{
                let style = item.active ? styles.mapTypeTxt : styles.mapTypeTxt2;
                return(
                  <TouchableOpacity
                  onPress={()=>{
                    if(item.type){
                      this.setState({mapType:item.type})
                    }else{
                      this.setState({showsTraffic:!this.state.showsTraffic})
                    }
                    let newData = typeAry.map((state, i) => {
                      if(index === 3 ) return false
                      return {
                        ...state,
                        active:
                          i === index  
                          ? (state.active = true)
                          : (state.active = false)
                      };
                    });
                    if(index !== 3 ) this.setState({typeAry:newData})
                    
                   }}>
                      <Text style={style}>{item.txt}</Text>
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </View>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            ref={ref => {
              this.map = ref;
            }}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            initialRegion={this.state.region}
            showsUserLocation={true}
            mapType={this.state.mapType} //standard 預設// satellite 衛星 // hybrid 混合 // terrain 地形
            showsTraffic={this.state.showsTraffic} //街道
            followsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
            onPress={()=>{
              Keyboard.dismiss()
            }}
            onRegionChangeComplete={async(region)=>{
             let boundaries = await this.map.getMapBoundaries()
            //  console.log(boundaries.northEast) //東北
            //  console.log(boundaries.southWest)//西南
             let northWest ={ //西北
                latitude: boundaries.northEast.latitude,
                longitude:boundaries.southWest.longitude
             }
             let southEast ={ //東南
              latitude: boundaries.southWest.latitude,
              longitude:boundaries.northEast.longitude
             }
              this.getApi(northWest,southEast,region)
              this.setState({
                northWest:northWest,
                southEast:southEast
              })

            }}
            >
            {
              marker.latitude?
              <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              >
              </Marker>  
              :
              <></>
            }

            {

              list.map((item,index)=>{
                let userpoint =true
                if(userParking){
                  userParking.forEach(el=>{
                    if(el.Lat=== item.Lat && el.Lon === item.Lon){
                      userpoint = false
                    }
                  })
                }
                return(
                  <>
                    {
                      userpoint ? 
                      <Marker
                      coordinate={{
                        latitude: item.Lat,
                        longitude: item.Lon,
                      }}
                      title= {!info[index] ? '' : info[index].Area}
                      onPress={() => {
                        list.forEach(el => {
                          this.refs['modal'+el.ID].close();
                        });
                        this.refs['modal'+item.ID].open();
                      }}>
                        {
                          item.FreeSp !== 0 ?
                          index===0?  <SvgXml xml={Svgs.mark_g} width="62" height="62"/>
                          : <SvgXml xml={Svgs.mark_g} width="62" height="62"/>
                          :
                          <SvgXml xml={Svgs.mark_d} width="62" height="62"/>
                        }
                      
                      </Marker>
                      : 
                      <></>
                    }

                  </>
                )
              })

            }
            {
              userParking  ?
              userParking.map(item=>{
                return(
                  <Marker
                  coordinate={{
                    latitude: item.Lat,
                    longitude: item.Lon,
                  }}
                  onPress={() => {
                    const loginReducer =  store.getState().loginReducer
                    let req = {
                      PhoneNo: loginReducer.phone,
                      devid:item.devid,
                      ptime: userService.time(),
                    };
                    userService
                    .userQDevice(req)
                    .then(res => {
                      if (res.data.status === 0) {
                        navigation.navigate('Locked',{
                          lockData: {
                            devid:item.devid,
                            LPNo:item.LPNo
                          },
                          paking: res.data.data[0]
                        });
                      }else{
                        console.log(res.data.msg);
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });

                  }}
                  title="您的停車位置">
              
                  <SvgXml xml={Svgs.mark} width="62" height="62" />
     
                </Marker>
                )
              })
              :
              <></>
            }
          </MapView>

        </View>

  
        <FootItem navigation={navigation} num={num}></FootItem>
      </>
    );
  }
}

class Modalbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      flex: 'flex',
      none: 'none',
      point1: styles.modalPoint2,
      point2: styles.modalPoint,
      data:[],
      oldData:[],
      random:null
    };
  }
  getSnapshotBeforeUpdate(){
    const loginReducer =  store.getState().loginReducer
    if(this.state.random !== loginReducer.random){
      this.getApi()
      this.setState({
        random:loginReducer.random
      })
    }
  }
  componentDidMount(){
    const loginReducer =  store.getState().loginReducer
    const login = loginReducer.login
    if(login){
      this.getApi()
    }
  }
  getApi(){
    const loginReducer =  store.getState().loginReducer
    if(loginReducer.login){
      let req = {
        PhoneNo: loginReducer.phone,
        ptime: userService.time(),
      };
        userService
        .userQInfo(req)
        .then(res => {
          if (res.data.status === 0) {
            let data = res.data.data
            let newData = data.map((item,index)=>{
              return{
                title:item.BTime,
                txt:item.BMsg,
                active:
                index === 0
                  ? (item.active = true)
                  : (item.active = false),
              }
            })
            this.setState({
              data:newData
            })
            this.setState({
              oldData:newData
            })
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  }
  changePage(num) {
    const data = this.state.data
    if(num === data.length){
      this.setState({page: 0})
      this.refs.modal.close()
      return false
    }
    let newData =data.map((item,index)=>{
      return{
        ...item,
        active:
          num === index
            ? (item.active = true)
            : (item.active = false),
      }
    })
    this.setState({data:newData})
    this.setState({page: num});
  }
  render() {
    const data = this.state.data
    const flex = this.state.flex
    const none = this.state.none
    const num = this.state.page
    // const loginReducer =  store.getState().loginReducer
    // const login = loginReducer.login
    return (
      <>
        {
          data.length !== 0?
          <Modal
          style={styles.modal}
          ref={'modal'}
          isOpen={true}
          position={'center'}>
          {
            data.map((item)=>{
              return(
                <View
                  style={{
                    height: '55%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: item.active ? flex : none,
                  }}>
                  <View style={styles.modalItem}>
                    <Text style={styles.modalTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.modalItem2}>
                    <Text style={styles.modalTxt}>
                      {item.txt}
                    </Text>
                  </View>
                </View>
              )
            })
          }
          <View style={styles.modalItem3}>
            {
              data.map(item=>{
                let point = item.active ?this.state.point1:this.state.point2
                return(
                  <View style={point}></View>
                )
              })
            }
          </View>
          <View style={styles.modalButtonIRow}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                this.changePage(num +1);
              }}>
              <Text style={styles.modalButtonTxt}>下一則</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                this.refs.modal.close();
              }}>
              <Text style={styles.modalButtonTxt}>知道了</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        :
        <></>
      }
   
      </>
    );
  }
}

const styles = StyleSheet.create({
  selectType:{
    backgroundColor:'#ff9500',
    borderRadius:15,
    color:'#fff'
  },
  selectType2:{
    backgroundColor:'#fff',
  },
  modal2: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modal2Wrap: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal2Item: {
    width: '100%',
    height: '25%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modal2Button: {
    backgroundColor: '#1ee494',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    marginTop: 5,
  },
  modal2ButtonTxt: {
    color: '#fff',
    fontSize: 18,
  },
  modal2Item2: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modal2Row: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modal2Row2: {
    width: '100%',
    height: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modal2Txt: {
    color: '#757575',
    fontSize: 24,
  },
  modal2Txt2: {
    color: '#009378',
    fontSize: 16,
  },
  modal2Txt3: {
    color: '#757575',
    fontSize: 20,
  },
  modal2Txt4: {
    color: '#757575',
    fontSize: 14,
  },
  modal2Txt5: {
    color: '#1ee494',
    fontSize: 14,
  },
  modal: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalItem: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem2: {
    width: '90%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem3: {
    width: '90%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  modalPoint2: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555',
    margin: 5,
  },
  modalTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    padding: 10,
    paddingBottom: 5,
    paddingTop: 15,
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
    // height:'30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#ff9500',
    borderTopWidth: 1,
  },
  modalButton: {
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
    borderLeftColor: '#ff9500',
    borderLeftWidth: 1,
  },
  modalButtonTxt: {
    color: '#ff9500',
    fontSize: 18,
  },
  searchWrap: {
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9,
    top: 20,
    left: 0,
  },
  search: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
  },
  svgItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  textInput: {
    flex: 1,
    height: 36,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 2,
    color:'#000',
    fontSize:Platform.OS === 'ios' ? 17 : 14
  },
  location: {
    position: 'absolute',
    zIndex: 9,
    right: 20,
    top: 70,
  },
  reload: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 170,
  },
  layer: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 120,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
    position:'relative',
    zIndex:1
  },
  mapType:{
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'space-around',
  },
  mapTypeTxt:{
    padding:15,
    color:'#ff9500'
  },
  mapTypeTxt2:{
    padding:15,
    color:'#717171'
  }
});

export default Home;
