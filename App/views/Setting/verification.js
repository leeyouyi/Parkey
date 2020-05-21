import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ButtonItem from '../../component/button';
import { isIphoneX } from 'react-native-iphone-x-helper'

const Verification = props => {
  const {navigation,route} = props;
  const buttonData = {
    navigateTxt: 'Code',
    buttonTxt: '發送驗證碼以綁定手機',
  };
  return (
    <>
      <View style={styles.container}>

        <View>
          <Text style={styles.topTxt}>Oh no ! 您尚未驗證手機</Text>
        </View>
        <View>
          <Text style={styles.bottomTxt}>您需要綁定手機才能開始使用</Text>
          <Text style={styles.bottomTxt}>Parkey相關服務。</Text>
        </View>

        <View style={styles.button}>
          <ButtonItem  data={buttonData} navigation={navigation} ></ButtonItem>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: '10%',
  },
  svgItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTxt: {
    paddingBottom: 20,
    fontSize: 26,
    color: '#505050',
    textAlign: 'center',
  },
  bottomTxt: {
    fontSize: 16,
    color: '#70C1B2',
    textAlign: 'center',
  },
  button:{
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: isIphoneX()? 120 : 80,
  }
  
});
export default Verification;
