import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/new/svgs';
import {useSelector} from 'react-redux';
import ButtonWhute from '../../component/buttonWhite'

const Accont = props => {
  const {navigation, route} = props;
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const buttonData = {
    navigateTxt: 'Setting',
    buttonTxt: '登出',
  };
  // console.log(userInfoReducer)
  const [name,setName] = useState('Fancy')
  const [Fname,setFname] = useState('Lin')
  const [email,setEmail] = useState('A123@gmail.com')
  const [phone,setPhone] = useState('0912345678')
  const [pid,setPid] = useState('3366')
  const [status,setStatus] = useState('')
  useEffect(()=>{
    setName(userInfoReducer.name)
    setEmail(userInfoReducer.email)
    setPhone(userInfoReducer.phone)
    setFname(userInfoReducer.Fname)
    setPid(userInfoReducer.pid)
    setStatus(userInfoReducer.status)
 
  },[userInfoReducer])

  const data = [
    {
      txt: '名',
      txt2: name,
      navigationTxt: 'Info',
      space: 10,
      click: true,
      title: '編輯姓名',
      num: 1,
      type:'name'
    },
    {
      txt: '姓',
      txt2: Fname,
      navigationTxt: 'Info',
      space: 0,
      click: true,
      title: '編輯姓名',
      num: 2,
      type:'Fname'
    },
    {
      txt: '手機號碼',
      txt2: phone,
      navigationTxt: status === 4 ? 'Verification' : Accont,//false Accont
      space: 10,
      click: status === 4 ? true : false,
      rightTxt:'前往驗證'
    },
    {
      txt: 'email信箱',
      txt2: email,
      navigationTxt: 'Info',
      space: 0,
      click: true,
      title: '編輯聯絡資訊',
      num: 3,
      type:'email'
    },
    {
      txt: '身分證後4碼',
      txt2: pid,
      navigationTxt: 'Accont',
      space: 10,
      click: false,
    },
    {
      txt: '',
      txt2: '修改密碼',
      navigationTxt: 'Change',
      space: 10,
      click: true,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        {data.map(item => {
          const opacity = item.click ? 0.5 : 1;
          return (
            <TouchableOpacity
              activeOpacity={opacity}
              style={styles.item}
              onPress={() =>
                navigation.navigate(item.navigationTxt, {infoData: item})
              }>
              <View
                style={{
                  marginTop: item.space,
                }}>
                <View style={styles.row}>
                  {item.txt !== '' ? (
                    <View
                      style={{height: '80%', justifyContent: 'space-around'}}>
                      <Text style={styles.itemTxt}>{item.txt}</Text>
                      <Text style={styles.itemTxt2}>{item.txt2}</Text>
                    </View>
                  ) : (
                    <View style={{height: '80%', justifyContent: 'center'}}>
                      <Text style={styles.itemTxt2}>{item.txt2}</Text>
                    </View>
                  )}
                  {item.click ? 
                  (
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Text style={{ color: '#ff9500'}}>{item.rightTxt}</Text> 
                      <SvgXml
                        xml={Svgs.right}
                        width="40"
                        height="40"
                        style={{marginRight: 15}}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.buttonItemWrap}>
          <ButtonWhute data={buttonData} navigation={navigation}></ButtonWhute>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF5',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '12%',
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
  },
  itemTxt: {
    fontSize: 12,
    color: '#1EE494',
    paddingLeft: 30,
  },
  itemTxt2: {
    fontSize: 14,
    color: '#212121',
    paddingLeft: 30,
  },
  row: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonItemWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  }
});
export default Accont;
