import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import ButtonItem from '../../component/button';
import PassWordItem from '../../component/PassWordItem';
import { useSelector,useDispatch  } from 'react-redux'
import { register } from '../../src/action'

const SignUp = props => {
  const {navigation} = props;
  const userRegisterReducer =  useSelector(state =>state.userRegisterReducer)
  const dispatch = useDispatch()
  const page = 'registerPage'
  const buttonData = {
    navigateTxt: 'Code',
    buttonTxt: '確認註冊',
  };
  const data = [
    {txt: '手機號碼',txt2:' 手機號碼將作為帳號使用',type:'phone'},
    {txt: '您的稱呼',name:true ,type:''},
    {txt: 'email 信箱' ,type:'email'},
    {txt: '身分證後四碼',txt2:'僅用於確認使用者身份' ,type:'pid'},
  ];
  return (
    <>
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={100}
      style={{flex:1,flexDirection: 'column',justifyContent: 'center'}}
      >
      <ScrollView>
        <View style={styles.container}>
          {data.map(item => {
            return (
              <View style={styles.item}>
                <View style={styles.column}>
                  <View style={styles.txtItem}>
                    <Text style={styles.txt}>{item.txt}</Text>
                    <Text style={styles.txt2}>{item.txt2}</Text>
                  </View>
                
                  {item.name ?
                    <View style={styles.nameItem}>
                      <View style={styles.nameItem1}>
                        <Text style={styles.nameTxt}>姓</Text>
                        <View style={styles.inputWrap1}>
                          <TextInput
                            style={styles.textInput1}
                            onChangeText={(text)=>{
                              dispatch(register(
                                  userRegisterReducer.phone,
                                  userRegisterReducer.name,
                                  text,
                                  userRegisterReducer.password,
                                  userRegisterReducer.again_password,
                                  userRegisterReducer.email,
                                  userRegisterReducer.pid
                                ))
                            }}
                          />
                        </View>
                      </View> 
                      <View style={styles.nameItem1}>
                        <Text style={styles.nameTxt}>名</Text>
                        <View style={styles.inputWrap2}>
                          <TextInput
                            style={styles.textInput1}
                            onChangeText={(text)=>{
                              dispatch(register(
                                  userRegisterReducer.phone,
                                  text,
                                  userRegisterReducer.Fname,
                                  userRegisterReducer.password,
                                  userRegisterReducer.again_password,
                                  userRegisterReducer.email,
                                  userRegisterReducer.pid
                                ))
                            }}
                          />
                        </View>
                      </View> 
                    </View> 
                  : 
                    <View style={styles.inputWrap}>
                      {
                        item.type === 'pid'?
                          <TextInput
                          keyboardType='numeric'
                          maxLength={4} 
                          style={styles.textInput}
                          onChangeText={(text)=>{
                            dispatch(register(
                                userRegisterReducer.phone,
                                userRegisterReducer.name,
                                userRegisterReducer.Fname,
                                userRegisterReducer.password,
                                userRegisterReducer.again_password,
                                userRegisterReducer.email,
                                text
                              ))
                          }}
                        />
                        :
                        <TextInput
                        keyboardType={item.type === 'phone'?'numeric':'email'?'email-address':'default'}
                        style={styles.textInput}
                        onChangeText={(text)=>{
                          let phone = item.type === 'phone'? text :  userRegisterReducer.phone 
                          let email = item.type === 'email'? text :  userRegisterReducer.email 
                          dispatch(register(
                              phone,
                              userRegisterReducer.name,
                              userRegisterReducer.Fname,
                              userRegisterReducer.password,
                              userRegisterReducer.again_password,
                              email,
                              userRegisterReducer.pid
                            ))
                        }}
                      />
                      }
  
                    </View>
                  } 

                </View>
              </View>
            );
          })}
          <View style={styles.item}>
            <View style={styles.column}>
              <View style={styles.txtItem}>
                <Text style={styles.txt}>輸入密碼</Text>
              </View>
              <PassWordItem height={40} page={page} again={false}></PassWordItem>

            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.column}>
              <View style={styles.txtItem}>
                <Text style={styles.txt}>再次輸入密碼</Text>
              </View>
              <PassWordItem height={40} page={page} again={true}></PassWordItem>
            </View>
          </View>
          <View style={styles.Button}>
            <ButtonItem data={buttonData} navigation={navigation}></ButtonItem>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 60,
    margin:5,
  },
  nameItem:{
    flexDirection:'row',
    width:'100%',
    paddingBottom:5,
  },
  nameItem1:{
    width:'50%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  txtItem:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:5,
  },
  txt: {
    fontSize: 14,
    color: '#212121',
    paddingLeft: 10,
    marginTop: 15,
  },
  txt2:{
    fontSize: 12,
    paddingRight: 5,
    marginTop: 15,
    color:'#1ee494',
    textAlignVertical:'bottom'
  },
  column: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputWrap:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    backgroundColor:'#fff',
    borderRadius:30,
    borderWidth:1,
    borderColor:'#c7c7cc',
  },
  textInput: {
    height: '100%',
    width: '90%',
    fontSize: 17,
    textAlignVertical: 'center',
    color:'#000',
    marginTop:5,
    paddingTop:5,
  },
  inputWrap1:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '60%',
    backgroundColor:'#fff',
    borderRadius:30,
    borderWidth:1,
    borderColor:'#c7c7cc',
  },
  inputWrap2:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '70%',
    backgroundColor:'#fff',
    borderRadius:30,
    borderWidth:1,
    borderColor:'#c7c7cc'
  },
  textInput1: {
    height: '100%',
    width: '90%',
    textAlignVertical: 'bottom',
    color:'#000',
    fontSize:17,
    paddingTop:5,
    marginTop:5
  },
  nameTxt:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width:'30%',
    textAlign:'center'
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
  },
});
export default SignUp;
