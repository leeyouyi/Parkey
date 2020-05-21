/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SvgXml} from 'react-native-svg';
import Svgs from '../img/icon/nav/svgs';

import Home from '../views/Home';
import Parkey from '../views/Parkey';
import Camera from '../views/Parkey/camera';
import Lock from '../views/Parkey/lock';
import License from '../views/Parkey/license';
import Locked from '../views/Parkey/locked';

import List from '../views/List';
import Ticket from '../views/List/ticket';
import GoPay from '../views/List/goPay';
import SelectPay from '../views/List/selectPay';
import PayEnd from '../views/List/payEnd';

import Edit from '../views/Edit';
import Add from '../views/Edit/add';
import EditLicense from '../views/Edit/editLicense';
import Nickname from '../views/Edit/nickname';

import Setting from '../views/Setting';
import SignIn from '../views/Setting/signIn';
import SignUp from '../views/Setting/signUp';
import Code from '../views/Setting/code';
import Accont from '../views/Setting/accont';
import Info from '../views/Setting/info';
import Change from '../views/Setting/change';
import Pay from '../views/Setting/pay';
import CustomerService from '../views/Setting/customerService';
import About from '../views/Setting/about';
import Forget from '../views/Setting/forget';
import Reset from '../views/Setting/reset';
import News from '../views/Setting/news';
import Verification from '../views/Setting/verification';
import OldMember from '../views/Setting/oldMember';

