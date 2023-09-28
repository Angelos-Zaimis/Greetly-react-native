
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Platform } from 'react-native'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { NextButton } from '../components/shared/NextButton';
import { useWindowDimensions } from 'react-native';
import { statusList } from '../assets/statuslist/statusList';
import { Image } from 'expo-image';
import { Fontisto } from '@expo/vector-icons';

type OnBoardingTwoProps = {
    navigation: any
    route: any;
}

const OnBoardingTwo: FC<OnBoardingTwoProps>  = ({navigation, route}) => {

    const [status, setStatus] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    
    const {selectedCountry} = route.params ?? {};

    const text = 'Save time. Choose your status to filter the eligibility criteria'.split(' ');

    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

    const isTabletMode = useMemo(() => {
      if(SCREEN_WIDTH > 700) {
        return true
      }
      return false;
    },[SCREEN_WIDTH])

    const handleNavigationBack = () => {
      navigation.push('OnboardingOne')
    }

    const handleShowPopup = useCallback(() => {
        setShowPopup(true)
    },[setShowPopup])

    const closePopup = useCallback(() => {
        setShowPopup(false)
    },[setShowPopup])

    const handleNavigatForward = () => {
        navigation.push('OnboardingThree',{
            selectedCountry,
            status
        })
    }

    const handleDisabled =  useCallback(() => {
        if (status === ''){
         return true
        }
        return false
    },[status])

    const handleStatusClick = useCallback((status: string) => {
        setStatus(status);
        setShowPopup(false);
      },[setShowPopup,setStatus]);

    const renderItem = (
      { item }: { item:{ 
        label: string;
        value: string 
      
      }}) => (
      <TouchableOpacity
        style={[styles.renderedItem, {width: SCREEN_HEIGHT < 700 ? 250 : 270}]}
        onPress={() => handleStatusClick(item.value)}
      >
        <Text style={styles.renderedText}>{item.label}</Text>
      </TouchableOpacity>
    );

    const renderItemTablet = (
      { item }: { item:{ 
        label: string;
        value: string 
      
      }}) => (
      <TouchableOpacity
        style={[styles.renderedItemTablet]}
        onPress={() => handleStatusClick(item.value)}
      >
        <Text style={styles.renderedTextTablet}>{item.label}</Text>
      </TouchableOpacity>
    );

  if (isTabletMode) {
    return (
      <SafeAreaView style={[styles.container ,Platform.OS === 'android' && { paddingTop: 40}]}>
        <View style={[styles.headerTablet]}>
          <TouchableOpacity style={styles.arrowTablet} onPress={handleNavigationBack}>
            <AntDesign name="left" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.titleTablet}>
            {text.map((word, index) => (
              index === 1 ? (
              <Text key={index} style={styles.titleOrangeTablet}>{word} </Text>
              ) : (
              <Text key={index}>{word} </Text>
            )))}
          </Text>
          <Text style={styles.subtitleTablet}>Get guidance with all the legal and document requirements depending on your occupation.</Text>
        </View>
        <View>
          <Image
            style={styles.imageTablet}
            source={require('../assets/onboarding/puzzle.png')}
          />
        </View>
        <View style={styles.mainTablet}>
          <TouchableOpacity onPress={handleShowPopup} style={styles.selectStatusTablet}>
            <Text style={styles.buttonTextTablet}>I am</Text>
              <View  style={[styles.selectContainerTablet]}>
                <Text style={styles.buttonTextSelectedTablet}>{status ? status : 'Select...'}</Text>
                <AntDesign name="caretdown" size={16} color="#AFB1B5" />
              </View>
          </TouchableOpacity>
          <Modal visible={showPopup} transparent>
            <View style={styles.overlayTablet}>
              <View style={styles.popupTablet}>
                <View style={styles.selectTextTablet}>
                  <Text style={styles.dropdownTextTablet}>Select your occupation</Text>
                  <TouchableOpacity onPress={closePopup}>
                    <Fontisto style={styles.deleteIconTablet} name="close-a" size={14} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.popupFlatlistTablet}>
                  <FlatList
                    data={statusList}
                    renderItem={renderItemTablet}
                    scrollsToTop
                    keyExtractor={(index) => index.toString()}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.bottomTablet}>
          <View  style={styles.bottomSubContainerTablet}>
            <View style={styles.blackDotTablet} />
              <View style={styles.blackDotBackTablet} />
              <View style={styles.blackDotTablet} />
            </View>
          <NextButton isTabletMode={true} handleDisabled={handleDisabled} handlePress={handleNavigatForward} />
        </View>
    </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={[styles.container ,Platform.OS === 'android' && { paddingTop: 40}]}>
      <View style={[styles.header]}>
        <TouchableOpacity style={styles.arrow} onPress={handleNavigationBack}>
          <AntDesign name="left" size={21} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>
          {text.map((word, index) => (
            index === 1 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
        <Text style={styles.subtitle}>Get guidance with all the legal and document requirements depending on your occupation.</Text>
      </View>
      <View>
        <Image
          style={[styles.image, { height: SCREEN_HEIGHT < 700 ? 200 : 280}]}
          source={require('../assets/onboarding/puzzle.png')}
        />
      </View>
      <View style={styles.main}>
        <TouchableOpacity onPress={handleShowPopup} style={styles.selectStatus}>
          <Text style={styles.buttonText}>I am</Text>
            <View  style={[styles.selectContainer, {paddingTop: SCREEN_HEIGHT < 700 ? 9 : 15}]}>
                <Text style={styles.buttonTextSelected}>{status ? status : 'Select...'}</Text>
                <AntDesign name="caretdown" size={16} color="#AFB1B5" />
            </View>
        </TouchableOpacity>
        <Modal visible={showPopup} transparent>
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <View style={styles.selectText}>
                <Text style={styles.dropdownText}>Select your occupation</Text>
                <TouchableOpacity onPress={closePopup}>
                  <Fontisto style={styles.deleteIcon} name="close-a" size={14} color="black" />
                </TouchableOpacity>
              </View>
              <View style={[styles.popupFlatlist, {height: SCREEN_HEIGHT < 700 ? 350 : 460}]}>
                <FlatList
                  data={statusList}
                  renderItem={renderItem}
                  scrollsToTop
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.bottom}>
        <View  style={styles.bottomSubContainer}>
          <View style={styles.blackDot} />
           <View style={styles.blackDotBack} />
           <View style={styles.blackDot} />
        </View>
        <NextButton handleDisabled={handleDisabled} handlePress={handleNavigatForward} />
      </View>
    </SafeAreaView>
  )
}

