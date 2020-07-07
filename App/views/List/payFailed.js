import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';

const PayEnd = props => {
  const {navigation, route} = props;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.svgItem}>
          <SvgXml xml={newSvgs.error} width="169" height="169" />

        </View>
        <View style={{width:'70%'}}>
          <Text style={styles.titleTxt}>非常抱歉，此筆停車單繳費失敗。</Text>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonItem}
        onPress={() => {
          navigation.navigate('Pay');
        }}>
        <Text style={styles.buttonItemTxt}>返回繳費設定</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.buttonBox1}>
        <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonItem1}
        onPress={() => {
          navigation.navigate('List');
        }}>
        <Text style={styles.buttonItemTxt1}>返回停車紀錄</Text>
      </TouchableOpacity>
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
  titleTxt: {
    paddingTop: 50,
    fontSize: 26,
    color: '#808082',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:20,
    backgroundColor:'#ffffff'
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#FF9500',
    borderRadius: 20,
  },
  buttonItemTxt: {
    fontSize: 18,
    color: '#fff',
  },
  buttonBox1:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:40,
    backgroundColor:'#ffffff'
  },
  buttonItem1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#FFE0B2',
    borderRadius: 20,
  },
  buttonItemTxt1: {
    fontSize: 18,
    color: '#FEA84C',
  },
});
export default PayEnd;
