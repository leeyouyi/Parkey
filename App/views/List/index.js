import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import FootItem from '../../component/footer';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/nav/svgs';
import {useSelector,useDispatch} from 'react-redux';
import * as userService from '../../axios/user';
import {userUpdateList,login,userinfo} from '../../src/action';

const List = props => {
  const {navigation} = props;
  const num = 2;
  const loginReducer = useSelector(state => state.loginReducer);
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const userUpdateListReducer = useSelector(state => state.userUpdateListReducer);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState('flex');
  const [display2, setDisplay2] = useState('none');
  const [listInfo, setListInfo] = useState([]);
  const [oldList, setOldList] = useState([]);
  const [loading, setLoading] = useState(true);
 
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
                  dispatch(userinfo(UName, FName, phone, email, PID));
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
      getApi(loginReducer,setListInfo,setOldList,setLoading)
    }
  }, [loginReducer.login]);

  useEffect(() => {
    if(userInfoReducer.status === 4){
      navigation.navigate('Verification');
    }
    if(userUpdateListReducer.updateList){
      getApi(loginReducer,setListInfo,setOldList,setLoading)
      dispatch(userUpdateList(false))
    }
  }, [userUpdateListReducer.updateList]);

  const [data, setData] = useState([
    {
      txt: '依時間遞減',
      style: styles.button2,
      txtStyle: styles.buttonTxt2,
      active: true,
    },
    {
      txt: '依時間遞增',
      style: styles.button,
      txtStyle: styles.buttonTxt,
      active: false,
    },
    {
      txt: '已付款',
      style: styles.button2,
      txtStyle: styles.buttonTxt2,
      active: false,
    },
    {
      txt: '未付款',
      style: styles.button2,
      txtStyle: styles.buttonTxt2,
      active: false,
    },
  ]);

  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:'#EFEFF5'}}> 
      <View style={styles.title}>
        <Text style={styles.tltleTxt}>停車紀錄</Text>
        <TouchableOpacity
          style={{
              position: 'absolute',
              right: 0,
            }}
          onPress={() => {
            const css = display === 'none' ? 'flex' : 'none';
            const css2 = display2 === 'none' ? 'flex' : 'none';
            setDisplay(css);
            setDisplay2(css2);
          }}>
          <SvgXml
            xml={Svgs.filter}
            width="20"
            height="20"
            style={{marginRight: 20, display: display}}
          />
          <SvgXml
            xml={Svgs.close}
            width="20"
            height="20"
            style={{marginRight: 20, display: display2}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{display: display2}}>
          <View style={styles.horizontal}>
            {data.map((item, index) => {
              let style = item.active ? styles.button : styles.button2;
              return (
                <TouchableOpacity
                  style={style}
                  onPress={() => {
                    let newData = data.map((state, i) => {
                      return {
                        ...state,
                        active:
                          i === index
                            ? (state.active = true)
                            : (state.active = false),
                      };
                    });
                    setData(newData);

                    if (item.txt === '已付款' || item.txt === '未付款') {
                      let list = oldList.filter(state => {
                        return state.txt5 === item.txt;
                      });
                      setListInfo(list);
                    }
                    if (item.txt === '依時間遞增') {
                      let date = [];
                      let list = oldList.map((state, i) => {
                        date[i] = Date.parse(state.txt3).valueOf();
                        return {...state, date: date[i]};
                      });
                      let sortData = list.sort((a, b) => {
                        return a.date > b.date ? 1 : -1;
                      });
                      // console.log(sortData);
                      setListInfo(sortData);
                    }
                    if (item.txt === '依時間遞減') {
                      let date = [];
                      let list = oldList.map((state, i) => {
                        date[i] = Date.parse(state.txt3).valueOf();
                        return {...state, date: date[i]};
                      });
                      let sortData = list.sort((a, b) => {
                        return a.date < b.date ? 1 : -1;
                      });
                      setListInfo(sortData);
                    }
                  }}>
                  {item.active ? (
                    <Text style={styles.buttonTxt}>{item.txt}</Text>
                  ) : (
                    <Text style={styles.buttonTxt2}>{item.txt}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.container}>
          {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: Dimensions.get('window').height - 150,
              }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <></>
          )}
          <ListItem navigation={navigation} data={listInfo} />
        </View>
      </ScrollView>
    </SafeAreaView>
      <FootItem navigation={navigation} num={num} />
    </>
  );
};
const ListItem = props => {
  const {navigation} = props;
  const {data} = props;
  return data.map(item => {
    return (
      <>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('Ticket', {
              pay: item.pay,
              tickInfo:{
                TicketNo:item.TicketNo,
                SC:item.SC,
                ParkNo:item.ParkNo,
                lat:item.lat,
                lon:item.lon,
                Amount:item.txt4,
                BeginTime:item.txt3,
                ParkTime:item.ParkTime,
                LpNo:item.txt1,
                Nick:item.txt0,
                CarType:item.CarType,
                Area:item.Area,
                FeeRate:item.FeeRate,
                BZTime:item.BZTime
              }
            });
          }}>
          <View style={styles.row1}>
            <View style={styles.row3}>
              <Text style={styles.txt0}>{item.txt0}</Text>
              <Text style={styles.txt1}>{item.txt1}</Text>
            </View>
            <View style={item.style}>
              <Text style={item.styleFont}>{item.txt5}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.txt2}>{item.txt2}</Text>
          </View>
          <View style={styles.row4}>
            <Text style={styles.txt3}>{item.txt3}</Text>
            <Text style={styles.txt4}>{item.txt4}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  });
};