export default OnBoardingTwo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems:  'center',
        justifyContent: 'space-between'
    },
    title: {
      fontSize: 26,
      width: 250,
      marginLeft: 20,
      marginBottom: 15,
      fontWeight: '500'
    },
    titleOrange: {
        color: '#F06748',
        fontWeight: '600',
        width: 220,
    },
      selectText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 10,
    },
    arrow: {
      marginLeft: 20,
      marginVertical: 20
    },
    main: {
      flex: 1
    },
    subtitle: {
       width: 300,
       fontSize: 16,
       marginLeft: 20,
       color: '#72788D',
       lineHeight: 25
    },
    languageButtonStyle: {
      marginTop: 10,
      width: 80,
      backgroundColor: 'transparrent',
      marginHorizontal: 7,
    },
     selectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,

    },
    languageText: {
      fontSize: 18,
      color: '#719FFF',
      textTransform: 'uppercase'
    },
    image: {
        width: '100%',
        resizeMode: 'contain',

    },
    selectedItem: {
    },
    deleteIcon: {
      width: 14,
      height: 14,
      position: 'absolute',
      right: -35,
      top: -5
    },
  selectStatus: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#DADADC',
    borderRadius: 18,
    width: '91%',
    paddingVertical: 12, // Equivalent to height / 2 = 90 / 2 = 45
    paddingHorizontal: 16,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#3F465C',
    fontWeight: '500'
  },
  buttonTextSelected: {
    fontSize: 16,
    textTransform: 'capitalize'

  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  popup: {
    backgroundColor: '#fff',
    width: '80%',
    height: '60%',
    padding: 7,
    borderRadius: 8,
  },
  containerStyle: {

  },
  popupFlatlist: {
    height: 460,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
  }
  ,
  placeholderDropdown: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 18,
    borderColor: '#F8F9FC',
    backgroundColor:'#F8F9FC',
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 15.5
 },
  dropdown: {
      position:'relative',
      backgroundColor: '#F8F9FC',
      borderRadius: 18,
      paddingHorizontal: 15
  },
  dropdownText: {
      fontSize: 16,
      color: '#72788D'
  },
  item: {
    borderBottomColor: '#d8d8dc',
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
  },
  blackDot: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  blackDotBack: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  renderedItem: {
    marginVertical: 12, 
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    width: 308,
    height: 39,
    borderRadius: 10,
    justifyContent: 'center',
  },renderedText: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
   bottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 10
    },
    bottomSubContainer: {
      flexDirection: 'row'
    },

