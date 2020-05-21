import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';

const PayEnd = props => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.svgItem}>
          <SvgXml xml={newSvgs.oval} width="169" height="169" />
          <SvgXml
            xml={newSvgs.tick}
            width="200"
            height="200"
            style={{position: 'absolute', left: 0, bottom: 0}}
          />
        </View>
        <View>
          <Text style={styles.titleTxt}>您已完成繳費</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: '10%',
  },
  svgItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    paddingTop: 20,
    fontSize: 20,
    color: '#5d5d60',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default PayEnd;
