import React, {useState, useEffect,useRef} from 'react';
import {StyleSheet, View, Text ,TouchableOpacity,Dimensions} from 'react-native';
import CheckBox from 'react-native-check-box';
import ButtonItem from '../../component/button';
import Modal from '../../component/modalbox';

const EditPay = props => {
  const {navigation,route} = props;
  const {type} = route.params;
  // console.log(type)
  const buttonData = {
    navigateTxt: 'EditCard',
    buttonTxt: '編輯信用卡',
  };
 const [data,setDate] = useState([])
  useEffect(()=>{
    if(type === 'card'){
      setDate(
        [
          {title:'信用卡號', txt: '**** 1234',type},
          {title:'有效日期', txt: '05/22',type},
        ]
      )
    }else {
      setDate(
        [
          {title:'已設定悠遊付付款', type},
        ]
      )
    }
  },[])

  const [checkBox,setCheckBox] = useState(false)
  const modal = useRef('modal');
  const modalTxt = type === 'card' ? '您確定要刪除此信用卡 ?' : '您確定要刪除悠遊付綁定 ?'
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
              確定刪除
            </Text>
          </View>
          <View style={styles.modalItem2}>
            <Text style={styles.modalTxt}>
              {modalTxt}
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
              modal.current.close();
            }}>
            <Text style={styles.modalButtonTxt}>確認</Text>
          </TouchableOpacity>
        </View>
        </Modal>
      <View style={styles.container}>

        {data.map((item, index) => {
          let width =type === 'card'? '30%': '100%'
          return (
            <View style={styles.item}>
              <View style={styles.itemWrap}>
                <View style={styles.row}>
                  <View style={{width: width ,alignItems:'flex-start',justifyContent:'center'}}>
                    <Text style={{color:'#27A48E',marginLeft: 30}}>{item.title}</Text>
                  </View>
                  {
                    type === 'card' &&
                    <View style={{width:'70%'}}>
                      <Text style={{fontWeight:'bold',fontSize:16}}>{item.txt}</Text>
                    </View>
                  }
 
                </View>
              </View>
            </View>
          );
        })}

          <View style={styles.checkBoxItem}>
            <CheckBox
              style={{padding:15}}
              isChecked={checkBox}
              onClick={() => {
                setCheckBox(!checkBox);
              }}
            />
            <Text style={{fontSize:16}}>設為主要付款方式</Text>
          </View>

          <View style={styles.button}>
          {
            type === 'card' &&
            <ButtonItem data={buttonData} navigation={navigation} type={type}></ButtonItem>
          }
            
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonItem}
                onPress={() => {
                  modal.current.open();
                }}>
                <Text style={styles.buttonItemTxt}>刪除</Text>
              </TouchableOpacity>
            </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingTop: 30,
  },
  topItem:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:70,
    paddingBottom:10,
    borderBottomColor:'#F4F4F5',
    borderBottomWidth:3,
  },

  topItemTxt:{
    width:'90%',
    alignItems: 'flex-start',
    fontSize: 25,
    color: '#5c5c5c',
    textAlign: 'left',
  },
  item: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrap: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomColor:'#F4F4F5',
    borderBottomWidth:3,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkBoxItem:{
    width:'95%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    // paddingTop:15,
    // paddingBottom:15,
  },
  button:{
    width:'100%',
    justifyContent:'flex-end',
    alignItems: 'center',
    flex:1,
    marginBottom:15,
  },
  buttonWrap:{
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:40,
  },
  buttonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#E5E5EB',
    borderRadius: 20,
  },
  buttonItemTxt: {
    fontSize: 18,
    color: '#7C7C7E',
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
export default EditPay;
