import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import FootItem from '../../component/footer';

const About = props => {
  const {navigation} = props;
  const num = 4;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.item}>
            <Text>
              關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們關於我們
            </Text>
          </View>
        </View>
      </View>
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
  wrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
  },
  itemTxt: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  row2: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#d1d1d6',
    borderRadius: 25,
  },
  version: {
    color: '#757575',
    fontSize: 12,
  },
});
export default About;
