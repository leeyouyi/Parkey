import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
// import axios from 'axios';


class webViewItem extends Component {
  
  // componentDidMount() {
  //   axios
  //   .get('https://www.com/')
  //   .then(response => {
  //     console.log('response')
  //     console.log(response)
  //   })
  //   .catch(function (error) { // 请求失败处理
  //     console.log(error);
  //   });
  // }
  onMessage = (e) => {
    console.log("WebView onMessage 收到H5参数：", e.nativeEvent.data);
    let params = e.nativeEvent.data;
    params = JSON.parse(params);
    console.log("WebView onMessage 收到H5参数 json后：", params);
  };
  render() {
    return (
      <WebView 
        ref={(webview) => {
          this.web = webview;
        }}
        source={{ uri: 'http://60.245.62.191:8080/' }} 
        // onLoadEnd={(e) => {
        //   let data = {
        //     number: '4242424242424242',
        //     month:'01',
        //     year:'23',
        //     ccv:'123',
        //   };
        //   this.web && this.web.postMessage(JSON.stringify(data));
        // }}
        // onMessage={(e) => this.onMessage(e)}
        
        
      />
    )
  }
}

export default  webViewItem