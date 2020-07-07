import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';

import {RNCamera} from 'react-native-camera';
// import { QRScannerView } from 'react-native-qrcode-scanner-view';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodes: [],
      flag: true
    };
  }

  barcodeRecognized = ({barcodes}) => {

    if (barcodes && barcodes[0].type === 'QR_CODE') {
      this.setState({flag:false})
      let data = barcodes.map(item => {
        return item.data
      });
      // console.log(data[0])
      const {navigation} = this.props;
        navigation.navigate('Lock',{
          devid:data[0],
        });
      };
    }


  onBarCodeRead = (e) => {
    let barcode = e.data
    const {navigation} = this.props;
    navigation.navigate('Lock',{
      devid:barcode,
    });
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          {
            Platform.OS === 'android'?
            <RNCamera
              captureAudio={false}
              style={styles.scanner}
              ref={ref => {
                this.camera = ref;
              }}
              onGoogleVisionBarcodesDetected={(e)=>{
                if(this.state.flag){
                  this.barcodeRecognized(e)
                }

              }}>

            </RNCamera>
            :
            <RNCamera
              captureAudio={false}
              style={styles.scanner}
              ref={ref => {
                this.camera = ref;
              }}
              type={RNCamera.Constants.Type.back}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              flashMode={RNCamera.Constants.FlashMode.auto}
              onBarCodeRead={(e) => {
                if(this.state.flag){
                  this.onBarCodeRead(e)
                }
                this.setState({flag:false})
              }}
              >
            </RNCamera>
          }

          <View style={styles.txtItemWrap}>
            <View style={styles.txtItem}>
              <Text style={styles.txtItemTxt}>掃描QR CODE來配對Parkey</Text>
            </View>
            <View style={styles.borderItem}></View>
            <View style={styles.txtItem2}>
              <Text style={styles.bottomItemTxt}>請對準車鎖右方的QR CODE</Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtItemWrap:{
    width:'100%',
    height:Dimensions.get('window').height-60,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
  },
  borderItem:{
    width:200,
    height:200,
    borderColor:'#f00',
    borderWidth:1
  },
  txtItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom:20
  },
  txtItem2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop:20
  },
  txtItemTxt: {
    fontSize: 24,
    color: '#000000',
  },
  bottomItemTxt: {
    fontSize: 24,
    color: '#F57C00',
  },
});
export default Camera;
