import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import * as userService from '../axios/user';
import {useSelector, useDispatch} from 'react-redux';
import {
  login,
  userinfo,
  userPassword,
  userAddLP,
  userModifyLP,
  userUpdateLP,
  userUpdateList
} from '../src/action';

const ButtonItem = props => {
  const {navigation} = props;
  const {navigateTxt, buttonTxt} = props.data;
  const loginReducer = useSelector(state => state.loginReducer);
  const userRegisterReducer = useSelector(state => state.userRegisterReducer);
  const userConfirmPwdReducer = useSelector(state => state.userConfirmPwdReducer);
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const userPasswordReducer = useSelector(state => state.userPasswordReducer);
  const userAddLPReducer = useSelector(state => state.userAddLPReducer);
  const dispatch = useDispatch();
  let btnFlag = true
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.buttonItem}
      onPress={() => {
        if (buttonTxt === '登入') {
          let {goPage} = props;
          loginFn(
            loginReducer.phone,
            loginReducer.password,
            dispatch,
            navigation,
            navigateTxt,
            goPage,
          );
        } else if (buttonTxt === '確認註冊') {
          // navigation.navigate(navigateTxt);
          register(userRegisterReducer, dispatch, navigation, navigateTxt);
        } else if (buttonTxt === '確認驗證碼') {
          let refs= props.modal.refs;
          confirmPwd(
            userConfirmPwdReducer,
            userInfoReducer,
            dispatch,
            navigation,
            navigateTxt,
            refs,
            loginReducer
          );
        }else if(buttonTxt === '發送驗證碼以綁定手機'){
          resendConfirm(userInfoReducer, navigation, navigateTxt)
        } else if (buttonTxt === '儲存變更') {
          let changeData = props.changeData;
          uMemberInfo(
            userInfoReducer,
            dispatch,
            changeData,
            navigation,
            navigateTxt,
          );
        } else if (buttonTxt === '重設密碼' && props.page === 'passwordPage') {
          uPassword(
            userInfoReducer.phone,
            userPasswordReducer.oldPassword,
            userPasswordReducer.newPassword1,
            dispatch,
            navigation,
            navigateTxt,
          );
        } else if (buttonTxt === '發送臨時密碼' || buttonTxt === '開始重設密碼') {
          let {phone} = props.value;
          rPassword_2(phone, navigation, navigateTxt);
        } else if (
          buttonTxt === '重設密碼' &&
          props.page === 'resetPasswordPage'
        ) {
          let phone = props.forgetData ? props.forgetData : loginReducer.phone;
          resetFn(
            phone,
            userPasswordReducer.oldPassword,
            dispatch,
            userPasswordReducer.newPassword1,
            navigation,
            navigateTxt,
            userInfoReducer.status
          );
        } else if (buttonTxt === '確認新增車牌') {
          addLp(
            userInfoReducer,
            userAddLPReducer,
            dispatch,
            navigation,
            navigateTxt,
          );
        } else if (buttonTxt === '確認') {
          let chengeData = props.chengeData;

          if(chengeData && chengeData.LPNickname !== ''){
            modifyLpFn(
              userInfoReducer.phone,
              chengeData,
              dispatch,
              navigation,
              navigateTxt,
            )
          }else{
            navigation.navigate(navigateTxt);
          }

        } else if (
          buttonTxt === '確認上鎖我的機車' ||
          buttonTxt === '確認綁定我的機車'
        ) {
          let lockData = props.lockData;
          let paking = props.paking;
          if(btnFlag){
            bindDevice(
              userInfoReducer.phone,
              lockData,
              navigation,
              navigateTxt,
              paking,
              dispatch,
              btnFlag
            )
            btnFlag = false
          }
        } else if (buttonTxt === '解鎖我的機車') {
          let modal2 = props.modal2;
          if(btnFlag){
            modal2.open();
            btnFlag = false
            setTimeout(()=>{
              btnFlag = true
            },1000)
          }
        
        } else if (buttonTxt === '前往繳交停車費'){
          let tickInfo = props.tickInfo;
          navigation.navigate(navigateTxt,{
            tickInfo:tickInfo
          })
        }else if (buttonTxt === '確認繳費'){
          let tickInfo = props.tickInfo;
          payTicket(userInfoReducer.phone,tickInfo,navigation, navigateTxt,dispatch)
        }else if (buttonTxt === '新增車牌'){
          let QLPList = props.QLPList;
          if(QLPList.length < 3 ){
            navigation.navigate(navigateTxt);
          }else{
            alert('最多新增3個車牌')
          }
        }
        else {
          navigation.navigate(navigateTxt);
        }
      }}>
      <Text style={styles.buttonItemTxt}>{buttonTxt}</Text>
    </TouchableOpacity>
  );
};
const _login_event = (phone, password,random) => {
  // AsyncStorage.multiGet(['token', 'login_phone','login_pw','random']).then(data => {
    // let token = data[0][1] || null;
    // if (token == 'asdfghjkl410') {

    // } else {
      AsyncStorage.multiSet([
        ['token', 'asdfghjkl410'],
        ['login_phone', phone],
        ['login_pw', password],
        ['random', random],
      ]);
    // }
  // });
};

