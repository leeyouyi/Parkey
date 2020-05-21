/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
  Platform 
} from 'react-native';
import {SafeAreaProvider , SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import Route from './src/route'

TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {allowFontScaling: false})
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false})

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  mainContentWrap:{
    width:'100%',
    height:'100%', 
    backgroundColor: '#febe29',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    color: '#212121',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom:'25%'
  },


});
const slides = [
  {
    key: 'somethun',
    title: '車P',
    image: require('./assets/1.jpg'),
    backgroundColor: '#59b2ab',
  },

];
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
    }
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.mainContent}>
        <View style={styles.mainContentWrap}>
        <Text style={styles.title}>{item.title}</Text>

        </View>
      </View>
    );
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  render(){
    if (!this.state.showRealApp) {
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
    }else
    return (
      <Route></Route>
      )
  }

};
const SafeView = ()=>{
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1,backgroundColor:'#EFEFF5'}}>
      <StatusBar hidden={Platform.OS === 'ios' ? true : false} />
        <App></App>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
export default SafeView;
