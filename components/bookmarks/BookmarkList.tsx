import React, { FC } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import BookmarkItem from './BookmarkItem';

type BookmarksListProps = {
  bookmarks: any[];
  isTabletMode: boolean;
  handleShowBookmark: (item) => void;
  deleteToBookmark: (bookmarkId: string) => void;
  setIsNotSubscribed: (value: boolean) => void;
};

const BookmarksList: FC<BookmarksListProps> = ({
  bookmarks,
  isTabletMode,
  handleShowBookmark,
  deleteToBookmark,
  setIsNotSubscribed,
}) => {
  return (
    <View
      style={
        isTabletMode ? styles.flatlistContainerTablet : styles.flatlistContainer
      }
    >
      <FlatList
        data={bookmarks}
        renderItem={({ item }) => (
          <BookmarkItem
            item={item}
            isTabletMode={isTabletMode}
            handleShowBookmark={handleShowBookmark}
            deleteToBookmark={deleteToBookmark}
            setIsNotSubscribed={setIsNotSubscribed}
          />
        )}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

export default BookmarksList;

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    marginTop: '5%',
  },
  // Tablet styles
  flatlistContainerTablet: {
    flex: 1,
    marginTop: '2%',
  },
});