const getApi = (loginReducer,setListInfo,setOldList,setLoading)=>{
  let req = {
    PhoneNo: loginReducer.phone,
    ptime: userService.time(),
  };
  userService
    .userQLPList(req)
    .then(res => {
      if (res.data.status === 0) {
        if (!res.data.data) setLoading(false);
      }
    })
    .then(() => {
      userService
        .userQTickets(req)
        .then(res => {
          if (!Number(res.data.data)) setLoading(false);
          if (res.data.status === 0) {
            let data = res.data.data.map(item => {
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
              let txt5 = item.PStatus === 1 ? '已付款' : '未付款';
              let pay = item.PStatus === 1 ? true : false;
              let style = item.PStatus === 1 ? styles.txt5 : styles.txt6;
              let styleFont = item.PStatus === 1 ? styles.txt5Font : styles.txt6Font;

              return {
                txt0: item.Nick,
                txt1: item.LPNo,
                txt2: `${item.SC} 第${item.ParkNo}號車格`,
                txt3: dateTxt,
                txt4: item.Amount,
                txt5: txt5,
                style: style,
                styleFont: styleFont,
                pay: pay,
                TicketNo: item.TicketNo,
                SC:item.SC,
                ParkNo:item.ParkNo,
                lat:item.lat,
                lon:item.lon,
                ParkTime:item.ParkTime,
                CarType:item.CarType,
                Area:item.Area,
                FeeRate:item.FeeRate,
                BZTime:item.BZTime
              };
            });
            let date = [];
            let list = data.map((state, i) => {
              date[i] = Date.parse(state.txt3).valueOf();
              return {...state, date: date[i]};
            });
            let sortData = list.sort((a, b) => {
              return a.date < b.date ? 1 : -1;
            });
            setListInfo(sortData);
            setOldList(sortData);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}
const styles = StyleSheet.create({
  title: {
    justifyContent:'center',
    alignItems: 'center',
    height: 50 ,
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
    backgroundColor:'#fff'
  },
  tltleTxt: {
    fontSize: 16,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingTop: 5,
    backgroundColor:'#EFEFF5'
  },
  button: {
    backgroundColor: '#ff9500',
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
    marginBottom: 0,
  },
  button2: {
    borderColor: '#ff9500',
    borderWidth: 1,
    borderRadius: 10,
    padding: 9,
    paddingTop: 3,
    paddingBottom: 3,
    margin: 5,
    marginBottom: 0,
  },
  buttonTxt: {
    color: '#ffffff',
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonTxt2: {
    color: '#ff9500',
    fontSize: 12,
    paddingLeft: 4,
    paddingRight: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF5',
  },
  item: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 15,
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
    width: '100%',
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  txt0: {
    fontSize: 18,
    color: '#5d5d60',
  },
  txt1: {
    fontSize: 18,
    color: '#1ee494',
    paddingLeft: 15,
  },
  txt2: {
    width: '45%',
    fontSize: 14,
    color: '#757575',
    paddingTop: 10,
  },
  txt3: {
    width: '40%',
    fontSize: 14,
    color: '#757575',
    paddingTop: 10,
    paddingBottom: 5,
  },
  txt4: {
    width: '20%',
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
    paddingRight: 0,
  },
  txt5: {
    width: 59,
    height: 29,
    borderRadius: 30,
    fontSize: 12,
    borderColor: '#1ee494',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  txt5Font:{
    fontSize: 12,
    color: '#1ee494',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  txt6: {
    width: 60,
    height: 30,
    borderRadius: 30,
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#1ee494',
    justifyContent:'center',
    alignItems:'center'
  },
  txt6Font:{
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default List;
