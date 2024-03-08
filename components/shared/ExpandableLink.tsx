import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';

type Item = {
  text: string;
  url: string;
  icon: string;
};

type ExpandableLinkProps = {
  title: string;
  text?: string;
  items: Item[];
  iconDown: string;
  children?: React.ReactNode;
  navigation?: any;
  isTabletMode?: boolean;
};

const ExpandableLink: FC<ExpandableLinkProps> = ({ title, items, iconDown, text, navigation, isTabletMode}) => {
  const [expanded, setExpanded] = useState(false);
  const {t} = useLanguage();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const isValidUrl = (string) => {
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(string);
  }

  const openURL = (url: string) => {
    if (isValidUrl(url)){
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      }).catch((err) => console.error('An error occurred', err)); 
    }else{
      navigation.navigate(url)
    }
  };

  if (isTabletMode) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleExpand} style={styles.headerTablet}>
          <Text style={styles.headerTextTablet}>{title}</Text>
          <FontAwesome5 name={iconDown} size={21} color="black" style={[styles.iconDownTablet,  expanded && { transform: [{ rotate: '180deg' }] }]} />
        </TouchableOpacity>
        
        {expanded && (
          <View>
            {text && (
              <View style={styles.textContainerTablet}>
                <Text style={styles.textTablet}>{t(text)}</Text>
              </View>
            )}
            
            { items?.map((item, index) => (
              <View style={styles.linkContainerTablet}>
                <FontAwesome5 name={item.icon} size={16} color="#0090F5" style={styles.iconTablet} />
                <TouchableOpacity key={index} onPress={() => openURL(item.url)}>
                  <Text style={styles.linkTablet}>{t(item.text)}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    )
  }

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <FontAwesome5 name={iconDown} size={21} color="black" style={[styles.iconDown,  expanded && { transform: [{ rotate: '180deg' }] }]} />
      </TouchableOpacity>
  
      {expanded && (
        <View>
          {text && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{t(text)}</Text>
             </View>
          )}


          { items?.map((item, index) => (
          <View style={styles.linkContainer}>
            <FontAwesome5 name={item.icon} size={14} color="#0090F5" style={styles.icon} />
            <TouchableOpacity key={index} onPress={() => openURL(item.url)}>
              <Text style={styles.link}>{t(item.text)}</Text>
            </TouchableOpacity>
          </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5, // Rounded corners for the component
    marginHorizontal: 10,
    marginTop: 10,
    overflow: 'hidden', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 10
  },
  headerText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#3F465C',
  },
  icon: {
    paddingRight:10
  },
  iconDown: {
    marginRight: 10
  },
  link: {
    color: '#0090F5',
    fontSize: 17,
    fontWeight: '600',

  },
  linkContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 15,
  },
  textContainer: {
    paddingHorizontal: 15,

    marginBottom: 20
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3F465C',
  },

  //Tablet styles

  headerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 10
  },
  headerTextTablet: {
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    color: '#3F465C',
  },
  iconTablet: {
    paddingRight:10,
    fontSize: 22,
    fontWeight: '600',
    color: '#3F465C',
    lineHeight: 32
  },
  iconDownTablet: {
    marginRight: 10
  },
  linkTablet: {
    color: '#0090F5',
    fontSize: 22,
    fontWeight: '600',

  },
  linkContainerTablet: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 15,
  },
  textContainerTablet: {
    paddingHorizontal: 15,

    marginBottom: 20
  },
  textTablet: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3F465C',
    lineHeight: 32
  }
});

export default ExpandableLink;