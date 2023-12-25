import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useLanguage } from '../util/LangContext';
import { FontAwesome5 } from '@expo/vector-icons';

type ExpandableSectionListProps = {
    title: string;
    content: string;
    children: React.ReactNode
    iconDown: string;
    textLink?: {
        text: string;
        url: string;
        icon: string;
    }
}

const ExpandableSection: FC<ExpandableSectionListProps> = ({ title,content, iconDown, textLink}) => {
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
        <Text style={styles.headerText}>{t(title)}</Text>
        <FontAwesome5 name={iconDown} size={21} color="black" style={[styles.icon,  expanded && { transform: [{ rotate: '180deg' }] }]} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
            {content && (
                <Text style={styles.text}>{t(content)}</Text>
                
            )}

            {textLink && (
                <View style={styles.linkContainer}>
                    <Text style={styles.link} onPress={() => openURL(textLink.url)}>{t(textLink.text)}</Text>
                    <FontAwesome5 name={textLink.icon} size={14} color="#0090F5" style={styles.icon }/>
                </View>
            )}
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
    borderBottomWidth: 1, // Border bottom to separate header from content
    borderBottomColor: '#CCC', // Light grey border color
    backgroundColor: 'white'
  },
  headerText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#3F465C',
  },
  content: {
    padding: 15, // Padding inside the content area
    fontSize: 18
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3F465C',
    lineHeight: 25
  },
  icon: {
    marginRight: 10,
  },
  link: {
    color: '#0090F5',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    marginRight: 8
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 10
  },
});

export default ExpandableSection;
