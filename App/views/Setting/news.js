import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import FootItem from '../../component/footer';
import * as userService from '../../axios/user';
import {useSelector} from 'react-redux';

const News = props => {
  const userInfoReducer = useSelector(state => state.userInfoReducer);
  const {navigation} = props;
  const num = 4;
  const [data ,setData]=useState([])
  useEffect(()=>{
    let req = {
      PhoneNo: userInfoReducer.phone,
      ptime: userService.time(),
    };
    userService
      .userQInfo(req)
      .then(res => {
        console.log(res.data)
        if (res.data.status === 0) {
          setData(res.data.data)
        } else {
          console.log(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },[])

  return (
    <>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrap}>
          {data.length !==0 ?
            data.map(item => {
              let time = item.BTime
              let year = time.substring(0,4)
              let mon = time.substring(4,6)
              let day = time.substring(6,8)
              let hour = time.substring(8,10) ;
              let minute = time.substring(10,12) ;
              let date = `${year}年${mon}月${day}日${hour}時${minute}分`
              return (
                <View style={styles.item}>
                  <View style={styles.column}>
                    <Text style={styles.itemtitle}>{item.BTitle}</Text>
                    <Text style={styles.itemTxt}>{date}</Text>
                    <Text style={styles.itemTxt}>{item.BMsg}</Text>
                  </View>
                </View>
              );
            })
            :
            <></>
        }
        </View>
      </View>
    </ScrollView>  
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
    alignItems: 'center',
    width: '100%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    borderBottomColor: '#d1d1d6',
    borderBottomWidth: 1,
  },
  itemtitle: {
    fontSize: 22,
    fontWeight:'bold',
    color: '#757575',
    padding: 5,
    paddingLeft: 10,
  },
  itemTxt: {
    fontSize: 18,
    color: '#757575',
    paddingLeft: 10,
  },
  column: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
  },


});
export default News;
