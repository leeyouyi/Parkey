import React ,{useState,useRef}from 'react';
import {
  StyleSheet,
  View, 
  Text, 
  TouchableOpacity,
  Dimensions,Alert
} from 'react-native';
import ButtonItem from '../../component/button';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';
// import CheckBox from 'react-native-check-box';
import Modal from '../../component/modalbox';
import {useSelector, useDispatch} from 'react-redux';
import * as userService from '../../axios/user';
import {
  userUpdateList
} from '../../src/action';

const GoPay = props => {
  const {navigation,route} = props;
  const {tickInfo} = route.params;
  const modal = useRef('modal');
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const dispatch = useDispatch();
  const buttonData = {
    navigateTxt: 'PayEnd',
    // navigateTxt: 'payFailed',
    buttonTxt: '確認繳費',
  };

  return (
    <>
      <Modal
        style={styles.modal}
        ref={modal}
        isOpen={false}
        coverScreen={true}
        position={'center'}>
        <View
          style={{
            width: '100%',
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalItem}>
            <Text style={styles.modalTitle}>
              付款確認
            </Text>
          </View>
          <View style={styles.modalItem2}>
            <Text style={styles.modalTxt}>
              您將支付停車費，請問您確定要付款嗎 ?
            </Text>
          </View>
        </View>
        <View style={styles.modalButtonIRow}>
        <TouchableOpacity
            style={styles.modalButton1}
            onPress={() => {
              modal.current.close();
            }}>
            <Text style={styles.modalButtonTxt}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton2}
            onPress={() => {
              payTicket(userInfoReducer.phone, tickInfo, navigation, buttonData.navigateTxt, dispatch, modal)
            }}>
            <Text style={styles.modalButtonTxt}>確認</Text>
          </TouchableOpacity>
        </View>
        </Modal>
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <View style={styles.titleItem}>
            <Text style={styles.titleTxt}>設定付款</Text>
            <Text style={styles.titleTxt1}>基本資料</Text>
          </View>
        </View>

        <TxtItem tickInfo={tickInfo}></TxtItem>

        <View style={styles.titleWrap2}>
          <View style={styles.titleItem}>
            <Text style={styles.titleTxt1}>付款方式</Text>
          </View>
        </View>
  

        <TouchableOpacity style={styles.txtItemWrap}
        onPress={() => {
          navigation.navigate('SelectPay')
        }}
        >
          <View style={styles.payItem}>
            <View style={styles.row}>
              <SvgXml 
                  xml={newSvgs.visa}
                  width="30"
                  height="30"
                  style={{marginLeft:15}}
              />
              <Text style={styles.payTxt}>**** 1234</Text>
            </View>
            <SvgXml 
                xml={newSvgs.right_gray}
                width="35"
                height="35"
                style={ {transform: [{ rotate: '180deg'}]}}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.button}>
          <ButtonItem  data={buttonData} navigation={navigation} modal={modal} ></ButtonItem>
        </View>
       
      </View>
    </>
  );
};
const TxtItem = props => {
  const {tickInfo} = props;
  const data = [
    {
      txt: '停車單號',
      txt1: tickInfo.TicketNo,
    },
    {
      txt: '開單車號',
      txt1: `AKB-48`,
    },
    {
      txt: '應付停車費用',
      txt1: `${tickInfo.Amount} 元`,
    },

  ];
  return (
    <>
        {data.map(item => {
          return (
            <View style={styles.txtItemWrap}>
              <View style={styles.txtItem}>
                <View>
                  <Text style={styles.txtItemTxt}>{item.txt}</Text>
                </View>
                <View>
                  <Text style={styles.txtItemTxt}>{item.txt1}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </>
  );
};

// 確認繳費
const payTicket = (phone,tickInfo,navigation, navigateTxt,dispatch,modal)=>{
  let req = {
    PhoneNo: phone,
    TicketNo: tickInfo.TicketNo,
    LPNo: tickInfo.LpNo,
    ptime: userService.time(),
  };
  userService
    .userPayTicket(req)
    .then(res => {
      if (res.data.status === 0) {
        modal.current.close();
        navigation.navigate(navigateTxt);
        dispatch(userUpdateList(true))
      } else {
        Alert.alert('錯誤', res.data.msg, [{text: '確定'}]);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titleWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    backgroundColor: '#fafafa',
  },
  titleWrap2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#fafafa',
    borderBottomColor:'#e5e5ea',
    borderBottomWidth:1
  },
  titleItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
  },
  titleTxt: {
    fontSize: 25,
    color: '#5c5c5c',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom:10
  },
  titleTxt1: {
    fontSize: 14,
    color: '#212121',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtItemWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingTop:15,
    paddingBottom:15,
    borderBottomColor:'#e5e5ea',
    borderBottomWidth:1
  },
  txtItem: {
    width:'90%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  txtItemTxt: {
    fontSize: 14,
    color: '#212121',
  },
  row:{
    width:'40%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  payItem:{
    width:'90%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  payTxt:{
    paddingLeft:10,
    fontSize: 14,
    color: '#5c5c5c',
  },
  button:{
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
    paddingTop:30
  },
  modal: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalItem: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem2: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    width: '100%',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  modalTxt: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  modalButtonIRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#DEDFE0',
    borderTopWidth: 1,
  },
  modalButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton1: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton2: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#DEDFE0',
    borderLeftWidth: 1,
  },
  modalButtonTxt: {
    color: '#6DA0F3',
    fontSize: 22,
  },
});
export default GoPay;
