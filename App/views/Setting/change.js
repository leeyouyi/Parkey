import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import ButtonItem from '../../component/button';
import PassWordItem from '../../component/PassWordItem';

const Change = props => {
  const {navigation} = props;
  const page = 'passwordPage'
  const buttonData = {
    navigateTxt: 'Accont',
    buttonTxt: '重設密碼',
  };
  const data = [
    {txt: '輸入舊密碼'},
    {txt: '輸入新設密碼'},
    {txt: '請再輸入一次新密碼'},
  ];

  const [value, setValue] = useState('');
  return (
    <>
      <ScrollView style={{backgroundColor: '#fafafa'}}>
        <View style={styles.container}>
          {data.map((item, index) => {
            return (
              <View style={styles.item}>
                <View style={styles.column}>
                  <Text style={styles.itemTxt}>{item.txt}</Text>
                    <PassWordItem page={page} index={index}></PassWordItem>
                </View>
              </View>
            );
          })}

          <View style={styles.buttonItem}>
            <ButtonItem data={buttonData} navigation={navigation} page={page}></ButtonItem>
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
    paddingTop: 30,
  },
  itemTxt: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 5,
    paddingBottom: 10,
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
    paddingTop: 50,
  },
});
export default Change;
