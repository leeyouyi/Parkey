import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import SvgUri from 'react-native-svg-uri';
import {SvgXml} from 'react-native-svg';
import Svgs from '../img/icon/tab/svgs';
import Svgs2 from '../img/icon/tab/svgs2';
import {useSelector, useDispatch} from 'react-redux';

const FootItem = props => {
  const loginReducer = useSelector(state => state.loginReducer);
  const userAddLPReducer = useSelector(state => state.userAddLPReducer);
  const login = loginReducer.login
  const {navigation} = props;
  const num = props.num;
  const tabSvgs = [];
  const setTabSvgs = [];
  const txtColor = [];
  const setTxtColor = [];
  for (let i = 0; i < 5; i++) {
    [tabSvgs[i], setTabSvgs[i]] = useState(Svgs);
    [txtColor[i], setTxtColor[i]] = useState(styles.text);
  }
  useEffect(() => {
    setTabSvgs[num](Svgs2);
    setTxtColor[num](styles.text2);
  });
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchable}
          title="Home"
          onPress={() => {
            navigation.navigate('Home', {
              footPage: 0,
              login: loginReducer.login,
            });
          }}>
          <SvgXml xml={tabSvgs[0].map} width="20" height="20" />
          <Text style={txtColor[0]}>地圖</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchable}
          title="Parkey"
          onPress={() => {
            let txt = login? 'Parkey': 'SignIn'
            navigation.navigate(txt, {
              footPage: 1,
              login: loginReducer.login,
              goPage:'Parkey'
            });
          }}>
          <SvgXml xml={tabSvgs[1].lock} width="20" height="20" />
          <Text style={txtColor[1]}>Parkey</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchable}
          title="List"
          onPress={() => {
            let txt = login? 'List': 'SignIn'
            navigation.navigate(txt, {
              footPage: 2,
              login: loginReducer.login,
              goPage:'List'
            });
          }}>
          <SvgXml xml={tabSvgs[2].inbox} width="20" height="20" />
          <Text style={txtColor[2]}>紀錄與繳費</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchable}
          title="Edit"
          onPress={() => {
            let txt = login? 'Edit': 'SignIn'
            navigation.navigate(txt, {
              footPage: 3,
              login: loginReducer.login,
              add: false,
              goPage:'Edit'
            });
          }}>
          <SvgXml xml={tabSvgs[3].list} width="20" height="20" />
          <Text style={txtColor[3]}>車牌管理</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchable}
          title="Setting"
          onPress={() => {
            navigation.navigate('Setting', {
              footPage: 4,
              login: loginReducer.login,
            });
          }}>
          <SvgXml xml={tabSvgs[4].setting} width="20" height="20" />
          <Text style={txtColor[4]}>設定</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#cccccc',
  },
  button: {
    width: '20%',
    height: 62,
  },
  text: {
    fontSize: 12,
    paddingTop: 5,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  text2: {
    fontSize: 12,
    paddingTop: 5,
    textAlign: 'center',
    color: '#ff9500',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FootItem;
