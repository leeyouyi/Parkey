import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import ButtonItem from '../../component/button';

const Info = props => {
  const {navigation,route} = props;
  const buttonData = {
    navigateTxt: 'Accont',
    buttonTxt: '儲存變更',
  };
  const infoData = route.params? route.params.infoData : ''
 
  useEffect(()=>{
    if(infoData){
      navigation.setOptions({ title: infoData.title })
    }
  })

  const [value, setValue] = useState('');
  return (
    <>
    <ScrollView style={{backgroundColor:'#fafafa'}}>
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.column}>
            <Text style={styles.itemTxt}>{infoData.txt}</Text>
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
          changeData={{
            type:infoData.type,
            value:value
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
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
    paddingTop:30
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
    height: 200,
    paddingTop:50
  },

});
export default Info;