import store from './store';
import {userUpdateLP} from './action';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        mode="card"
        screenOptions={{
          headerStyle: {
            height: 50,
            borderBottomColor: '#bdbdbd',
            borderBottomWidth: 1,
            backgroundColor: '#fff',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            height: Platform.OS === 'android' ? 25 : isIphoneX() ? 70 : 50,
            fontSize: 16,
            paddingTop: Platform.OS === 'android' ? 0 : isIphoneX() ? 5 : 15,
          },
          headerBackTitleStyle: {
            height: Platform.OS === 'android' ? 25 : isIphoneX() ? 70 : 50,
            color: '#ff9500',
            paddingLeft: Platform.OS === 'android' ? 5 : 30,
            fontSize: 16,
            paddingTop: Platform.OS === 'android' ? 0 : isIphoneX() ? 5 : 15,
          },
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackAllowFontScaling: true,
          headerBackImage() {
            return (
              <View
                style={
                  Platform.OS === 'android'
                    ? ''
                    : {
                        hight: 50,
                        position: 'absolute',
                        top: isIphoneX() ? 5 : 15,
                        left: 5,
                      }
                }>
                <SvgXml xml={Svgs.back} width="20" height="20" />
              </View>
            );
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title:'地圖',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Parkey"
          component={Parkey}
          options={{
            title: 'Parkey 智慧機車鎖',
            headerLeft() {
              return <></>;
            },
          }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{
            title: '停車紀錄',
            headerShown: false,
            headerLeftContainerStyle: {
              display: 'none',
            },
            headerBackImage() {
              return (
                <SvgXml
                  xml={Svgs.back}
                  width="20"
                  height="20"
                  style={{display: 'none'}}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: '車牌管理',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={() => ({
            title: '設定',
            headerLeft() {
              return <></>;
            },
          })}
        />

        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            title: 'Camera',
            headerTransparent: true,
            headerTitle() {
              style: {
                fontSize: 0;
              }
            },
          }}
        />
        <Stack.Screen
          name="Lock"
          component={Lock}
          options={({navigation, route}) => ({
            title: '設定上鎖資訊',
            headerLeft() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Parkey');
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        : {hight: 50, position: 'absolute', top: 20, left: 5}
                    }>
                    <Text
                      style={{
                        color: '#ff9500',
                        paddingLeft: 15,
                        fontSize: 14,
                        height:25
                      }}>
                      取消
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        />
        <Stack.Screen
          name="License"
          component={License}
          options={({navigation, route}) => ({
            title: '選擇車牌',
            headerRight() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Edit');
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        :isIphoneX()?{hight: 50, position: 'absolute', bottom: 15 } 
                        : {hight: 50, position: 'absolute', top: 0}
                    }>
                    <Text
                      style={{
                        color: '#ff9500',
                        paddingRight: 15,
                        fontSize: 14,
                      }}>
                      管理車牌
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="Locked"
          component={Locked}
          options={({navigation, route}) => ({
            title: 'Parkey 智慧機車鎖',
            headerLeft() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Parkey');
                    store.dispatch(userUpdateLP(true));
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        :isIphoneX()?{hight: 50, position: 'absolute', bottom: 15, left: 5 } 
                        : {hight: 50, position: 'absolute', top: 20, left: 5}
                    }>
                    <Text
                      style={{
                        color: '#ff9500',
                        paddingLeft: 15,
                        height:25,
                        fontSize: 14
                      }}>
                      所有停放
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        />

        {/* 紀錄與繳費 */}
        <Stack.Screen
          name="Ticket"
          component={Ticket}
          options={{
            title: '單筆停車紀錄',
            headerBackTitleVisible: true,
            headerBackTitle: '紀錄',
          }}
        />
        <Stack.Screen
          name="GoPay"
          component={GoPay}
          options={({navigation, route}) => ({
            title: '付款',
          })}
        />
        <Stack.Screen
          name="SelectPay"
          component={SelectPay}
          options={({navigation, route}) => ({
            title: '選擇付款方式',
          })}
        />
        <Stack.Screen
          name="PayEnd"
          component={PayEnd}
          options={({navigation, route}) => ({
            title: '付款',
            headerLeft() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('List');
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        :isIphoneX()?{hight: 50, position: 'absolute', bottom: 15, left: 5 } 
                        : {hight: 50, position: 'absolute', top: 20, left: 5}
                    }>
                    <Text
                      style={{
                        color: '#ff9500',
                        paddingLeft: 15,
                        fontSize: 14,
                      }}>
                      完成
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          })}
        />
        {/* 車牌管理 */}
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            title: '新增車牌',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="EditLicense"
          component={EditLicense}
          options={{
            title: '編輯車牌',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Nickname"
          component={Nickname}
          options={{
            title: '編輯暱稱',
            headerBackTitleVisible: true,
          }}
        />

        {/* 設定 */}
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: '登入',
            headerBackTitleVisible: true,
            headerBackTitle:null,
            headerTruncatedBackTitle:null
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: '註冊',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Code"
          component={Code}
          options={{
            title: '綁定手機',
            headerBackTitleVisible: true,
            headerBackTitle:null,
            headerTruncatedBackTitle:null
          }}
        />
        <Stack.Screen
          name="Accont"
          component={Accont}
          options={{
            title: '帳號資訊',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{
            title: '編輯姓名',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Change"
          component={Change}
          options={{
            title: '變更密碼',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Pay"
          component={Pay}
          options={{
            title: '設定付款方式',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="CustomerService"
          component={CustomerService}
          options={{
            title: '聯絡客服',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: '關於我們',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{
            title: '忘記密碼',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={({navigation, route}) => ({
            title: '重新設定密碼',
            headerLeft() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    const loginReducer = store.getState().loginReducer
                    let txt = loginReducer.login ? 'Setting': 'SignIn'
                    navigation.navigate(txt);
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        :isIphoneX()?{hight: 50, position: 'absolute', bottom: 15, left: 5 } 
                        : {hight: 50, position: 'absolute', top: 20, left: 5}
                    }>
                    <Text
                      style={{
                        color: '#ff9500',
                        paddingLeft: 15,
                        fontSize: 14,
                      }}>
                      取消
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{
            title: '最新消息',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={({navigation, route}) => ({
            title: '重新設定密碼',
            headerLeft() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Setting');
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        :isIphoneX()?{hight: 50, position: 'absolute', bottom: 15, left: 5 } 
                        : {hight: 50, position: 'absolute', top: 20, left: 5}
                    }>
                    <Text
                      style={{
                        color: '#A3A3A3',
                        paddingLeft: 15,
                        fontSize: 16,
                      }}>
                      先不要
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          })}
        /> 
        <Stack.Screen
          name="OldMember"
          component={OldMember}
          options={({navigation, route}) => ({
            title: '重新設定密碼',
            headerLeft() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Setting');
                  }}>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? ''
                        :isIphoneX()?{hight: 50, position: 'absolute', bottom: 15, left: 5 } 
                        : {hight: 50, position: 'absolute', top:15, left: 5}
                    }>
                    <Text
                      style={{
                        color: '#A3A3A3',
                        paddingLeft: 15,
                        fontSize: 16,
                      }}>
                      先不要
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
