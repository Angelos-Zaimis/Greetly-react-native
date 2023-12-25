import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Platform, Button} from 'react-native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../components/util/LangContext';
import { MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { languages } from '../assets/languages';
import { Camera, CameraType , FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../components/shared/CameraButton';
import { useImageTranslation } from '../components/util/useTranslateImage';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

type CameraRefProps = {
  takePictureAsync: () => Promise<any>; // Adjust the return type accordingly
};
type LanguageObject = {
  countryLanguage: string;
  language: string;
}

const Traslate: FC = () => {

  const {t} = useLanguage();
  const [language, setLanguage] = useState<string>('')
  const [hasCameraPermissions, setHasCameraPermissions] = useState<boolean>();
  const [image, setImage] = useState<any>(null)
  const [imageToTranslate, setImageToTranslate] = useState<any>()
  const [typeCamera, setTypeaCamera] = useState<any>(CameraType.back)
  const [flash, setFlash] = useState<any>(FlashMode.off)
  const cameraRef = useRef<CameraRefProps>(null)
  const [showCamera, setShowCamera] = useState<boolean>(false)
  const {translateImage } = useImageTranslation();
  const [isTranslating, setIsTranslating] = useState(false);

  const [translatedImage, setTranslatedImage] = useState<string>()
  const [borderError, setBoarderError] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === 'granted')
    })();
  },[])

  const rowTextForSelection = (item: { countryLanguage: string }) => item.countryLanguage;

  const handleOpenCamera = () => {
    if (!language || language === '') {
      setBoarderError(true)
      return;
    }
    setBoarderError(false)
    setShowCamera(true);
  }

  const handleCloseCamera = () => {
    setShowCamera(false);
  }

  const handleLanguage = (language: LanguageObject) => {
    setLanguage(language.language)
    setBoarderError(false)
  }

  const handleDeleteImage = useCallback(() => {
    setImage(null)
  },[image,setImage])

  const handleSaveImage = useCallback( async() => {
    if(image){
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Image saved')
        setImage(null)
      } catch (error) {
        console.log(error)
      }
    }
  },[image])

  const handleTakeApicture = async() => {

    if(cameraRef){
      try {
        const data = await cameraRef.current?.takePictureAsync();
        setImage(data.uri)
        setImageToTranslate(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImageToTranslate(result)
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTranslateImage = async () => {
    setIsTranslating(true)
    try {
      const translatedImageBase = await translateImage(imageToTranslate, language);
      
      console.log(translatedImageBase)
      setTranslatedImage(translatedImageBase)
    } catch (error) {
      console.error('Error:', error);
    }
    setIsTranslating(false)
  };


  return (
    <>
      {showCamera ? 
        <>
         {hasCameraPermissions ? 
          <>
            {!image ?
              <Camera 
                style={styles.camera}
                type={typeCamera}
                flashMode={flash}
                ref={cameraRef}
              >
                <View style={styles.cameraButtonContainer}>
                  <View style={styles.closeCameraContainer}>
                    <TouchableOpacity onPress={() => setShowCamera(false)}>
                        <AntDesign name="left" size={23} color="white" />
                    </TouchableOpacity>
                  </View>
                  <CameraButton onPress={handleTakeApicture} name='camera' text='takeApicture'/>
                </View>  
            </Camera>
            :
            <View style={styles.imageContainer}>
              <View  style={styles.deleteImage}>
              </View> 
             <Image style={styles.image} source={{uri: translatedImage}}/>
              <View style={styles.cameraButtonContainer}>
                <View style={styles.retakeButtonsContainer}>
                  <CameraButton text='Retake' name='retweet' onPress={handleDeleteImage} />
                  {translatedImage ? 
                  <CameraButton 
                     text='save' 
                    name='check' 
                    onPress={handleSaveImage}/> 
                  : 
                  <TouchableOpacity onPress={handleTranslateImage} style={styles.translateButtonContainer}>
                    <MaterialIcons name="translate" size={28} color="white" />
                    <Text style={styles.translateButtonText}>{t('translate')}</Text>
                  </TouchableOpacity>}
                </View>
              </View>
            </View>
            }
          </> 
          :
          <Text>{t('noaccessToCamera')}</Text>
          }
          {isTranslating && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.overlayText}>Translating...</Text>
            </View>
          )}
        </>
      : 
      <SafeAreaView style={[styles.conainer, Platform.OS === 'android' && { paddingTop: 30} ]}>
        <Text style={styles.text}>{t('translateAdocument')}</Text>
      <View style={styles.buttonTranslateContainer}>
        <View style={[styles.changeLanguage, {borderColor: borderError ? 'red' : '#fd68463e'}]}>
          <View style={styles.translateAndText}>
            <MaterialIcons name="translate" size={22} color="#F06748" />
            <SelectDropdown data={languages} 
             onSelect={handleLanguage}
             buttonTextAfterSelection={rowTextForSelection} 
             rowTextForSelection={rowTextForSelection} 
             defaultValue={language} 
             search
             searchPlaceHolder={t('pageOnboardingSearch')}
             searchInputStyle={styles.search}
             searchPlaceHolderColor="#F06748"
             buttonStyle={styles.languageButtonStyle}
             searchInputTxtStyle={styles.searchText}
             defaultButtonText={t('selectLanguage')}
             buttonTextStyle={styles.languageText}
             rowStyle={styles.rowStyle}
             rowTextStyle={styles.rowText}
           /> 
          </View>
        </View>
           <View style={[styles.changeLanguage, {borderColor: borderError ? 'red' : '#fd68463e'}]}>
          <View style={styles.translateAndText}>
            <MaterialIcons name="translate" size={22} color="#F06748" />
            <SelectDropdown data={languages} 
             onSelect={handleLanguage}
             buttonTextAfterSelection={rowTextForSelection} 
             rowTextForSelection={rowTextForSelection} 
             defaultValue={language} 
             search
             searchPlaceHolder={t('pageOnboardingSearch')}
             searchInputStyle={styles.search}
             searchPlaceHolderColor="#F06748"
             buttonStyle={styles.languageButtonStyle}
             searchInputTxtStyle={styles.searchText}
             defaultButtonText={t('selectLanguage')}
             buttonTextStyle={styles.languageText}
             rowStyle={styles.rowStyle}
             rowTextStyle={styles.rowText}
           /> 
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 10 }} />}
      {translatedImage && <Image source={{ uri: translatedImage }} style={{ width: 300, height: 300 }} />}
      <TouchableOpacity onPress={handleTranslateImage}><Text>Send</Text></TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={handleDeleteImage}>
            <Text style={styles.buttonText}>{t('scanButton')}</Text>  
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenCamera} style={styles.scanButton}>
            <MaterialIcons name="photo-filter" size={80} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>}
    </>
  )
}

