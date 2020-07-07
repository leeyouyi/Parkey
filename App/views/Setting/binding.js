import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';
import CheckBox from 'react-native-check-box';
import ButtonItem from '../../component/button';

const SelectPay = props => {
  const {navigation,route} = props;
  const buttonData = {
    navigateTxt: 'Pay',
    buttonTxt: '確認綁定',
  };
  const [checkBox,setCheckBox] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topItem}>
          <Text style={styles.topItemTxt}>信用卡資訊</Text>
        </View>
        <View style={styles.cardItem}>
          <View style={styles.titleItme}>
            <Text style={{marginLeft:5}}>信用卡卡號</Text>
          </View>
          <View style={styles.inputItm}>
            <TextInput 
              style={styles.textInput} 
              maxLength={4} 
              keyboardType='numeric'
              onChangeText={(text)=>{
      
              }}
            />
            <TextInput 
              style={styles.textInput} 
              maxLength={4} 
              keyboardType='numeric'
              onChangeText={(text)=>{
      
              }}
            />
            <TextInput 
              style={styles.textInput} 
              maxLength={4} 
              keyboardType='numeric'
              onChangeText={(text)=>{
      
              }}
            />
            <TextInput 
              style={styles.textInput} 
              maxLength={4} 
              keyboardType='numeric'
              onChangeText={(text)=>{
      
              }}
            />
          </View>

          <View style={styles.titleItme2}>
            <Text  style={{marginLeft:5}}>有效期限</Text>
            <Text style={{marginRight:30}}>安全碼</Text>
          </View>

          <View style={styles.inputItm}>
            <TextInput 
              style={styles.textInput} 
              maxLength={2} 
              keyboardType='numeric'
              placeholder='MM'
              placeholderTextColor="#fd9c36"
              onChangeText={(text)=>{
      
              }}
            />
            <View style={{
              alignItems:'center',
              justifyContent:'center'
            }}>
              <Text style={{color:'#FD9C36',fontSize:24}}>/</Text>
            </View>
            <TextInput 
              style={styles.textInput} 
              maxLength={2} 
              keyboardType='numeric'
              placeholder='YY'
              placeholderTextColor="#fd9c36"
              onChangeText={(text)=>{
      
              }}
            />
            <TextInput 
              style={styles.textInput2} 
              maxLength={3} 
              keyboardType='numeric'
              onChangeText={(text)=>{
      
              }}
            />
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <SvgXml
              xml={newSvgs.lock_S}
              width={10}
              height={10}
            />
            <Text style={{color:'#C1C1C1'}}>本服務採用瑞喬科技 TapPay SSL交易系統</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',width:'75%',marginTop:30}}>
            <CheckBox
              isChecked={checkBox}
              onClick={() => {
                setCheckBox(!checkBox);
              }}
            />
            <Text style={{fontSize:16}}>設為主要付款方式</Text>
          </View>
        </View>
        <View style={styles.button}>
          <ButtonItem data={buttonData} navigation={navigation}></ButtonItem>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingTop: 10,
  },
  topItem:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:70,
    paddingBottom:10,
  },

  topItemTxt:{
    width:'90%',
    alignItems: 'flex-start',
    fontSize: 25,
    color: '#5c5c5c',
    textAlign: 'left',
  },
 
  cardItem:{
    width:'100%',
    height:300,
    backgroundColor:'#fff',
    alignItems:'center'
  },
  titleItme:{
    width:'80%',
    marginTop:15,
    marginLeft:'3%',
  },
  inputItm:{
    width:'80%',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginBottom:15
  },
  textInput: {
    width:'20%',
    height:40,
    marginTop:5,
    marginLeft:'2.5%',
    marginRight:'2.5%',
    backgroundColor:'#FFE0B2',
    textAlign:'center',
    color:'#FD9C36'
  },
  titleItme2:{
    width:'80%',
    marginTop:15,
    marginLeft:'3%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  textInput2: {
    width:'20%',
    height:40,
    marginTop:5,
    marginLeft:'24.5%',
    backgroundColor:'#FFE0B2',
    textAlign:'center',
    color:'#FD9C36'
  },
  button:{
    width:'100%',
    justifyContent:'flex-end',
    alignItems: 'center',
    flex:1,
    marginBottom:30,
  },
});
export default SelectPay;
