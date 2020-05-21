import React from 'react';
import {StyleSheet, View} from 'react-native';
import FootItem from '../../component/footer';

const Pay = props => {
  const {navigation} = props;
  const num = 4;

  return (
    <>
      <View style={styles.container}></View>
      <FootItem navigation={navigation} num={num}></FootItem>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});
export default Pay;
