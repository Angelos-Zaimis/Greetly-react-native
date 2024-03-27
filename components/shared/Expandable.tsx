import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';

type Item = {
  text: string;
  url: string;
  icon: string;
};

type Company = {
  id: number;
  imageUrl: string;
  link: string;
  text: string
};

type ExpandableProps = {
  title: string;
  content: string;
  text: string;
  listItems: string[];
  items: Item[];
  iconDown: string;
  isTabletMode: boolean;
  textLink: {
    text: string;
    url: string;
    icon: string;
  };
  listOfCompanies: Company[];
};

const Expandable: FC<ExpandableProps> = ({ title, content, listItems, items, iconDown, isTabletMode, textLink, listOfCompanies, text }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  const toggleExpand = () => setExpanded(!expanded);

  const openURL = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    }).catch((err) => console.error('An error occurred', err));
  };
console.log(listOfCompanies)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={isTabletMode ? styles.headerTablet : styles.header}>
        <Text style={isTabletMode ? styles.headerTextTablet : styles.headerText}>{t(title)}</Text>
        <FontAwesome5 name={iconDown} size={21} color="black" style={[isTabletMode ? styles.iconTablet : styles.icon, expanded && { transform: [{ rotate: '180deg' }] }]} />
      </TouchableOpacity>

      {expanded && (
        <View>
          {content && <Text style={isTabletMode ? styles.textTablet : styles.text}>{t(content)}</Text>}
          {listItems && listItems.map((item, index) => <Text key={index} style={isTabletMode ? styles.listItemTablet : styles.listItem}>{` - ${t(item)}`}</Text>)}
          {items && items.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => openURL(item.url)}>
              <View style={isTabletMode ? styles.linkContainerTablet : styles.linkContainer}>
                <FontAwesome5 name={item.icon} size={isTabletMode ? 18 : 14} color="#0090F5" />
                <Text style={isTabletMode ? styles.linkTablet : styles.link}>{t(item.text)}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {textLink && (
            <TouchableOpacity onPress={() => openURL(textLink.url)}>
              <View style={isTabletMode ? styles.linkContainerTablet : styles.linkContainer}>
                <Text style={isTabletMode ? styles.linkTablet : styles.link}>{t(textLink.text)}</Text>
                <FontAwesome5 name={textLink.icon} size={isTabletMode ? 18 : 14} color="#0090F5" />
              </View>
            </TouchableOpacity>
          )}
          {listOfCompanies && (
           <> 
           <Text style={styles.text}>{t(text)}</Text>
           <FlatList
             style={{ flex: 1, width: '100%' }}
             horizontal={true}
             data={listOfCompanies}
             renderItem={({ item }) => (
               <CompanyProfile key={item.id} imageUrl={item.imageUrl} title={t(item.text)} link={item.link} />
             )}
             keyExtractor={(item) => item.id.toString()}
           />
           </>
          )}
        </View>
      )}
    </View>
  );
};

export default Expandable;
import { StyleSheet } from 'react-native';
import CompanyProfile from './CompanyProfile';

const styles = StyleSheet.create({
  container: {
    // General container styles
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    // Header styles for mobile
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  headerTablet: {
    // Header styles for tablet
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#3F465C',
  },
  headerTextTablet: {
    // Header text styles for tablet
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    // Text styles for mobile
    padding: 16,
    lineHeight: 26,
    fontSize: 16,
    fontWeight: '700',
    color: '#3F465C',
  },
  textTablet: {
    // Text styles for tablet
    padding: 20,
    fontSize: 18,
  },
  linkContainer: {
    // Link container styles for mobile
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  linkContainerTablet: {
    // Link container styles for tablet
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  link: {
    // Link text styles for mobile
    marginLeft: 8,
    color: '#0090F5',
    fontSize: 14,
  },
  linkTablet: {
    // Link text styles for tablet
    marginLeft: 10,
    color: '#0090F5',
    fontSize: 18,
  },
  icon: {
    // Icon styles for mobile
    width: 14,
    height: 14,
  },
  iconTablet: {
    // Icon styles for tablet
    width: 18,
    height: 18,
  },
  listItem: {
    // List item styles for mobile

    padding: 16,
    lineHeight: 26,
    fontSize: 16,
    fontWeight: '700',
    color: '#3F465C',
  },
  listItemTablet: {
    // List item styles for tablet
    padding: 20,
    fontSize: 18,
  },
  listContainer: {
    // List container styles for mobile
    backgroundColor: '#f9f9f9',
  },
  listContainerTablet: {
    // List container styles for tablet
    backgroundColor: '#f2f2f2',
  },
  textContainer: {
    // Text container styles for mobile
    padding: 16,
  },
  textContainerTablet: {
    // Text container styles for tablet
    padding: 20,
  },
});

