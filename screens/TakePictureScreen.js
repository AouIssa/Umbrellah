import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import baseURL from '../api/client';
import { useNavigation } from '@react-navigation/native';
const TakePictureScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleTakePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      // Convert the image to a blob
      let imageBlob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = reject;
        xhr.open('GET', photo.uri);
        xhr.send();
      });
      // Create a FormData object
      let formData = new FormData();
      formData.append('image', imageBlob, 'photo.jpg');
      try {
        // Send the image to the server
        const { data } = await axios.post(baseURL + '/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (data.status === 'ok') {
          console.log('Image uploaded to server successfully');
          navigation.navigate('ThankYouScreen');
        } else {
          console.log('Error uploading image to server:', data.message);
        }
      } catch (error) {
        console.log('Error uploading image', error);
      }
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {navigation.navigate('ThankYouScreen')}}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Snap</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default TakePictureScreen;