export default Traslate

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 10
  },
  textOrange: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#F06748',
    marginLeft: 10
  },
  buttonTranslateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  selectedLanguage: {
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
    justifyContent: 'center',
    width: 135,
    height: 37,
    borderRadius: 18
  },
  selectedLanguageText: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
  },
  changeLanguage: {
    backgroundColor: '#fd68463e',
    width: '48%',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fd68463e'
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  translateAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1
  },
  photoContainer: {
    backgroundColor: '#F8F9FC',
    width: '93%',
    alignItems: 'center',
    borderRadius: 30,
    height: '88%',
    marginTop: 20,
    borderWidth: 2.3,
    borderColor: '#ADB9DB',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  scanButton: {
    backgroundColor: "#F06748",
    width: 125,
    height: 125,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6, 
    shadowColor: '#F06748',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#72788D',
    fontSize: 18,
    textAlign: 'center',
    width: 340,
    marginBottom: 25
  },
  languageButtonStyle: {
    width: 120,
    backgroundColor: 'transparrent',
    marginHorizontal: 7,
  },
  languageText: {
    fontSize: 16,
    color: "#F06748",
    
  },
  rowStyle: {
    backgroundColor: '#fd68463e',
  },
  rowText: {
    color: "#F06748",
    textTransform: 'capitalize',
    fontSize: 20
  },
  camera: {
    flex: 1,
    backgroundColor: 'black'
  },
  cameraButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '80%',
    marginTop:  60,

  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  deleteImage:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
  retakeButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  search: {
    backgroundColor: '#fd68463e',
  },
  searchText: {
    color: "#F06748",
    fontSize: 16,
    paddingLeft: 10
  },
  translateButtonText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10
  },
  translateButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  closeCameraContainer: {
    position: 'absolute',
    top: '8%',
    left: '5%'
  },
})