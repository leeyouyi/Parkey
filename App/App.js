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
  Image,
} from 'react-native';
import {SafeAreaProvider , SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import Route from './src/route'


TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {allowFontScaling: false})
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false})

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dispaly:'flex'
    }
  }
  componentDidMount() {
    setTimeout(()=>{
      this.setState({ dispaly: 'none' });
    },1500)
  }
  render(){
    if (this.state.dispaly ==='flex') {
      
      return  (
        <View style={[styles.mainContent,{display:this.state.dispaly}]}>
          <Image  resizeMode="contain" style={[styles.Image,{display:this.state.dispaly}]} source={require('./assets/intro.png')} />
        </View>
      )
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

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    zIndex:99,
    position:'absolute',
  },
  Image:{
    width:'100%',
    height:'100%', 
    backgroundColor: '#CF6914',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

});
export default SafeView;
