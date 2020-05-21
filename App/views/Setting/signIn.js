import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ButtonItem from '../../component/button';
import PassWordItem from '../../component/PassWordItem';
import { useSelector,useDispatch  } from 'react-redux'
import { login } from '../../src/action'
// import { useDarkMode } from 'react-native-dark-mode'

const SignIn = props => {
  const {navigation,route} = props;
  const goPage = route.params ? route.params.goPage : 'Setting';
  const buttonData = {
    navigateTxt: 'Setting',
    buttonTxt: '登入',
  };
const page = 'loginPage'
const loginReducer =  useSelector(state =>state.loginReducer)
const dispatch = useDispatch()

  return (
    <>
      <ScrollView style={{backgroundColor: '#fafafa'}}>
        <View style={styles.container}>
          <View style={styles.item}>
            <View style={styles.column}>
              <Text style={styles.itemTxt}>手機號碼</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  keyboardType='numeric'
                  onChangeText={(text)=>{
                    dispatch(login(false,text,loginReducer.password))
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.column}>
              <Text style={styles.itemTxt}>密碼</Text>
              <PassWordItem page={page}></PassWordItem>

            </View>
          </View>
          <View style={styles.buttonItem}>
            <ButtonItem data={buttonData} navigation={navigation} goPage={goPage}></ButtonItem>
            <View style={styles.row2}>
              <TouchableOpacity
                style={styles.paddingLeft}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <Text style={styles.txt1}>立即註冊</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paddingRight}
                onPress={() => {
                  navigation.navigate('Forget');
                }}>
                <Text style={styles.txt2}>忘記密碼</Text>
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
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
  },
  itemTxt: {
    fontSize: 18,
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

  row2: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop:20
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  paddingRight: {
    paddingRight: 15,
  },
  txt1: {
    color: '#F57C00',
    fontSize: 12,
  },
  txt2: {
    color: '#009378',
    fontSize: 12,
  },
});
export default SignIn;
