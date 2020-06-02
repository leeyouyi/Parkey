import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import RNPickerSelect from 'react-native-picker-select';
import FootItem from '../../component/footer';
import ButtonItem from '../../component/button';
import {useSelector, useDispatch} from 'react-redux';
import {userAddLP} from '../../src/action';

const Add = props => {
  const {navigation} = props;
  const buttonData = {
    navigateTxt: 'Edit',
    buttonTxt: '確認新增車牌',
  };
  const num = 3;
  const [select, setSelect] = useState('請選擇...');
  const [checkBox, setCheckBox] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const userAddLPReducer = useSelector(state => state.userAddLPReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(
      userAddLP(
        10,
        userAddLPReducer.LPcheckBox1,
        userAddLPReducer.LPcheckBox2,
        userAddLPReducer.LPNickname,
        userAddLPReducer.LPNo1,
        userAddLPReducer.LPNo2,
        1,
        false,
      ),
    );
  }, []);
  return (
    <>
      <ScrollView style={{backgroundColor: '#fafafa'}}>
        <View style={styles.container}>
          <View style={styles.item}>
            <View style={styles.txtItem}>
              <Text style={styles.txt}>設定車種</Text>
            </View>
            <View style={styles.pickerWarp}>
              <View
                style={{
                  width: '90%',
                }}>
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{
                    label: '請選擇...',
                    value: null,
                    color: 'grey',
                  }}
                  placeholderTextColor="#f00"
                  value={select}
                  onValueChange={value => {
                    let type = value === '普通重型機車(白牌)' ? 10 : 9;
                    setSelect(value);
                    dispatch(
                      userAddLP(
                        type,
                        userAddLPReducer.LPcheckBox1,
                        userAddLPReducer.LPcheckBox2,
                        userAddLPReducer.LPNickname,
                        userAddLPReducer.LPNo1,
                        userAddLPReducer.LPNo2,
                        userAddLPReducer.DType,
                        true,
                      ),
                    );
                  }}
                  items={[
                    {
                      label: '普通重型機車(白牌)',
                      value: '普通重型機車(白牌)',
                      displayValue: true,
                    },
                    {
                      label: '輕型機車(綠牌)',
                      value: '輕型機車(綠牌)',
                    },
                  ]}>
                </RNPickerSelect>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row2}>
              <CheckBox
                isChecked={checkBox}
                onClick={() => {
                  setCheckBox(!checkBox);
                  dispatch(
                    userAddLP(
                      userAddLPReducer.LPpicker,
                      !checkBox,
                      userAddLPReducer.LPcheckBox2,
                      userAddLPReducer.LPNickname,
                      userAddLPReducer.LPNo1,
                      userAddLPReducer.LPNo2,
                      userAddLPReducer.DType,
                      true,
                    ),
                  );
                }}
              />
              <Text>電動車</Text>
            </View>
            <View style={styles.row2}>
              <CheckBox
                isChecked={checkBox2}
                onClick={() => {
                  setCheckBox2(!checkBox2);
                  let type = checkBox2 ? 0 : 2;
                  dispatch(
                    userAddLP(
                      userAddLPReducer.LPpicker,
                      userAddLPReducer.LPcheckBox1,
                      !checkBox2,
                      userAddLPReducer.LPNickname,
                      userAddLPReducer.LPNo1,
                      userAddLPReducer.LPNo2,
                      type,
                      true,
                    ),
                  );
                }}
              />
              <Text>三輪機車</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.txtItem}>
              <Text style={styles.txt}>輸入車輛暱稱</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => {
                  dispatch(
                    userAddLP(
                      userAddLPReducer.LPpicker,
                      userAddLPReducer.LPcheckBox1,
                      userAddLPReducer.LPcheckBox2,
                      text,
                      userAddLPReducer.LPNo1,
                      userAddLPReducer.LPNo2,
                      userAddLPReducer.DType,
                      true,
                    ),
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.txtItem}>
              <Text style={styles.txt}>車牌號碼</Text>
            </View>
            <View style={styles.row4}>
              <View style={styles.inputWrap2}>
                <View style={{width: '90%'}}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'3碼'}
                    maxLength={3}
                    onChangeText={text => {
                      let regex = new RegExp("^[a-zA-Z0-9 ]+$")
                      if (text!== '' && !regex.test(text)){
                        // alert('車牌為英文或數字')
                      }else{
                        dispatch(
                          userAddLP(
                            userAddLPReducer.LPpicker,
                            userAddLPReducer.LPcheckBox1,
                            userAddLPReducer.LPcheckBox2,
                            userAddLPReducer.LPNickname,
                            text,
                            userAddLPReducer.LPNo2,
                            userAddLPReducer.DType,
                            true,
                          ),
                        )
                      }
                    }}
                  />
                </View>
              </View>
              <View style={styles.lineItem}>
                <View style={styles.line} />
              </View>
              <View style={styles.inputWrap3}>
                <View style={{width: '90%'}}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'3-4碼'}
                    maxLength={4}
                    onChangeText={text => {
                      let regex = new RegExp("^[a-zA-Z0-9 ]+$")
                      if (text!== '' && !regex.test(text)){
                        // alert('車牌為英文或數字')
                      }else{
                        dispatch(
                          userAddLP(
                            userAddLPReducer.LPpicker,
                            userAddLPReducer.LPcheckBox1,
                            userAddLPReducer.LPcheckBox2,
                            userAddLPReducer.LPNickname,
                            userAddLPReducer.LPNo1,
                            text,
                            userAddLPReducer.DType,
                            true,
                          ),
                        )
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.button}>
            <ButtonItem
              data={buttonData}
              navigation={navigation}
              listData={userAddLPReducer}
            />
          </View>
        </View>
      </ScrollView>
      <FootItem navigation={navigation} num={num} />
    </>
  );
};
const pickerStyle = {
  inputIOS: {
    color: '#121212',
  },
  inputAndroid: {
    color: '#121212',
  },
  placeholderColor: '#ccc',
  underline: {borderTopWidth: 0},
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: 5,
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
    height: 90,
    margin: 5,
  },
  txtItem: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  pickerWarp: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickTxt: {
    fontSize: 14,
    color: '#121212',
  },
  inputWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c7c7cc',
  },
  textInput: {
    height: '100%',
    width: '90%',
    fontSize: 17,
    textAlignVertical: 'center',
    color:'#000'
  },

  inputWrap2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c7c7cc',
  },
  inputWrap3: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c7c7cc',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 30,
  },
  row2: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row3: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row4: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#5d5d60',
  },
  lineItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '15%',
  },
  line: {
    width: '30%',
    height: 2,
    backgroundColor: '#212121',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
});
export default Add;
