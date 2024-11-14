import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useLanguage } from '../components/util/LangContext';
import { useBookmarks } from '../components/hooks/useBookmarks';
import { useInformation } from '../components/hooks/useInformation';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ImageSection from '../components/informations/ImageSection';
import HeaderSection from '../components/informations/Header';
import ContentList from '../components/informations/ContentList';
import ToastMessage from '../components/informations/ToastMessageComponent';

type InformationsProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{ params: { cityName: string; category: string; subcategory: string; image: string; table_image: string } }>;
};

const Informations: FC<InformationsProps> = ({ route, navigation }) => {
  const { cityName, category, subcategory, image, table_image } = route.params ?? {};
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const { information } = useInformation(cityName, category, subcategory);
  const { createBookmark, deleteBookmark, bookmarkSaved, mutateBookmark } = useBookmarks(information?.title);
  const { t } = useLanguage();
  const { width: SCREENWIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const addToBookmark = useCallback(async () => {
    if (information?.title) {
      try {
        await createBookmark({
          canton: cityName,
          category: category,
          title: subcategory,
          description: information?.description,
          image: image,
          table_image: table_image,
          requiredDocuments: information?.requiredDocuments,
          saved: true,
          uniqueTitle: information?.title,
        });
        setShowToastMessage(true);
        setSuccessToast(true);
        setTimeout(() => setShowToastMessage(false), 1100);
      } catch {
        setShowToastMessage(true);
        setSuccessToast(false);
        setTimeout(() => setShowToastMessage(false), 1100);
      }
      await mutateBookmark();
    }
  }, [cityName, category, subcategory, image, table_image, information, createBookmark, mutateBookmark]);

  const deleteToBookmark = useCallback(async () => {
    await deleteBookmark(bookmarkSaved?.uniqueTitle);
    await mutateBookmark();
  }, [bookmarkSaved, deleteBookmark, mutateBookmark]);

  useEffect(() => {
    mutateBookmark();
  }, [deleteBookmark, addToBookmark, mutateBookmark]);

  return (
    <>
      <ImageSection imageUri={isTabletMode ? table_image : image} isTabletMode={isTabletMode} screenHeight={SCREEN_HEIGHT} />
      <HeaderSection
        onNavigateBack={handleNavigationBack}
        onBookmarkPress={bookmarkSaved?.canton ? deleteToBookmark : addToBookmark}
        subcategory={subcategory}
        isBookmarked={!!bookmarkSaved?.canton}
        isTabletMode={isTabletMode}
        t={t}
      />
      <ContentList content={information?.content?.content || []} navigation={navigation} isTabletMode={isTabletMode} />
      <ToastMessage showToast={showToastMessage} success={successToast} />
    </>
  );
};

export default Informations;
