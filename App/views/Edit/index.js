import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  AsyncStorage,
  Alert
} from 'react-native';
import FootItem from '../../component/footer';
import ButtonItem from '../../component/button';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../img/icon/nav/svgs';
import formSvgs from '../../img/icon/form/svgs';
import DraggableFlatList from 'react-native-draggable-flatlist';
import * as userService from '../../axios/user';
import store from '../../src/store';
import {userAddLP, userModifyLP,login,userinfo,userSelectLP} from '../../src/action';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.store = store.getState();
    this.state = {
      login: store.getState().loginReducer.login,
      userAddLP: store.getState().userAddLPReducer,
      ModifyLP: false,
      refresh: false,
      refreshList: false,
      dragItemData: [],
      display: 'flex',
      display2: 'none',
      loading: true,
      QLPList:[]
    };
  }
  _login_event(){
    const userInfoReducer =  store.getState().userInfoReducer
      AsyncStorage.multiGet(['token', 'login_phone','login_pw','random']).then((data)=>{
        let token = data[0][1] || null;
        if (token == 'asdfghjkl410') {
          let phone = data[1][1]
          let password = data[2][1]
          let random = data[3][1]
          let req = {
            PhoneNo: phone,
            Password: password,
            ptime: userService.time(),
          };
          userService
          .userLogin(req)
          .then(res => {
            if (res.data.status === 0) {
              store.dispatch(login(true, phone, password,random));
              let req2 = {
                PhoneNo: phone,
                ptime: userService.time(),
              };
              userService
                .userQMemberInfo(req2)
                .then(res => {
                  if (res.data.status === 0) {
                    let {UName, email, FName, PID} = res.data;
                    store.dispatch(userinfo(UName, FName, phone, email, PID,userInfoReducer.status));
                  }
                })
                .catch(err => {
                  console.log(err);
                })
              } 
            })
          .catch(err => {
            console.log(err);
          })      
        }
      });

  }
  deleteLP(LPNo,item) {
    const userInfoReducer = this.store.userInfoReducer;
    let req = {
      PhoneNo: userInfoReducer.phone,
      LPNo: LPNo,
      ptime: userService.time(),
    };
    userService
      .userDeleteLP(req)
      .then(res => {
        if (res.data.status === 0) {
          let dragItemData = this.state.dragItemData;
          let index = dragItemData.indexOf(item);
          dragItemData.splice(index, 1);
          this.setState({dragItemData: dragItemData});
          store.dispatch(userSelectLP('','',''))
          this.getList();
        }else{
          if(res.data.msg === '錯誤的登入資訊'){
            console.log(res.data.msg);
          }else{
             Alert.alert('錯誤', res.data.msg, [{text: '確定'}])
          }
          this.setState({loading:false})
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const userAddLPReducer = store.getState().userAddLPReducer;
    const storeAdd = userAddLPReducer.add;
    if (storeAdd) {
      store.dispatch(
        userAddLP(
          userAddLPReducer.LPpicker,
          userAddLPReducer.LPcheckBox1,
          userAddLPReducer.LPcheckBox2,
          userAddLPReducer.LPNickname,
          userAddLPReducer.LPNo2,
          userAddLPReducer.LPNo2,
          userAddLPReducer.DType,
          false,
        ),
      );
      this.getList();
    }
    const userModifyLPReducer = store.getState().userModifyLPReducer;
    const ModifyLP = userModifyLPReducer.ModifyLP;
    if (ModifyLP) {
      store.dispatch(userModifyLP(false));
      this.getList();
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const userInfoReducer = store.getState().userInfoReducer;
    if(userInfoReducer.status === 4){
      navigation.navigate('Verification');
    }
    this._login_event()
    this.getList();
  }
  getList() {
    let loginReducer = store.getState().loginReducer;
    let userInfoReducer = store.getState().userInfoReducer;
    let userAddLPReducer = store.getState().userAddLPReducer;
    if (loginReducer.login) {
      let req = {
        PhoneNo: userInfoReducer.phone,
        ptime: userService.time(),
      };

      userService
        .userQLPList(req)
        .then(res => {
          if (res.data.status === 0) {
            if (!Number(res.data.data))  this.setState({loading:false});
            if (!res.data.data) this.setState({loading:false});
            let data = res.data.data || [];
            this.setState({QLPList:data})
            let newData = data.map(item => {
              let txt2 = '';
              switch (item.LPType) {
                case 9:
                  txt2 = '輕型機車(綠牌)';
                  break;
                case 109:
                  txt2 = '輕型機車(綠牌)，電動車';
                  break;
                case 110:
                  txt2 = '普通重型機車(白牌)，電動車';
                  break;
                default:
                  txt2 = '普通重型機車(白牌)';
                  break;
              }
              return {
                txt: item.LPNickname,
                txt1: item.LPNo,
                txt2: txt2,
              };
            });

            let dragItemData = [...Array(data.length)].map((d, index) => ({
              key: `item-${index}`,
              label: index,
              data: newData,
            }));
            this.setState({loading: false});
            this.setState({dragItemData: dragItemData});
            this.setState({userAddLP: userAddLPReducer});
            this.setState({ModifyLP: true});
            this.setState({refreshList: !this.state.refreshList});
          }else{
            if(res.data.msg !== '會員尚未認證'){
              if(res.data.msg === '錯誤的登入資訊'){
                console.log(res.data.msg);
              }else{
                 Alert.alert('錯誤', res.data.msg, [{text: '確定'}])
              }
            }
            this.setState({loading:false})
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({dragItemData: []});
    }
  }
  renderItem = ({item, index, drag, isActive}) => {
    const {navigation} = this.props;
    const doDrag = this.state.refresh ? drag : false;
    const navigationTxt = this.state.refresh ? 'Edit' : 'EditLicense';

    return (
      <>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '10%',
              flexDirection: 'row',
              justifyContent: 'center',
              display: this.state.display2,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: 10,
              }}
              onPress={() => {
                let dragItemData = this.state.dragItemData;
                let index = dragItemData.indexOf(item);

                this.deleteLP(item.data[index].txt1,item);
                // dragItemData.splice(index, 1);
                // this.setState({dragItemData: dragItemData});
              }}>
              <SvgXml
                xml={formSvgs.delete}
                width="20"
                height="20"
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              let chengeData = item.data[index];
              navigation.navigate(navigationTxt, {chengeData: chengeData});
            }}
            // onLongPress={doDrag}
            >
            <View style={styles.row}>
              <Text style={styles.txt}>
                {item.data[index] ? item.data[index].txt : ''}
              </Text>
              <Text style={styles.txt2}>
                {item.data[index] ? item.data[index].txt1 : ''}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.txt3}>
                {item.data[index] ? item.data[index].txt2 : ''}
              </Text>
            </View>
            <View style={{position: 'absolute', right: 20}}>
              <SvgXml
                xml={formSvgs.order}
                width="25"
                height="25"
                style={{display: this.state.display2}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  render() {
    const {navigation,route} = this.props;
    const buttonData = {
      navigateTxt: 'Add',
      buttonTxt: '新增車牌',
    };
    const num = 3;
    const login = this.props.route.params
      ? this.props.route.params.login
      : false;
    const loading = this.state.loading;

    return (
      <>
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}> 
        <View style={styles.title}>
          <Text style={styles.tltleTxt}>車牌管理</Text>
          <TouchableOpacity
            style={{
                position: 'absolute',
                left: 20 ,
              }}
            onPress={() => {
              navigation.navigate('Edit');
              const css = this.state.display === 'none' ? 'flex' : 'none';
              const css2 = this.state.display2 === 'none' ? 'flex' : 'none';
              this.setState({display: css});
              this.setState({display2: css2});
              this.setState({
                refresh: !this.state.refresh,
              });
            }}>
            <Text style={{color: '#ff9500', display: this.state.display2}}>
              取消
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20 ,
            }}
            onPress={() => {
              navigation.navigate('Edit');
              const css = this.state.display === 'none' ? 'flex' : 'none';
              const css2 = this.state.display2 === 'none' ? 'flex' : 'none';
              this.setState({display: css});
              this.setState({display2: css2});
              this.setState({
                refresh: !this.state.refresh,
              });
            }}>
            <SvgXml
              xml={Svgs.edit}
              width="30"
              height="30"
              style={{display: this.state.display}}
            />
            <Text style={{color: '#ff9500', display: this.state.display2}}>
              完成
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={{flex: 1, position: 'absolute', width: '100%'}}>
            {login ? (
              <DraggableFlatList
                style={{width: '100%'}}
                data={this.state.dragItemData}
                renderItem={this.renderItem}
                extraData={this.state}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({data}) => {
                  this.setState({dragItemData: data});
                }}
              />
            ) : (
              <></>
            )}
          </View>
          {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ActivityIndicator size="large" color="#ff9500" />
            </View>
          ) : (
            <></>
          )}
          <View style={{width: '100%', position: 'absolute', bottom: 50}}>
            <View style={{width: '100%', display: this.state.display}}>
              <View style={styles.button}>
                <ButtonItem data={buttonData} navigation={navigation} QLPList={this.state.QLPList} />
              </View>
            </View>
          </View>
        </View>
        </SafeAreaView> 
        <FootItem navigation={navigation} num={num} />
      </>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ffffff',
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
  },
  tltleTxt: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF5',
    paddingTop: 5,
    height: Dimensions.get('window').height - 150,
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
  },
  txt: {
    fontSize: 18,
    color: '#5d5d60',
  },
  txt2: {
    fontSize: 18,
    color: '#1ee494',
    paddingLeft: 15,
  },
  txt3: {
    fontSize: 14,
    color: '#757575',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Edit;
