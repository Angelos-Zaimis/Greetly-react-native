import React, { FC } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { RenderContentItem } from '../shared/ContentItem';

type ContentListProps = {
  contentItems: any[];
  navigation: any;
};

const ContentList: FC<ContentListProps> = ({ contentItems, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {contentItems.map((item: any, index: number) => (
        <View style={styles.containerContentItem} key={index}>
          <RenderContentItem item={item} navigation={navigation} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ContentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContentItem: {
    flex: 1,
    marginHorizontal: 12,
  },
});
