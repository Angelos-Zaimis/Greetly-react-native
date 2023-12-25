import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../util/LangContext';
import { FontAwesome5 } from '@expo/vector-icons';

type ExpandableSectionListProps = {
    title: string;
    listItems: string[];
    children?: React.ReactNode;
    iconDown: string
}

const ExpandableSectionList:FC<ExpandableSectionListProps> = ({ title, listItems, iconDown}) => {
  const [expanded, setExpanded] = useState(false);
  const {t} = useLanguage();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{t(title)}</Text>
        <FontAwesome5 name={iconDown} size={21} color="black" style={[styles.icon,  expanded && { transform: [{ rotate: '180deg' }] }]} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.listContainer}>
          {listItems.map((item, index) => (
            <Text key={index} style={styles.listItem}>{`- ${t(item)}`}</Text>
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
  },
  headerText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#3F465C',
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  listItem: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3F465C',
    paddingTop: 5,
    paddingBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default ExpandableSectionList;
