import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ButtonItem from '../../component/button';

const Info = props => {
  const {navigation} = props;
  const buttonData = {
    navigateTxt: 'Reset',
    buttonTxt: '開始重設密碼',
  };
  const [value, setValue] = useState('');

  return (
    <>
    <ScrollView style={{backgroundColor:'#fafafa'}}>
      <View style={styles.container}>
        <View style={{alignItems:'flex-start', justifyContent:'center',width:'90%',paddingTop:40}}>
          <Text style={styles.topTxt}>您需要重新設定密碼，</Text>
          <Text style={styles.topTxt}>才能繼續使用服務</Text>
        </View>
        <View style={{alignItems:'flex-start', justifyContent:'center',width:'90%',paddingTop:20}}>
          <Text style={styles.middleTxt}>請輸入帳戶之手機號碼，臨時密碼將會發送至您帳號對應的email信箱。</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.column}>
            <Text style={styles.bottomTxt}>手機號碼</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                keyboardType='numeric'
                value={value}
                onChangeText={text => setValue(text)}
              />
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
      <View style={styles.buttonItem}>
          <ButtonItem 
          data={buttonData} 
          navigation={navigation} 
          value={{
            phone:value
          }}
          ></ButtonItem>
          <View style={styles.buttonBox}>
            <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonBoxItem}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Text style={styles.buttonItemTxt}>暫不登入</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    // height: 100,
    paddingTop:40
  },
  topTxt: {
    fontSize: 22,
    color: '#BABABA',
    paddingLeft: 5,
  },
  middleTxt:{
    fontSize: 18,
    color: '#212121',
    paddingLeft: 5,
    paddingTop:10
  },
  bottomTxt: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 5,
    paddingBottom:10
  },
  inputWrap:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor:'#fff',
    borderRadius:30,
    borderWidth:1,
    borderColor:'#c7c7cc'
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
    paddingBottom:10
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor:'#fafafa',
  },
  buttonBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:20,
    paddingBottom:30,
    backgroundColor:'#fafafa'
  },
  buttonBoxItem: {
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
export default Info;
