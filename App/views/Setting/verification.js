import React from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import ButtonItem from '../../component/button';
import { isIphoneX } from 'react-native-iphone-x-helper'
import {useSelector, useDispatch} from 'react-redux';
import {login, userinfo,userSelectLP} from '../../src/action';
import * as userService from '../../axios/user';

const Verification = props => {
  const {navigation,route} = props;
  const buttonData = {
    navigateTxt: 'Code',
    buttonTxt: '發送驗證碼以綁定手機',
  };
  // const {navigateTxt, buttonTxt} = props.data;
  const loginReducer = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.container}>

        <View>
          <Text style={styles.topTxt}>Oh no ! 您尚未驗證手機</Text>
        </View>
        <View>
          <Text style={styles.bottomTxt}>您需要綁定手機才能開始使用</Text>
          <Text style={styles.bottomTxt}>Parkey相關服務。</Text>
        </View>

        <View style={styles.button}>
          <ButtonItem  data={buttonData} navigation={navigation} ></ButtonItem>
          <View style={styles.buttonBox}>
            <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonItem}
            onPress={() => {
              _signOut(loginReducer,dispatch,navigation,'SignIn')
              // navigation.navigate('SignIn');
            }}>
            <Text style={styles.buttonItemTxt}>登出帳號</Text>
          </TouchableOpacity>
        </View>
        </View>

      </View>
    </>
  );
};
const _signOut = (loginReducer,dispatch,navigation,navigateTxt)=>{
  let req = {
    PhoneNo: loginReducer.phone,
    ptime: userService.time(),
  };
  userService
    .userLogout(req)
    .then(function(res) {
      if (res.data.status === 0) {
        AsyncStorage.multiRemove(['token', 'login_phone','login_pw','random']);
        dispatch(login(false, '', '',null))
        dispatch(userinfo('登入帳戶', '', '','','',''))
        dispatch(userSelectLP('', '',''))
        navigation.navigate(navigateTxt);
      }
    })
    .catch(function(err) {
      console.log(err);
    });

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: '10%',
  },
  svgItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTxt: {
    paddingBottom: 20,
    fontSize: 26,
    color: '#505050',
    textAlign: 'center',
  },
  bottomTxt: {
    fontSize: 16,
    color: '#70C1B2',
    textAlign: 'center',
  },
  button:{
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: isIphoneX()? 120 : 70,
  },
  buttonBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:20,
    // paddingBottom:30,
    backgroundColor:'#ffffff'
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
export default Verification;
