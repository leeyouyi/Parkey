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
  Platform,
  Image
} from 'react-native';
import {SafeAreaProvider , SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import Route from './src/route'
import {SvgXml} from 'react-native-svg';
import Svgs from './img/icon/new/svgs';

TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {allowFontScaling: false})
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false})

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  Image:{
    width:'100%',
    height:'100%', 
    backgroundColor: '#CF6914',
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
    // title: '車P',
    // image: require('./assets/1.jpg'),
    image: require('./assets/intro.png'),
    // backgroundColor: '#59b2ab',
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
      // <Image  style={{ width:'100%',height:'100%'}}  resizeMode="cover"  source={require('./assets/intro.png')} />
      <View style={styles.mainContent}>
          <Image  resizeMode="contain" style={styles.Image} source={item.image} />
          {/* <SvgXml xml={Svgs.lock_S} width="100" height="50" /> */}
      </View>
        
    );
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  render(){
    if (!this.state.showRealApp) {
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} doneLabel={'skip'} onDone={this._onDone}/>;
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
