import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';

const SelectPay = props => {
  const {navigation,route} = props;
  const data = [
    {txt: '綁定信用卡', svg: newSvgs.card ,style:30,marginLeft:30,navigateTxt: 'Binding',},
    {txt: '綁定悠遊付', svg: newSvgs.easy ,style:80,marginLeft:25,navigateTxt: 'AddPay',}
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topItem}>
          <Text style={styles.topItemTxt}>付款類型</Text>
        </View>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.touchableOpacity}
              activeOpacity={1}
              onPress={() => {
                navigation.navigate(item.navigateTxt)
              }}>
              <View style={styles.itemWrap}>
                {
                  item.svg &&
                  <View style={styles.row}>
                    <View style={{justifyContent:'flex-start',width:'20%'}}>
                      <SvgXml
                        xml={item.svg}
                        width={item.style}
                        height={item.style}
                        style={{marginLeft: item.marginLeft, marginRight: 15}}
                      />
                    </View>
                  <View style={{justifyContent:'center',alignItems:'center', width:'60%'}}>
                    <Text style={{fontWeight:'bold',fontSize:18}}>{item.txt}</Text>
                  </View>
                </View>

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
    width: '90%',
    height: 60,
    borderRadius:15,
    marginBottom:10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  row: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default SelectPay;
