import React ,{useState}from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ButtonItem from '../../component/button';
import {SvgXml} from 'react-native-svg';
import newSvgs from '../../img/icon/new/svgs';
import CheckBox from 'react-native-check-box';

const GoPay = props => {
  const {navigation,route} = props;
  const {tickInfo} = route.params;

  const buttonData = {
    navigateTxt: 'PayEnd',
    buttonTxt: '確認繳費',
  };
  // const checkBox = []
  // const setCheckBox = []
  // const bg = []
  // const setBg = []

  // for (let i = 0; i < 3; i++) {
  //   // [checkBox[i], setCheckBox[i]] = useState(false);
  //   [bg[i],setBg[i]]= useState('#fff')
  // }
  // const data = [
  //   {
  //     txt:'信用卡一次付清',
  //     // checkox:checkBox[0],
  //     id:0
  //   },
  //   {
  //     txt:'悠遊付',
  //     // checkox:checkBox[1],
  //     id:1
  //   },
  //   {
  //     txt:'前往Pay Taipei網頁版頁面',
  //     // checkox:checkBox[2],
  //     id:2
  //   },
  // ]
  // // const[bg,setBg]= useState('#fff')
  return (
    <>
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
        {
          // data.map((item,index)=>{
          //   return(
          //     <View style={styles.txtItemWrap}>
          //     <View style={styles.payItem}>
          //       <View style={styles.row}>
          //         {/* <TouchableOpacity
          //           style={{
          //             width:20,
          //             height:20,
          //             borderColor:'#000',
          //             borderWidth:1,
          //             borderStyle:'solid',
          //             borderRadius:10,
          //             backgroundColor:bg[index]
          //           }}
          //           onPress={() => {
          //             // if(item.id === index){
    
          //             // }
          //             if(bg[index] === '#fff'){
          //               setBg[index]('#f00')
          //             }else{
          //               setBg[index]('#fff')
          //             }
          //           }}
                

          //         {/* <SvgXml 
          //             xml={newSvgs.visa}
          //             width="30"
          //             height="30"
          //             style={{marginLeft:15}}
          //         /> */}
          //         <Text style={styles.payTxt}>{item.txt}</Text>
          //       </View>
          //     </View>
          //   </View>
          //   )
          // })
        }

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
              <Text style={styles.payTxt}>**** 3233</Text>
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
          <ButtonItem  data={buttonData} navigation={navigation} tickInfo={tickInfo}></ButtonItem>
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
  }
});
export default GoPay;
