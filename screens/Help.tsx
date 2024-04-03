import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import {Text,SafeAreaView,StyleSheet, View, FlatList, TouchableOpacity, useWindowDimensions, Platform} from "react-native";
import { useLanguage } from '../components/util/LangContext';
import { Image } from 'expo-image';
import { NavigationProp } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons'; 

type HelpProps = {
  navigation: NavigationProp<any>;
}

const Help: FC<HelpProps> = ({navigation}) => {

  const {t} = useLanguage();
  
  const text = t("HelpPageTitle").split(' ')

  const {height: SCREEN_HEIGHT, width: SCREENWIDTH} = useWindowDimensions();

  const [selectedCanton, setSelectedCanton] = useState<string>();


  const cantons = [
    { label: 'Zurich', value: 'ZH' },
    { label: 'Bern', value: 'BE' },
    { label: 'Ticino', value: 'TI' },
    { label: 'Geneva', value: 'GE' }
  ]

  const isTabletMode = useMemo(() => {
    if(SCREENWIDTH > 700) {
      return true;
    }

    return false;
  },[SCREENWIDTH])

  const data = [
    { key: '1', text: 'InsuranceAgents', type: "InsuranceAgent", icon: require('../assets/help/helpback.png') },
    { key: '2', text: 'ImmigrationConsultants', type: "ImmigrationConsultant", icon: require('../assets/help/helpback.png') },
    { key: '3', text: 'Lawyers', icon: require('../assets/help/helpback.png') },
    { key: '4', text: 'Recruiters', icon: require('../assets/help/helpback.png')},
    { key: '5', text: 'Doctors', icon: require('../assets/help/helpback.png')},
    { key: '5', text: 'HousingSpecialists', icon:  require('../assets/help/helpback.png')},
  ];

  const handleOpenTeamMembers = useCallback(
    (type: string, name:string, canton: string) => {
      console.log(canton)
      navigation.navigate('TeamMembers',{
        name,
        type,
        canton
      })
  },[navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => handleOpenTeamMembers(item.type, item.text, selectedCanton)} style={styles.cell}>
      <Image style={styles.cellImage} source={item.icon}/>
      <Text style={styles.overlayText}>{t(item.text)}</Text>
    </TouchableOpacity>
  );
  

  const renderItemTablet = ({ item }) => (
    <TouchableOpacity onPress={ () => handleOpenTeamMembers(item.type, item.text, selectedCanton)} style={styles.cellTablet}>
      <Image style={styles.cellImage} source={item.icon}/>
      <Text style={styles.overlayTextTablet}>{t(item.text)}</Text>
    </TouchableOpacity>
  );

  if (isTabletMode) {
    return (
      <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
         <View>
        <Text style={styles.titleTablet}>
          {text.map((word, index) => (
            index === 2 || index === 7
            || index === 9 ? (
            <Text key={index} style={styles.titleOrangeTablet}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
      </View>
      <View>
        <Text style={[styles.subtitleTablet, {width: SCREEN_HEIGHT < 700 ? '100%' : '63%'}]}>{t('HelpPageSubTitle')}</Text>
      </View>
      <View>
        <Image
        style={styles.imageTablet}
        source={require('../assets/help/help.png')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={data} // Array of data to render
          renderItem={renderItemTablet} // Function to render each item
          keyExtractor={item => item.key} // Unique key for each item
          numColumns={2} // Set the number of columns
        />
      </View>
     </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container,  Platform.OS === 'android' && { paddingTop: 25}]}>
      <View>
        <Text style={styles.title}>
          {text.map((word, index) => (
            index === 2 || index === 7
            || index === 9 ? (
            <Text key={index} style={styles.titleOrange}>{word} </Text>
            ) : (
            <Text key={index}>{word} </Text>
          )))}
        </Text>
      </View>
      <View>
        <Text style={[styles.subtitle, {width: SCREEN_HEIGHT < 700 ? '100%' : '63%'}]}>{t('HelpPageSubTitle')}</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.findText}>Find professionals in </Text>
        <Dropdown
          style={styles.dropdown}
          renderLeftIcon={() => (
            <AntDesign
                name="search1" 
                size={24}
                style={{marginRight: 14}}
                color="#060607" />
                )}
                data={cantons}
                  search
                  maxHeight={510}
                  itemContainerStyle={styles.item}
                  labelField={'label'}
                  valueField="value"
                  placeholder={!selectedCanton? 'Select canton' : selectedCanton}
                  searchPlaceholder="..."
                  value={selectedCanton}
                  onChange={item => {
                    setSelectedCanton(item.value);
                  }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={data} // Array of data to render
          renderItem={renderItem} // Function to render each item
          keyExtractor={item => item.key} // Unique key for each item
          numColumns={2} // Set the number of columns
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  title: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 22,
    width: '70%',
    paddingLeft: 20,
    marginTop: '8%',
    lineHeight: 28

  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 22,
  },
  subtitle: {
    color: '#72788D',
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 20,
    width: '64%',
    marginVertical: 8,
  },
  dropdownContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: "center"
  },
  dropdown: {
    width:200,
    backgroundColor: '#F8F9FC',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  dropdownText: {
    fontSize: 16,
    color: '#72788D'
    
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 130,
    marginBottom: 10
  },
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 100,
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '5%',
    backgroundColor: '#F8F9FC',
  },
  profileImage: {
    marginTop: 5,
    height:70,
    width: 95,
    borderRadius: 10
  },
  profileImageContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#1C63F257',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    },
    findText: {
      color: '#3F465C',
      fontSize: 16,
      fontWeight: '700'
    },
    item: {
      borderBottomColor: '#d8d8dc',
      borderBottomWidth: 0.5,
      paddingHorizontal: 8,
    },
  profileContainer: {
    position: 'absolute',
    left:'32%',
    top: '15%'
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3
  },
  textLocation: {
    marginLeft: 3,
    fontSize: 13,
    color: '#719FFF',
    textTransform: 'uppercase'
  },
  locationImage: {
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 4,
    marginLeft: 3
  },
  occupation: {
    fontSize: 13,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
    marginLeft: 3
  },
  languagesContainer: {
    position: 'absolute',
    top: '88%',
    left: '82%',
    flexDirection: 'row'
  },
  languageImage: {
    resizeMode: 'contain',
    width: 19,
    height: 20,
    marginRight: 5
  },
  cell: {
    flex: 1, // Flex each cell to fill the space
    margin: 10, // Space between cells
    height: 80, // Fixed height for each cell
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#B9CDF659', // Background color for cells
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2.4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  cellImage: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    // ensure the image fills the container
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayText: {
    position: 'absolute', // Absolute position to overlay on top of the image
    top: 19, // Adjust this value to move the text up or down
    left: 10, // Adjust this value to move the text left or right
    color: 'white', // Text color
    fontSize: 20, // Text size
    width: 165,
    fontWeight: 'bold'
  },
  //TABLET STYLES

  titleTablet: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 34,
    width: '90%',
    paddingLeft: 20,
    marginTop: 10,
    lineHeight: 48,
  },
  titleOrangeTablet: {
    color: '#F06748',
    fontWeight: '500',
    fontSize: 34,
  },
  subtitleTablet: {
    color: '#72788D',
    fontSize: 26,
    lineHeight: 32,
    paddingLeft: 20,
    width: '74%',
    marginTop: 8
  },
  imageTablet: {
    resizeMode: 'contain',
    width: '100%',
    height: 250,
    marginVertical:  30
  },
  personContainerTablet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf:'center',
    width: '90%',
    height: 130,
    borderRadius: 20,
    paddingTop: 15,
    backgroundColor: '#F8F9FC',
  },
  profileImageTablet: {
    marginTop: 5,
    height: 120,
    width: 180,
    borderRadius: 10,
    marginLeft: 20
  },
  profileImageContainerTablet: {
    position: 'absolute',
    top: 2,
    left: 2,
    shadowColor: '#1C63F257',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    },
  profileContainerTablet: {
    position: 'absolute',
    left:'32%',
    top: '15%'
  },
  locationTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  textLocationTablet: {
    marginLeft: 6,
    fontSize: 18,
    color: '#719FFF',
    textTransform: 'uppercase'
  },
  locationImageTablet: {
    resizeMode: 'contain',
  },
  nameTablet: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3F465C',
    marginTop: 4,
    marginLeft: 3
  },
  occupationTablet: {
    fontSize: 18,
    color: '#72788D',
    textTransform: 'uppercase',
    marginTop: 3,
    marginLeft: 3
  },
  languagesContainerTablet: {
    position: 'absolute',
    top: '88%',
    left: '82%',
    flexDirection: 'row'
  },
  languageImageTablet: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
    marginRight: 9
  },
  cellTablet: {
    flex: 1, // Flex each cell to fill the space
    margin: 10, // Space between cells
    height: 110, // Fixed height for each cell
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#B9CDF659', // Background color for cells
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2.4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  overlayTextTablet: {
    position: 'absolute', // Absolute position to overlay on top of the image
    top: 19, // Adjust this value to move the text up or down
    left: 10, // Adjust this value to move the text left or right
    color: 'white', // Text color
    fontSize: 28, // Text size
    width: 165,
    fontWeight: 'bold'
  },
})
export default Help