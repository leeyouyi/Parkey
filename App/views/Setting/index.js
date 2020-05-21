import React ,{useState, useEffect}  from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import FootItem from '../../component/footer';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';
import {useSelector, useDispatch} from 'react-redux';
import * as userService from '../../axios/user';
import {login,userinfo} from '../../src/action';

const Setting = props => {
  const {navigation, route} = props;
  const loginReducer = useSelector(state => state.loginReducer);
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const dispatch = useDispatch();
  const name = loginReducer.login ? userInfoReducer.name : '登入帳戶';
  const num = 4;
  const data = [
    {txt: '付款設定', navigationTxt: 'Pay'},
    {txt: '最新消息', navigationTxt: 'News'},
    {txt: '聯絡客服', navigationTxt: 'CustomerService'},
    {txt: '關於我們', navigationTxt: 'About'},
  ];

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
  },[])
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrap}>
          <TouchableOpacity
            style={styles.useritem}
            onPress={() => {
              const navigationTxt = !loginReducer.login ? 'SignIn' : 'Accont';
              navigation.navigate(navigationTxt);
            }}>
            <View style={styles.row}>
              <View style={styles.row2}>
                <View style={styles.user}>
                  <SvgXml xml={Svgs.user} width="40" height="40" />
                </View>
                <Text style={styles.itemTxt}>{name}</Text>
              </View>
              <SvgXml xml={Svgs.right} width="40" height="40" />
            </View>
          </TouchableOpacity>
          {data.map(item => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate(item.navigationTxt)}>
                <View style={styles.row}>
                  <Text style={styles.itemTxt}>{item.txt}</Text>
                  <SvgXml xml={Svgs.right} width="40" height="40" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{paddingBottom: 10}}>
          <Text style={styles.version}>版本 0.0.0</Text>
        </View>
      </View>
      <FootItem navigation={navigation} num={num}></FootItem>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF5',
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  useritem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '15%',
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
    padding: 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '10%',
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
    padding: 10,
  },
  itemTxt: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  row2: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#d1d1d6',
    borderRadius: 25,
  },
  version: {
    color: '#757575',
    fontSize: 12,
  },
});
export default Setting;
