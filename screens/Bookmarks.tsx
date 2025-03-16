import React, { FC, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBookmarks } from '../components/hooks/useBookmarks';
import BookmarksList from '../components/bookmarks/BookmarkList';
import NoBookmarks from '../components/bookmarks/NoBookmarks';
import Header from '../components/bookmarks/Header';

type BookmarksProps = {
  navigation: NavigationProp<any>;
};


const Bookmarks: FC<BookmarksProps> = ({ navigation }) => {
  const { bookmarks, deleteBookmark } = useBookmarks();
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


  return (
    <SafeAreaView style={styles.container}>
      <Header isTabletMode={isTabletMode} />
      {bookmarks && bookmarks.length > 0 ? (
        <BookmarksList
          bookmarks={bookmarks}
          isTabletMode={isTabletMode}
          handleShowBookmark={handleShowBookmark}
          deleteToBookmark={deleteToBookmark}
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
