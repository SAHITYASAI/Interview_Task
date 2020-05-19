import React, {Component} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import Constants from '../../themes/Constants';
import Images from '../../themes/Images';
import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('window');

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageGallery: Constants.ImageGallery,
      imageUri: '',
      modalVisible: false,
    };
  }

  _onPressAdd = () => {
    Alert.alert(
      'Sahitya',
      'How would you like to add an image ?',
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
      //   console.log(image);
      let imageGallery = this.state.imageGallery;
      imageGallery.splice(this.state.imageGallery.length - 1, 0, {
        image: image.path,
        imageSrc: image.sourceURL,
        addIcon: false,
      });
      this.setState({imageGallery: this.state.imageGallery});
    });
  };

  _SelectFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      let imageGallery = this.state.imageGallery;
      imageGallery.splice(this.state.imageGallery.length - 1, 0, {
        image: image.path,
        imageSrc: image.sourceURL,
        addIcon: false,
      });
      this.setState({imageGallery: this.state.imageGallery});
    });
  };

  showModal(visible, imageURL) {
    this.setState({
      modalVisible: visible,
      imageUri: imageURL,
    });
  }

  _renderItem = ({item, index}) => (
    <View style={styles.renderItem}>
      {item.addIcon ? (
        <TouchableOpacity
          key={index}
          onPress={this._onPressAdd}
          style={styles.addIcon}>
          <Image
            style={styles.addImage}
            source={item.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          key={index}
          style={{flex: 1}}
          onPress={() => {
            Platform.OS === 'ios'
              ? this.showModal(true, item.imageSrc)
              : this.showModal(true, item.image);
          }}>
          <Image style={styles.image} source={{uri: item.image}} />
        </TouchableOpacity>
      )}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Image Gallery</Text>
        <FlatList
          data={this.state.imageGallery}
          renderItem={this._renderItem}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
        />
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.showModal(false, '');
          }}>
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{uri: this.state.imageUri}}
              resizeMode="contain"
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
              onPress={() => {
                this.showModal(!this.state.modalVisible, '');
              }}>
              <Image
                source={Images.closeIcon}
                style={styles.closeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: width / 12.5,
  },
  image: {
    height: width / 3.125,
    width: width / 3.125,
  },
  fullImageStyle: {
    height: '100%',
    width: '98%',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00408040',
  },
  closeButtonStyle: {
    width: width / 15,
    height: width / 15,
    top: width / 37.5,
    right: width / 25,
    position: 'absolute',
  },
  renderItem: {
    flex: 1,
    flexDirection: 'column',
    margin: width / 187.5,
  },
  heading: {
    padding: width / 23.4375,
    fontSize: width / 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'green',
  },
  closeImage: {
    width: width / 10.7142,
    height: width / 10.7142,
    marginTop: width / 23.4375,
    marginRight: width / 18,
  },
  addImage: {
    width: width / 5,
    height: width / 5,
  },
  addIcon: {
    flex: 1,
    justifyContent: 'center',
  },
});
