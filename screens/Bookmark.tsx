import React, { FC, useCallback, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useInformation } from '../components/hooks/useInformation';
import { useLanguage } from '../components/util/LangContext';
import ImageSection from '../components/bookmark/ImageSection';
import Header from '../components/bookmark/Header';
import ContentList from '../components/bookmark/ContentList';

type BookmarkProps = {
  route: RouteProp<{
    params: {
      canton: string;
      title: string;
      description: string;
      image: string;
      table_image: string;
      requiredDocuments: string[];
      category: string;
    };
  }>;
  navigation: NavigationProp<any>;
};

const Bookmark: FC<BookmarkProps> = ({ route, navigation }) => {
  const { canton, title, image, category } = route.params ?? {};

  const { t } = useLanguage();

  const { information } = useInformation(canton, category, title);

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageSection imageUri={image} isTabletMode={isTabletMode} />
      <Header title={t(title)} onBackPress={handleNavigationBack} isTabletMode={isTabletMode} />
      <ContentList contentItems={information?.content?.content || []} navigation={navigation} />
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
