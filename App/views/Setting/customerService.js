import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking 
} from 'react-native';
import FootItem from '../../component/footer';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';

const CustomerService = props => {
  const {navigation, route} = props;
  const num = 4;
  const data = [
    {txt: '寫信至客服信箱', navigationTxt: 'Setting'},
    {txt: '撥打客服電話', navigationTxt: 'Setting'},
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrap}>
          {data.map((item ,index)=> {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>{
                  if(index === 0) Linking.openURL('mailto:smartwaysolutions.service@gmail.com')
                  if(index === 1) Linking.openURL('tel:02-2547-1291')
                  navigation.navigate(item.navigationTxt)
                }}>
                <View style={styles.row}>
                  <Text style={styles.itemTxt}>{item.txt}</Text>
                  <SvgXml xml={Svgs.right} width="40" height="40" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <FootItem navigation={navigation} num={num}></FootItem>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
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
    height: '10%',
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
    padding: 10,
  },
  itemTxt: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  row2: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#d1d1d6',
    borderRadius: 25,
  },
  version: {
    color: '#757575',
    fontSize: 12,
  },
});
export default CustomerService;