//TABLET STYLES

  headerTablet: {
      flexDirection: 'row',
      alignItems:  'center',
      justifyContent: 'space-between'
  },
  titleTablet: {
    fontSize: 34,
    width: 320,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: '500'
  },
  titleOrangeTablet: {
      color: '#F06748',
      fontWeight: '600',
      width: 220,
  },
    selectTextTablet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  arrowTablet: {
    marginLeft: 20,
    marginVertical: 20
  },
  mainTablet: {
    flex: 1
  },
  subtitleTablet: {
     width: 350,
     fontSize: 24,
     marginLeft: 20,
     color: '#72788D',
     lineHeight: 32
  },
  languageButtonStyleTablet: {
    marginTop: 10,
    width: 50,
    backgroundColor: 'transparrent',
    marginHorizontal: 7,
  },
   selectContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,

  },
  languageTextTablet: {
    fontSize: 18,
    color: '#719FFF',
    textTransform: 'uppercase'
  },
  imageTablet: {
      width: '100%',
      height: 440,
      resizeMode: 'contain',
  },
  selectedItemTablet: {
  },
  deleteIconTablet: {
    width: 14,
    height: 14,
    position: 'absolute',
    right: -35,
    top: -5
  },
selectStatusTablet: {
  marginLeft: 20,
  borderWidth: 1,
  borderColor: '#DADADC',
  borderRadius: 18,
  width: '91%',
  paddingVertical: 22,
  paddingHorizontal: 16,
  marginTop: 10,
},
buttonTextTablet: {
  fontSize: 22,
  color: '#3F465C',
  fontWeight: '500'
},
buttonTextSelectedTablet: {
  fontSize: 22,
  textTransform: 'capitalize'

},
overlayTablet: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
popupTablet: {
  backgroundColor: '#fff',
  width: '80%',
  height: '60%',
  padding: 7,
  borderRadius: 8,
},
containerStyleTablet: {

},
popupFlatlistTablet: {
  height: 640,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#fff',
  paddingHorizontal: 10,
  borderRadius: 8,
}
,
placeholderDropdownTablet: {
  flex: 1,
  alignContent: 'center',
  justifyContent: 'center',
  width: '80%',
  borderWidth: 0.5,
  borderRadius: 18,
  borderColor: '#F8F9FC',
  backgroundColor:'#F8F9FC',
  height: 50,
  paddingVertical: 15,
  paddingHorizontal: 15.5
},
dropdownTablet: {
    position:'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 18,
    paddingHorizontal: 15
},
dropdownTextTablet: {
    fontSize: 22,
    color: '#72788D'
},
itemTablet: {
  borderBottomColor: '#d8d8dc',
  borderBottomWidth: 0.5,
  paddingHorizontal: 8,
},
blackDotTablet: {
  width: 10,
  height: 10,
  backgroundColor: 'transparent',
  marginHorizontal: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'black',
},
blackDotBackTablet: {
  width: 10,
  height: 10,
  backgroundColor: 'black',
  marginHorizontal: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'black',
},
renderedItemTablet: {
  marginVertical: 12, 
  alignItems: 'center',
  backgroundColor: '#F4F5F8',
  width: 560,
  height: 65,
  borderRadius: 10,
  justifyContent: 'center',
},renderedTextTablet: {
  color: '#3F465C',
  fontWeight: '600',
  fontSize: 20,
  textTransform: 'capitalize',
},
 bottomTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  bottomSubContainerTablet: {
    flexDirection: 'row'
  }
})