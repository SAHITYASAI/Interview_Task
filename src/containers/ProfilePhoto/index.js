import React, {Component} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage,
  Modal,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('window');

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUri: '',
    };
  }

  _onPressAdd = () => {
    Alert.alert(
      'Sahitya',
      'How would you like to select your profile picture ?',
      [
        {
          text: 'Select from gallery',
          onPress: () => this._SelectFromGallery(),
        },
        {
          text: 'Select from camera',
          onPress: () => this._SelectFromCamera(),
        },
      ],
      {cancelable: false},
    );
  };

  _SelectFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log(image);
      this.setState({imageUri: image.path});
    });
  };

  _SelectFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log(image);
      this.setState({imageUri: image.path});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.image}
          onPress={() => this._onPressAdd()}>
          <Image source={{uri: this.state.imageUri}} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.title}>Select a profile picture</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: width / 3.125,
    width: width / 3.125,
    borderWidth: 1,
    borderRadius: width / 5,
  },
  title: {
    marginTop: width / 37.5,
    fontSize: width / 18,
  },
});