//登入
const loginFn = (
  phone,
  password,
  dispatch,
  navigation,
  navigateTxt,
  goPage,
) => {
  let req = {
    PhoneNo: phone,
    Password: password,
    ptime: userService.time(),
  };
  userService
    .userLogin(req)
    .then(res => {
      let status = res.data.status
      if (res.data.status === 0 || res.data.status === 4 ) {
        let random = getRandom(1,999)
        random =  random + ''
        dispatch(login(true, phone, password,random));
        _login_event(phone, password,random);
        let req2 = {
          PhoneNo: phone,
          ptime: userService.time(),
        };
        userService
          .userQMemberInfo(req2)
          .then(res => {
            if (res.data.status === 0) {
              let {UName, email, FName, PID} = res.data;
              dispatch(userinfo(UName, FName, phone, email, PID, status));
              if(status === 4){
                navigation.navigate('Verification');
              }else{
                navigation.navigate(goPage,{login:true});
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if(res.data.status === 20){
        navigation.navigate('OldMember');
      }else {
        if( res.data.msg === 'PhoneNo不存在'){
          Alert.alert('錯誤', '您輸入的手機帳號尚未註冊', [{text: '確定'}]);
        }else{
          Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//註冊
const register = (userRegisterReducer, dispatch, navigation, navigateTxt) => {
  for (let prop in userRegisterReducer) {
    if(userRegisterReducer[prop] === ''){
      let txt =''
      switch (prop) {
        case 'name':
          txt = '姓名'
          break;
        case 'phone':
          txt = '手機號碼'
          break;
        case 'email':
          txt = '信箱'
          break;
        case 'password':
          txt = '密碼'
          break; 
        case 'again_password':
          txt = '再次輸入密碼'
          break;
        case 'pid':
          txt = '身分證後4碼'
          break;         
      }
      alert(`"${txt}"`+'不得為空')
      return false
    }
  }
  const strEmail = userRegisterReducer.email;
  const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  if(strEmail.search(emailRule) === -1){
    alert("信箱格式不正確")
    return false
  }

  if(userRegisterReducer.password !== userRegisterReducer.again_password ){
    alert('密碼不相同')
    return false
  }

  let req = {
    PhoneNo: userRegisterReducer.phone,
    UName: userRegisterReducer.name,
    FName: userRegisterReducer.Fname,
    Password: userRegisterReducer.password,
    Email: userRegisterReducer.email,
    PID: userRegisterReducer.pid,
    ptime: userService.time(),
  };
  userService
    .userRegister(req)
    .then(res => {
      if (res.data.status === 0) {
        let status = 4
        let random = getRandom(1,999)
        random =  random + ''
        _login_event(userRegisterReducer.phone, userRegisterReducer.password,random);
        dispatch(
          login(true, userRegisterReducer.phone, userRegisterReducer.password,random),
        );
        dispatch(
          userinfo(
            userRegisterReducer.name,
            userRegisterReducer.Fname,
            userRegisterReducer.phone,
            userRegisterReducer.email,
            userRegisterReducer.pid,
            status
          )
        );
        navigation.navigate(navigateTxt);
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//驗證碼確認
const confirmPwd = (
  userConfirmPwdReducer,
  userInfoReducer,
  dispatch,
  navigation,
  navigateTxt,
  refs,
  loginReducer
) => {
  let code =
    userConfirmPwdReducer.code1 +
    userConfirmPwdReducer.code2 +
    userConfirmPwdReducer.code3 +
    userConfirmPwdReducer.code4;
  let phone = loginReducer.login ? loginReducer.phone :  userRegisterReducer.phone
  let req = {
    PhoneNo: phone,
    ConfirmCode: code,
    ptime: userService.time(),
  };
  userService
    .userConfirmPwd(req)
    .then(res => {
      if (res.data.status === 0) {
          dispatch(
            userinfo(
              userInfoReducer.name,
              userInfoReducer.Fname,
              userInfoReducer.email,
              userInfoReducer.phone,
              userInfoReducer.pid,
              true
            )
          );
        refs.modal2.open();
        navigation.navigate(navigateTxt);
      } else {
        refs.modal1.open();
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//重發驗證碼
const resendConfirm =(userInfoReducer,navigation, navigateTxt)=>{

  let req = {
    PhoneNo : userInfoReducer.phone,
    ptime: userService.time()
  }
  userService.userResendConfirm(req)
    .then(res => {
      if (res.data.status === 0) {
        navigation.navigate(navigateTxt);
      }

    })
    .catch(err => {
      console.log(err);
    });
}
//更新會員資料
const uMemberInfo = (
  userInfoReducer,
  dispatch,
  changeData,
  navigation,
  navigateTxt,
) => {
  let name =
    changeData.type === 'name' ? changeData.value : userInfoReducer.name;
  let Fname =
    changeData.type === 'Fname' ? changeData.value : userInfoReducer.Fname;
  let email =
    changeData.type === 'email' ? changeData.value : userInfoReducer.email;
  let req = {
    PhoneNo: userInfoReducer.phone,
    UName: name,
    FName: Fname,
    Email: email,
    ptime: userService.time(),
  };
  userService
    .userUMemberInfo(req)
    .then(res => {
      if (res.data.status === 0) {
        dispatch(
          userinfo(
            name,
            Fname,
            userInfoReducer.phone,
            email,
            userInfoReducer.pid,
            userInfoReducer.status
          ),
        );
        navigation.navigate(navigateTxt);
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//更新會員密碼
const uPassword = (
  phone,
  oldPassword,
  newPassword1,
  dispatch,
  navigation,
  navigateTxt,
) => {
  let req = {
    PhoneNo: phone,
    OldPassword: oldPassword,
    Password: newPassword1,
    ptime: userService.time(),
  };
  userService
    .userUPassword(req)
    .then(res => {
      if (res.data.status === 0) {
        dispatch(userPassword('', '', ''));
        navigation.navigate(navigateTxt);
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//取得新密碼
const rPassword_2 = (phone, navigation, navigateTxt) => {
  let req = {
    PhoneNo: phone,
    Email: '',
    ptime: userService.time(),
  };
  userService
    .userRPassword_2(req)
    .then(res => {
      //後端需提供email
      if (res.data.status === 0) {
        navigation.navigate(navigateTxt, {
          forgetData: phone,
        });
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
// 取得新密碼後的更改密碼
const resetFn = (
  phone,
  password,
  dispatch,
  newPassword1,
  navigation,
  navigateTxt,
  status
) => {
  
  let req = {
    PhoneNo: phone,
    Password: password,
    ptime: userService.time(),
  };
  userService
    .userLogin(req)
    .then(res => {
      if (res.data.status === 0) {
        dispatch(login(true, phone, newPassword1));
        uPassword(phone, password, newPassword1, dispatch);
        if(status===20){
          navigation.navigate('Accont');
        }else{
          navigation.navigate(navigateTxt);
        }
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//新增車牌
const addLp = (
  userInfoReducer,
  userAddLPReducer,
  dispatch,
  navigation,
  navigateTxt,
) => {
  if (!userAddLPReducer.LPNo1 || !userAddLPReducer.LPNo2) {
    alert('資料不得為空');
    return;
  }
  let LPNo = userAddLPReducer.LPNo1 + '-' + userAddLPReducer.LPNo2;
  let LPType = null;
  if (!userAddLPReducer.LPcheckBox1) {
    LPType = userAddLPReducer.LPpicker;
  } else if (userAddLPReducer.LPpicker === 9) {
    //9 : 輕型機車(綠牌)
    LPType = 109; //電動輕型機車(綠牌)
  } else {
    LPType = 110; //電動普通重型機車（白牌）
  }

  let req = {
    PhoneNo: userInfoReducer.phone,
    LPNo: LPNo.toUpperCase(),
    LPNickname: userAddLPReducer.LPNickname,
    LPType: LPType,
    DType: userAddLPReducer.DType,
    ptime: userService.time(),
  };
  userService
    .userGetAddLP(req)
    .then(res => {
      if (res.data.status === 0) {
        dispatch(userAddLP('', '', '', '', '', '', '', true));
        navigation.navigate(navigateTxt, {
          add: true,
        });
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//修改車牌
const modifyLpFn = (phone, chengeData, dispatch, navigation, navigateTxt) => {
  let LPType = null;
  switch (chengeData.LPType) {
    case '輕型機車(綠牌)':
      LPType = 9;
      break;
    case '輕型機車(綠牌)，電動車':
      LPType = 109;
      break;
    case '普通重型機車(白牌)，電動車':
      LPType = 110;
      break;
    default:
      LPType = 10;
      break;
  }
  let req = {
    PhoneNo: phone,
    LPNo: chengeData.LPNo,
    LPNickname: chengeData.LPNickname,
    LPType: LPType,
    DType: 1,
    ptime: userService.time(),
  };
    userService
    .userModifyLP(req)
    .then(res => {
      if (res.data.status === 0) {
        dispatch(userModifyLP(true));
        navigation.navigate(navigateTxt, {
          ModifyLP: true,
        });
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });

};
//車輛上鎖
const bindDevice = (phone, lockData, navigation, navigateTxt, paking, dispatch,btnFlag) => {
  let req = {
    PhoneNo: phone,
    devid: parseInt(lockData.devid),
    LPNo: lockData.LPNo,
    ptime: userService.time(),
  };
  userService
    .userBindDevice(req)
    .then(res => {
      if (res.data.status === 0) {
        navigation.navigate(navigateTxt, {
          lockData,
          paking,
        });
        dispatch(userUpdateLP(true))
        btnFlag = true
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
        btnFlag = true
      }

    })
    .catch(err => {
      console.log(err);
      btnFlag = true
    });
};
// 確認繳費
const payTicket = (phone,tickInfo,navigation, navigateTxt,dispatch)=>{
  let req = {
    PhoneNo: phone,
    TicketNo: tickInfo.TicketNo,
    LPNo: tickInfo.LpNo,
    ptime: userService.time(),
  };
  userService
    .userPayTicket(req)
    .then(res => {
      if (res.data.status === 0) {
        navigation.navigate(navigateTxt);
        dispatch(userUpdateList(true))
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
const getRandom =(min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
const styles = StyleSheet.create({
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#ff9500',
    borderRadius: 20,
  },
  buttonItemTxt: {
    fontSize: 18,
    color: '#ffffff',
  }
});

export default ButtonItem;
