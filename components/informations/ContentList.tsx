import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { RenderContentItem } from '../shared/ContentItem';

type ContentListProps = {
  content: any[];
  navigation: any;
  isTabletMode: boolean;
};

const ContentList: React.FC<ContentListProps> = ({ content, navigation, isTabletMode }) => (
  <ScrollView style={styles.container}>
    {content.map((item, index) => (
      <View style={isTabletMode ? styles.containerContentItemTablet : styles.containerContentItem} key={index}>
        <RenderContentItem navigation={navigation} item={item} />
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContentItem: {
    flex: 1,
    marginHorizontal: 12,
  },
  containerContentItemTablet: {
    flex: 1,
    marginHorizontal: 12,
  },
});

export default ContentList;
