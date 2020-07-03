import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';


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
  render() {
    return <WebView source={{ uri: 'http://60.245.62.191:8080/' }} />;
  }
}

export default  webViewItem