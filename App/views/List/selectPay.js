import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';

const SelectPay = props => {
  const data = [
    {txt: '1111 2222 3333 4444', svg: newSvgs.visa},
    {txt: '1111 2222 3333 4444', svg: newSvgs.visa},
    {txt: '1111 2222 3333 4444', svg: newSvgs.visa},
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
                <View style={styles.row}>
                  <SvgXml
                    xml={item.svg}
                    width="30"
                    height="30"
                    style={{marginLeft: 30, marginRight: 15}}
                  />
                  <Text>{item.txt}</Text>
                  {tick[index] ? (
                    <SvgXml
                      xml={newSvgs.tick}
                      width="30"
                      height="30"
                      style={{position: 'absolute', right: 10}}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF5',
    paddingTop: 10,
  },
  touchableOpacity: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrap: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 15,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default SelectPay;
