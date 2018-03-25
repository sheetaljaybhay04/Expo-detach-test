import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast';
console.disableYellowBox = true;

const config = {
 apiKey: 'AIzaSyAI16Z63-SqJGnkg6E_bnLoZSSE3uBQkNI',
 authDomain: 'authentication-20445.firebaseapp.com',
 databaseURL: 'https://authentication-20445.firebaseio.com',
 projectId: 'authentication-20445',
 storageBucket: 'authentication-20445.appspot.com',
 messagingSenderId: '301374231448'
};

firebase.initializeApp(config);


export default class App extends React.Component {

  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Upload Image"
          onPress={this._takePhoto}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
           <Toast ref="toast"/>
      </View>
    );
  }

  _takePhoto = async () => {
          let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              base64:true
          });


          if (!result.cancelled) {
              this.setState({image: result.uri});
              console.log(result.base64)
              firebase.database().ref().child('images').push(result.base64);
              this.refs.toast.show('Image Uploaded');
          }
      }
}
/*_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
};*/
