import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';
import CompanyProfile from './CompanyProfile';

type Item = {
  text: string;
  url: string;
  icon: string;
};

type Company = {
  id: number;
  imageUrl: string;
  link: string;
  text: string;
};

type ExpandableProps = {
  title: string;
  content?: string;
  text?: string;
  listItems?: string[];
  items?: Item[];
  iconDown: string;
  isTabletMode: boolean;
  textLink?: {
    text: string;
    url: string;
    icon: string;
  };
  listOfCompanies?: Company[];
};

const cleanContent = (content: string): string => {
  return content
    .replace(/- \*\*/g, '')  // Remove "- **"
    .replace(/\*\*:/g, ':') // Remove "**:"
    .replace(/\n/g, '\n\n'); // Ensure line breaks are double for spacing
};


const Expandable: FC<ExpandableProps> = ({
  title,
  content,
  listItems,
  items,
  iconDown,
  isTabletMode,
  textLink,
  listOfCompanies,
  text
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  const toggleExpand = () => setExpanded(!expanded);

  const openURL = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => supported && Linking.openURL(url))
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={isTabletMode ? styles.headerTablet : styles.header}>
        <Text style={isTabletMode ? styles.headerTextTablet : styles.headerText}>{t(title)}</Text>
        <FontAwesome5
          name={iconDown}
          size={21}
          color="black"
          style={[
            isTabletMode ? styles.iconTablet : styles.icon,
            expanded && { transform: [{ rotate: '180deg' }] }
          ]}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={{backgroundColor: '#F9F9F9'}}>
          {content && (
            <Text style={isTabletMode ? styles.textTablet : styles.text}>
              {cleanContent(t(content))}
            </Text>)}

          {items?.length > 0 &&
            items.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => openURL(item.url)}>
                <View style={isTabletMode ? styles.linkContainerTablet : styles.linkContainer}>
                  <FontAwesome5 name={item.icon} size={isTabletMode ? 18 : 14} color="#0090F5" />
                  <Text style={isTabletMode ? styles.linkTablet : styles.link}>{t(item.text)}</Text>
                </View>
              </TouchableOpacity>
            ))}

          {textLink && textLink.url && (
            <TouchableOpacity onPress={() => openURL(textLink.url)}>
              <View style={isTabletMode ? styles.linkContainerTablet : styles.linkContainer}>
                <Text style={isTabletMode ? styles.linkTablet : styles.link}>{t(textLink.text)}</Text>
                <FontAwesome5 name={textLink.icon} size={isTabletMode ? 18 : 14} color="#0090F5" />
              </View>
            </TouchableOpacity>
          )}

          {listOfCompanies?.length > 0 && (
            <>
              {text && <Text style={isTabletMode ? styles.textTablet : styles.text}>{t(text)}</Text>}
              <FlatList
                style={{ flex: 1, width: '100%' }}
                horizontal
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


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  headerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 26,
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2B2D42',
    flexShrink: 1,
  },

  headerTextTablet: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2B2D42',
    flexShrink: 1,
  },

  text: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    lineHeight: 26,
    fontSize: 16,
    fontWeight: '600',
    color: '#3F465C',
  },

  textTablet: {
    paddingHorizontal: 26,
    paddingVertical: 16,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '600',
    color: '#3F465C',
  },

  listItem: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    lineHeight: 26,
    fontSize: 16,
    fontWeight: '600',
    color: '#555D70',
  },

  listItemTablet: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '600',
    color: '#555D70',
  },

  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  linkContainerTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingVertical: 12,
  },

  link: {
    marginLeft: 10,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },

  linkTablet: {
    marginLeft: 12,
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
  },

  icon: {
    width: 20,
    height: 20,
  },

  iconTablet: {
    width: 24,
    height: 24,
  },

  listContainer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 4,
  },

  listContainerTablet: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
  },

  textContainer: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  textContainerTablet: {
    paddingHorizontal: 26,
    paddingVertical: 14,
  },
});
