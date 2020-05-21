import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage
} from 'react-native';
import ButtonItem from '../../component/button';
import { userConfirmPwd } from '../../src/action'
import * as userService from '../../axios/user';
import Modal from 'react-native-modalbox';
import store from '../../src/store';
import {login, userinfo} from '../../src/action';

class Code extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      modal:[
        {
          id:1,
          Modal_title: '驗證碼錯誤',
          Modal_description: '你輸入的驗證碼有誤，請重新輸入',
        },
        {
          id:2,
          Modal_title: '註冊成功',
          Modal_description: '你已經成功註冊帳號，開始使用吧 !',
        }
      ]

    }
  }
  componentDidMount() {
    this._login_event()
  }
  _login_event(){
    
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
          if (res.data.status === 0 || res.data.status === 4) {
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
      }
    });

}
  render(){
    const {navigation} = this.props;
    const userRegisterReducer = store.getState().userRegisterReducer
    const page = 'codePage'
    const buttonData = {
      navigateTxt: 'Setting',
      buttonTxt: '確認驗證碼',
    };
    const modal = this.state.modal
    return (
      <>
      {
        modal.map(item=>{
          return(
            <Modal
              style={styles.modal}
              ref={'modal'+ item.id}
              isOpen={false}
              coverScreen={true}
              position={'center'}>
              <View
                style={{
                  width: '100%',
                  height: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.modalItem}>
                  <Text style={styles.modalTitle}>{item.Modal_title}</Text>
                </View>
                <View style={styles.modalItem2}>
                  <Text style={styles.modalTxt}>
                    {item.Modal_description}
                  </Text>
                </View>
              </View>
              <View style={styles.modalButtonIRow}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    this.refs['modal'+ item.id].close();
                  }}>
                  <Text style={styles.modalButtonTxt}>好</Text>
                </TouchableOpacity>
              </View>
          </Modal>
          )
        })
      }

        <ScrollView style={{backgroundColor: '#fafafa'}}>
          <View style={styles.container}>
            <View style={styles.item}>
              <View style={styles.column}>
                <Text style={styles.itemTxt}>輸入驗證碼</Text>
                <View style={styles.inputWrap}>
                  <TextInput 
                      ref={'input1'}
                      style={styles.textInput} 
                      maxLength={1} 
                      keyboardType='numeric'
                      onChangeText={(text)=>{
                        const userConfirmPwdReducer =  store.getState().userConfirmPwdReducer
                        store.dispatch(userConfirmPwd(
                        text,
                        userConfirmPwdReducer.code2,
                        userConfirmPwdReducer.code3,
                        userConfirmPwdReducer.code4
                      ))
                      this.refs.input1.blur()
                      this.refs.input2.focus()
                    }}
                  />
                  <TextInput 
                      ref={'input2'}
                      style={styles.textInput} 
                      maxLength={1} 
                      keyboardType='numeric'
                      onChangeText={(text)=>{
                        const userConfirmPwdReducer =  store.getState().userConfirmPwdReducer
                        store.dispatch(userConfirmPwd(
                        userConfirmPwdReducer.code1,
                        text,
                        userConfirmPwdReducer.code3,
                        userConfirmPwdReducer.code4
                      ))
                      this.refs.input2.blur()
                      this.refs.input3.focus()
                    }}
                  />
                  <TextInput 
                      ref={'input3'}
                      style={styles.textInput} 
                      maxLength={1} 
                      keyboardType='numeric'
                      onChangeText={(text)=>{
                        const userConfirmPwdReducer =  store.getState().userConfirmPwdReducer
                        store.dispatch(userConfirmPwd(
                        userConfirmPwdReducer.code1,
                        userConfirmPwdReducer.code2,
                        text,
                        userConfirmPwdReducer.code4
                      ))
                      this.refs.input3.blur()
                      this.refs.input4.focus()
                    }}
                  />
                  <TextInput 
                      ref={'input4'}
                      style={styles.textInput} 
                      maxLength={1} 
                      keyboardType='numeric'
                      onChangeText={(text)=>{
                        const userConfirmPwdReducer =  store.getState().userConfirmPwdReducer
                        store.dispatch(userConfirmPwd(
                        userConfirmPwdReducer.code1,
                        userConfirmPwdReducer.code2,
                        userConfirmPwdReducer.code3,
                        text
                      ))
                      this.refs.input4.blur()
                    }}
                  />
                </View>
              </View>
            </View>
  
            <View style={styles.buttonItem}>
              <ButtonItem data={buttonData} navigation={navigation} page={page} modal={this}></ButtonItem>
              <View style={styles.reSend}>
                <TouchableOpacity style={styles.paddingRight}
                onPress={()=>{
                  resendConfirm(userRegisterReducer)
                }}>
                  <Text style={styles.txt2}>重新發送驗證碼</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }

};

const resendConfirm =(userRegisterReducer)=>{

  let req = {
    PhoneNo : userRegisterReducer.phone,
    ptime: userService.time()
  }
  userService.userResendConfirm(req)
    .then(res => {
      if (res.data.status === 0) {
      }

    })
    .catch(err => {
      console.log(err);
    });
}

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalItem: {
    width: '60%',
    paddingBottom:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem2: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#DEDFE0',
    borderTopWidth: 1,
  },
  modalButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonTxt: {
    color: '#6DA0F3',
    fontSize: 22,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
  },
  itemTxt: {
    fontSize: 18,
    color: '#212121',
    paddingLeft: 5,
    paddingBottom: 10,
  },
  inputWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  textInput: {
    height: '100%',
    width: '20%',
    fontSize: 14,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    margin: 5,
    marginTop: 50,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    color:'#000'
  },
  column: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 30,
  },
  reSend: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop:10
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  paddingRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    color: '#009378',
    fontSize: 12,
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 80,
  },
});
export default Code;
