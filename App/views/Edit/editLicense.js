import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import ButtonItem from '../../component/button';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';

const EditLicense = props => {
  const {navigation, route} = props;
  const chengeData = route.params? route.params.chengeData : ''

  const buttonData = {
    navigateTxt: 'Edit',
    buttonTxt: '確認'
  };
  const data = [
    { 
      txt: '車輛暱稱',
      style:styles.item2,
      row:styles.row2,
      txtStyle:styles.itemTxt2
    },
    { 
      txt: chengeData.txt,
      style:styles.item ,
      row:styles.row,
      txtStyle:styles.itemTxt,
      navigation: true
    },
    {
      txt: '車牌號碼',
      style:styles.item2,
      row:styles.row2,
      txtStyle:styles.itemTxt2
    },
    {
      txt: chengeData.txt1,
      style:styles.item,
      row:styles.row,
      txtStyle:styles.itemTxt
    },
    {
      txt: '車種資訊',
      style:styles.item2,
      row:styles.row2,
      txtStyle:styles.itemTxt2
    },
    {
      txt: chengeData.txt2,
      style:styles.item,
      row:styles.row,
      txtStyle:styles.itemTxt
    },
    {
      txt: '電動車',
      style:styles.item,
      row:styles.row,
      txtStyle:styles.itemTxt
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrap}>

          {data.map(item => {
            return (
              <>
              {
                item.navigation ?
                <TouchableOpacity
                  style={item.style}
                  onPress={() => navigation.navigate('Nickname',{chengeData:chengeData})}>
                  <View style={item.row}>
                    <Text style={item.txtStyle}>{item.txt}</Text>
                    <SvgXml xml={Svgs.right} width="40" height="40" />
                  </View>
                </TouchableOpacity>
              :
                <View style={item.style}>
                    <View style={item.row}>
                      <Text style={item.txtStyle}>{item.txt}</Text>
                    </View>
                </View>
              }
              </>
            );
          })}
        </View>
        <View style={styles.buttonItem}>
          <ButtonItem data={buttonData} navigation={navigation} chengeData={false}></ButtonItem>
        </View>
      </View>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFBFA',
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 60,
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  item2: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 60,
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
    paddingLeft:10
  },
  itemTxt2: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 10,
    textAlignVertical:'bottom'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  row2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingTop:20
  },
  itemTxt: {
    fontSize: 18,
    color: '#212121',
    paddingLeft: 10,
  },
  itemTxt2: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 10,
  },
  buttonItem:{
    width:'100%',
    height:150,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default EditLicense;
