import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';

const SelectPay = props => {
  const {navigation,route} = props;
  const data = [
    {txt: '**** 1234', svg: newSvgs.visa, style:30,marginLeft:30},
    // {txt: '**** 1234', svg: newSvgs.master, style:30,marginLeft:30},
    {txt: '悠遊付', svg: newSvgs.easy, style:80,marginLeft:25},
    {txt: '前往付款設定綁定其他付款方式', svg: false},
  ];
  const tick = [];
  const setTick = [];
  for (let i = 0; i < data.length; i++) {
    [tick[i], setTick[i]] = useState(false);
  }
  useEffect(() => {
    setTick[0](true);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topItem}>
          <Text style={styles.topItemTxt}>選擇付款方式</Text>
        </View>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.touchableOpacity}
              activeOpacity={1}
              onPress={() => {
                for (let i = 0; i < data.length; i++) {
                  setTick[i](false);
                }
                setTick[index](true);
              }}>
              <View style={styles.itemWrap}>
                {
                  item.svg ?
                  <View style={styles.row}>
                    <View style={{width:'30%',alignItems:'flex-start',justifyContent:'center'}}>
                      <SvgXml
                        xml={item.svg}
                        width={item.style}
                        height={item.style}
                        style={{marginLeft:item.marginLeft, marginRight: 15}}
                      />
                    </View>
                    <View style={{width:'70%'}}>
                      <Text style={{fontWeight:'bold',fontSize:16}}>{item.txt}</Text>
                    </View>
                  {tick[index] &&  (
                    <SvgXml
                      xml={newSvgs.tick}
                      width="30"
                      height="30"
                      style={{position: 'absolute', right: 10}}
                    />
                  ) }
                </View>
                :
                <TouchableOpacity style={styles.row}
                onPress={() => {
                  navigation.navigate('Pay')
                }}>
                  <Text style={{color:'#27A48E',marginLeft: 30}}>{item.txt}</Text>
                </TouchableOpacity>
                }

              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingTop: 10,
  },
  topItem:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:70,
    paddingBottom:10,
    borderBottomColor:'#F4F4F5',
    borderBottomWidth:3,
  },

  topItemTxt:{
    width:'90%',
    alignItems: 'flex-start',
    fontSize: 25,
    color: '#5c5c5c',
    textAlign: 'left',
  },
  touchableOpacity: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrap: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomColor:'#F4F4F5',
    borderBottomWidth:3,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default SelectPay;
