import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import ButtonItem from '../../component/button';

const Forget = props => {
  const {navigation} = props;
  const buttonData = {
    navigateTxt: 'Reset',
    buttonTxt: '發送臨時密碼',
  };

  const [value, setValue] = useState('');
  const data = [
    {txt: '手機號碼',value:value ,set:setValue}
  ];

  return (
    <>
      <ScrollView style={{backgroundColor: '#fafafa'}}>
        <View style={styles.container}>
          <View style={styles.topItem}>
            <Text style={styles.topItemTxt}>
            請輸入您帳戶之手機號碼
            </Text>
          </View>
          {data.map(item => {
            return (
              <View style={styles.item}>
                <View style={styles.column}>
                  <Text style={styles.itemTxt}>{item.txt}</Text>
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={styles.textInput}
                      keyboardType='numeric'
                      value={item.value}
                      onChangeText={text => item.set(text)}
                    />
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.buttonItem}>
            <ButtonItem data={buttonData} navigation={navigation} value={{
              // email:value,
              phone:value
            }}></ButtonItem>
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
    paddingTop: 30,
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
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    paddingTop: 10,
  },
});
export default Forget;
