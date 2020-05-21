import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ButtonItem from '../../component/button';
import PassWordItem from '../../component/PassWordItem';
import * as userService from '../../axios/user';
import { useSelector,useDispatch  } from 'react-redux'
import { userPassword } from '../../src/action'

const Reset = props => {
  const {navigation, route} = props;
  const userPasswordReducer =  useSelector(state =>state.userPasswordReducer)
  const dispatch = useDispatch()
  const forgetData = route.params? route.params.forgetData : ''
  const page = 'resetPasswordPage'
  const buttonData = {
    navigateTxt: 'SignIn',
    buttonTxt: '重設密碼',
  };
  const data = [
    {txt: '臨時密碼', input: false},
    {txt: '輸入新密碼', input: true},
    {txt: '再一次輸入新密碼', input: true},
  ];

  return (
    <>
      <ScrollView style={{backgroundColor: '#fafafa'}}>
        <View style={styles.container}>
          <View style={styles.topItem}>
            <Text style={styles.topItemTxt}>臨時密碼已發送至您的信箱。</Text>
            <Text style={styles.topItemTxt}>請輸入臨時密碼，並重設新密碼。</Text>
          </View>
          {data.map((item, index) => {
            return (
              <View style={styles.item}>
                <View style={styles.column}>
                  <Text style={styles.itemTxt}>{item.txt}</Text>
                  <View style={styles.passwordItem}>

                    {item.input ? (
                      <PassWordItem page={page} index={index}></PassWordItem>
                    ) : (
                      <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={text => {
                          dispatch(userPassword(
                            text,
                            userPasswordReducer.newPassword1,
                            userPasswordReducer.newPassword2
                          ))
                        }}
                      />
                    </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.buttonItem}>
            <ButtonItem data={buttonData} navigation={navigation} page={page} forgetData={forgetData}></ButtonItem>
            <View style={styles.reSend}>
              <TouchableOpacity style={styles.paddingRight}
              onPress={()=>{
                let req = {
                  PhoneNo : phone,
                  ptime: userService.time()
                }
                console.log(req);
                userService.userRPassword_2(req)
                .then(res => {
                  if (res.data.status === 0) {
              
                  }
                })
                .catch(err => {
                  console.log(err);
                });
              }}>
                <Text style={styles.txt2}>重新發送臨時密碼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  topItem: {
    width: '90%',
    padding: 5,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topItemTxt: {
    fontSize: 18,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
    paddingTop: 10,
  },
  itemTxt: {
    fontSize: 16,
    color: '#757575',
    paddingLeft: 5,
    paddingBottom: 10,
  },
  inputWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c7c7cc',
  },
  textInput: {
    height: '100%',
    width: '90%',
    fontSize: 14,
    textAlignVertical: 'center',
    color:'#000'
  },
  column: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 80,
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
  },
  passwordItem: {
    justifyContent: 'center',
    width: '100%',
  },
  reSend: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  paddingRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    color: '#009378',
    fontSize: 12,
  },
});
export default Reset;
