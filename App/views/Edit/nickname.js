import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
import ButtonItem from '../../component/button';

const Nickname = props => {
  const {navigation,route} = props;
  const buttonData = {
    navigateTxt: 'Edit',
    buttonTxt: '確認',
  };
  const chengeData = route.params? route.params.chengeData : ''
  const [value, setValue] = useState('');
  return (
    <>
    <ScrollView style={{backgroundColor:'#fafafa'}}>
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.column}>
            <Text style={styles.itemTxt}>車輛暱稱</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={text => setValue(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonItem}>
          <ButtonItem 
          data={buttonData} 
          navigation={navigation} 
          chengeData={{
            LPNo:chengeData.txt1,
            LPNickname:value,
            LPType:chengeData.txt2
          }}
          ></ButtonItem>
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
    height:Dimensions.get('window').height - 150,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
    paddingTop:50
  },
  itemTxt: {
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
    fontSize: 17,
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
    position:'absolute',
    bottom:50

  },

});
export default Nickname;
