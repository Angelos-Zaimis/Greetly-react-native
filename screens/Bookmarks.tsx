import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBookmarks } from '../components/hooks/useBookmarks';
import { useSelf } from '../components/hooks/useSelf';
import BookmarksList from '../components/bookmarks/BookmarkList';
import NoBookmarks from '../components/bookmarks/NoBookmarks';
import Header from '../components/bookmarks/Header';

type BookmarksProps = {
  navigation: NavigationProp<any>;
};


const Bookmarks: FC<BookmarksProps> = ({ navigation }) => {
  const { bookmarks, deleteBookmark } = useBookmarks();
  const { user: userInfo } = useSelf();
  const [isNotSubscribed, setIsNotSubscribed] = useState<boolean>(false);
  const [opacity] = useState(new Animated.Value(0));

  const { width: SCREENWIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);

  const deleteToBookmark = useCallback(
    async (bookmarkId: string) => {
      await deleteBookmark(bookmarkId);
    },
    [deleteBookmark]
  );

  const handleShowBookmark = useCallback(
    (item) => {
      navigation.navigate('Bookmark', {
        canton: item.canton,
        title: item.title,
        description: item.description,
        image: item.image,
        requiredDocuments: item.requiredDocuments,
        category: item.category,
        table_image: item.table_image,
      });
    },
    [navigation]
  );

  useEffect(() => {
    if (isNotSubscribed) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isNotSubscribed, opacity]);

  return (
    <SafeAreaView style={styles.container}>
      <Header isTabletMode={isTabletMode} />
      {bookmarks && bookmarks.length > 0 ? (
        <BookmarksList
          bookmarks={bookmarks}
          isTabletMode={isTabletMode}
          handleShowBookmark={handleShowBookmark}
          deleteToBookmark={deleteToBookmark}
          setIsNotSubscribed={setIsNotSubscribed}
        />
      ) : (
        <NoBookmarks isTabletMode={isTabletMode} />
      )}
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
});
