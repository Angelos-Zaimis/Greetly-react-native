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
};

const ExpandableLink: FC<ExpandableLinkProps> = ({ title, items, iconDown, text}) => {
  const [expanded, setExpanded] = useState(false);
  const {t} = useLanguage();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const openURL = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    }).catch((err) => console.error('An error occurred', err));
  };

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
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Regular',
  }
});

export default ExpandableLink;