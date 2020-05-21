import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../img/icon/input/svgs';
import { useSelector,useDispatch  } from 'react-redux'
import { login ,register,userPassword} from '../src/action'

const PassWordItem = props => {
  const height = props.height ? props.height : ''
  const page = props.page ? props.page : ''
  const [inputType, setInputType] = useState(true);
  const [display, setDisplay] = useState('flex');
  const [display2, setDisplay2] = useState('none');
  const [css,setCss] = useState(styles.inputWrap)
  const [value,setValue] = useState('')
  const loginReducer =  useSelector(state =>state.loginReducer)
  const userRegisterReducer =  useSelector(state =>state.userRegisterReducer)
  const userPasswordReducer =  useSelector(state =>state.userPasswordReducer)
  const dispatch = useDispatch()
  if(height){
    useEffect(()=>{
      setCss(styles.inputWrap2)
    })
  }
  return (
    <>
     <View style={css}>
      <TextInput
        style={styles.textInput}
        secureTextEntry={inputType}
        value={value}
        // onFocus={()=>{
        //   if(page ==='registerPage' && props.again ) {
        //     console.log(props.again) 
        //   } 
        // }}
        onChangeText={text => {
          setValue(text)
          if(page ==='loginPage') {
            dispatch(login(false,loginReducer.phone,text))
          }
          if(page ==='registerPage') {
            let password = !props.again ? text : userRegisterReducer.password
            let again_password = props.again ? text : userRegisterReducer.again_password
            dispatch(register(
              userRegisterReducer.phone,
              userRegisterReducer.name,
              userRegisterReducer.Fname,
              password,
              again_password,
              userRegisterReducer.email,
              userRegisterReducer.pid
            ))
          } 
          if(page ==='passwordPage') {
            let oldPassword = props.index === 0 ? text : userPasswordReducer.oldPassword
            let newPassword1 = props.index === 1 ? text : userPasswordReducer.newPassword1
            let newPassword2 = props.index === 2 ? text : userPasswordReducer.newPassword2
            dispatch(userPassword(
                oldPassword,
                newPassword1,
                newPassword2
              ))
          } 
          if(page ==='resetPasswordPage') {
            let newPassword1 = props.index === 1 ? text : userPasswordReducer.newPassword1
            let newPassword2 = props.index === 2 ? text : userPasswordReducer.newPassword2
            dispatch(userPassword(
                userPasswordReducer.oldPassword,
                newPassword1,
                newPassword2
              ))
          } 
        }}
      />
      <TouchableOpacity
        style={{position: 'absolute', right: 10, padding: 5}}
        onPress={() => {
          const css = display === 'none' ? 'flex' : 'none';
          const css2 = display2 === 'none' ? 'flex' : 'none';
          setInputType(!inputType);
          setDisplay(css);
          setDisplay2(css2);
        }}>
        <SvgXml
          xml={Svgs.blind}
          width="20"
          height="20"
          style={{display: display}}
        />
        <SvgXml
          xml={Svgs.see}
          width="20"
          height="20"
          style={{display: display2}}
        />
      </TouchableOpacity>
      </View>
    </>
  )
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#cccccc',
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
  inputWrap2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
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
});
export default PassWordItem;
