import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';
import {useSelector, useDispatch} from 'react-redux';
import {userSelectLP} from '../../src/action';

const License = props => {
  const userSelectLPReducer = useSelector(state => state.userSelectLPReducer);
  const {navigation, route} = props;
  const list = route.params.list;
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    let listData = list.data.map(item => {
      let LPType = '';
      switch (item.LPType) {
        case 9:
          LPType = '輕型機車(綠牌)';
          break;
        case 109:
          LPType = '輕型機車(綠牌)，電動車';
          break;
        case 110:
          LPType = '普通重型機車(白牌)，電動車';
          break;
        default:
          LPType = '普通重型機車(白牌)';
          break;
      }
      return {
        txt: item.LPNickname,
        txt1: item.LPNo,
        txt2: LPType,
      };
    });
    setListData(listData);
  }, []);

  const tick = [];
  const setTick = [];
  for (let i = 0; i < 3; i++) {
    [tick[i], setTick[i]] = useState(false);
  }
  useEffect(() => {
    listData.forEach((item, index) => {
      if (item.txt1 === userSelectLPReducer.selectLP) {
        setTick[index](true);
      }
    });
  });

  return (
    <>
      <ScrollView style={{backgroundColor: '#fafafa', paddingTop: 10}}>
        <View style={styles.container}>
          {listData.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.touchableOpacity}
                activeOpacity={1}
                onPress={() => {
                  for (let i = 0; i < listData.length; i++) {
                    setTick[i](false);
                  }
                  setTick[index](true);
                  dispatch(userSelectLP(item.txt1, item.txt, item.txt2));
                }}>
                <View style={styles.itemWrap}>
                  <View style={styles.item}>
                    <View style={styles.row}>
                      <Text style={styles.txt}>{item.txt}</Text>
                      <Text style={styles.txt2}>{item.txt1}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.txt3}>{item.txt2}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 20}} />
                    {tick[index] ? (
                      <SvgXml
                        xml={newSvgs.tick}
                        width="30"
                        height="30"
                        style={{position: 'absolute', right: 20, top: 30}}
                      />
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
    paddingTop: 5,
  },
  touchableOpacity: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 20,
    elevation: 2,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
  },
  txt: {
    fontSize: 18,
    color: '#5d5d60',
  },
  txt2: {
    fontSize: 18,
    color: '#1ee494',
    paddingLeft: 15,
  },
  txt3: {
    fontSize: 14,
    color: '#757575',
  },
});
export default License;
