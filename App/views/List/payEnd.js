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
          <SvgXml xml={newSvgs.oval} width="169" height="169" />
          <SvgXml
            xml={newSvgs.tick}
            width="200"
            height="200"
            style={{position: 'absolute', left: 0, bottom: 0}}
          />
        </View>
        <View>
          <Text style={styles.titleTxt}>您已完成繳費</Text>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonItem}
        onPress={() => {
          navigation.navigate('List');
        }}>
        <Text style={styles.buttonItemTxt}>返回停車紀錄</Text>
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
    paddingTop: 20,
    fontSize: 20,
    color: '#5d5d60',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:30,
    backgroundColor:'#ffffff'
  },
  buttonItem: {
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
export default PayEnd;
