import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {login, userinfo,userSelectLP} from '../src/action';
import * as userService from '../axios/user';

const ButtonWhite = props => {
    const {navigation} = props;
    const {navigateTxt, buttonTxt} = props.data;
    const loginReducer = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonItem}
        onPress={() => {
          if (buttonTxt === '登出') {
            signOut(loginReducer,dispatch,navigation,navigateTxt)
          }
        }}>
        <Text style={styles.buttonItemTxt}>{buttonTxt}</Text>
      </TouchableOpacity>
    );
  };
  
  const signOut = (loginReducer,dispatch,navigation,navigateTxt)=>{
    let req = {
      PhoneNo: loginReducer.phone,
      ptime: userService.time(),
    };
    userService
      .userLogout(req)
      .then(function(res) {
        if (res.data.status == 0) {
          if(AsyncStorage.getItem('login_phone')){
            AsyncStorage.multiRemove(['token', 'login_phone','login_pw','random']);
          }
          dispatch(login(false, '', '',null))
          dispatch(userinfo('登入帳戶', '', '','',''))
          dispatch(userSelectLP('', '',''))
          navigation.navigate(navigateTxt);
        }
      })
      .catch(function(err) {
        console.log(err);
      });

  }
  const styles = StyleSheet.create({
    buttonItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      elevation: 1,
    },
    buttonItemTxt: {
      fontSize: 18,
      color: '#ff9500',
    },
  });
  export default ButtonWhite;
  