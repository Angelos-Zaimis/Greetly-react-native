import React, { FC, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';
import { useSelf } from '../hooks/useSelf';

type BookmarkItemProps = {
  item: any;
  isTabletMode: boolean;
  handleShowBookmark: (item) => void;
  deleteToBookmark: (bookmarkId: string) => void;
};

const BookmarkItem: FC<BookmarkItemProps> = ({
  item,
  isTabletMode,
  handleShowBookmark,
  deleteToBookmark,
}) => {
  const { t } = useLanguage();
  const { user: userInfo } = useSelf();

  const onPressItem = useCallback(() => {
    handleShowBookmark(item);
  }, [userInfo, handleShowBookmark, item]);

  return (
    <View
      key={item.id}
      style={isTabletMode ? styles.bookmarkContainerTablet : styles.bookmarkContainer}
    >
      <View
        style={
          isTabletMode ? styles.bookmarkSubcontainerTablet : styles.bookmarkSubcontainer
        }
      >
        <Text
          style={isTabletMode ? styles.categoryTextTablet : styles.categoryText}
        >
          {t('in')} {t(item?.category)}
        </Text>
        <View
          style={
            isTabletMode ? styles.bookmarkTablet : styles.bookmark
          }
        >
          <TouchableOpacity onPress={onPressItem} style={isTabletMode ? styles.cantonAndTitleTablet : styles.cantonAndTitle}>
            <Text style={isTabletMode ? styles.cantonTablet : styles.canton}>
              {item?.canton}
            </Text>
            <View style={isTabletMode ? styles.titleIconTablet : styles.titleIcon}>
              <Text style={isTabletMode ? styles.titleTablet : styles.title}>
                {t(item?.title)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteToBookmark(item?.uniqueTitle)}
            style={isTabletMode ? styles.imageContainerTablet : styles.imageContainer}
          >
            <AntDesign name="delete" size={isTabletMode ? 28 : 22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookmarkItem;

const styles = StyleSheet.create({
  bookmarkContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignSelf: 'center',
    height: 130,
    width: '99%',
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '7%',
  },
  bookmarkSubcontainer: {
    flex: 1,
  },
  bookmark: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 71,
    borderRadius: 18,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  categoryText: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#72788D',
  },
  cantonAndTitle: {
    justifyContent: 'center',
  },
  canton: {
    fontSize: 14,
    color: '#719FFF',
    marginBottom: 15,
    fontWeight: '500',
  },
  titleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 9,
  },
  imageContainer: {
    borderLeftWidth: 1,
    height: '100%',
    justifyContent: 'center',
    borderColor: '#F8F9FC',
    paddingLeft: 10,
  },
  // Tablet styles
  bookmarkContainerTablet: {
    flex: 1,
    paddingHorizontal: 20,
    alignSelf: 'center',
    height: 130,
    width: '99%',
    borderRadius: 20,
    paddingTop: 15,
    marginBottom: '7%',
  },
  bookmarkSubcontainerTablet: {
    flex: 1,
  },
  bookmarkTablet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 101,
    borderRadius: 18,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  categoryTextTablet: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: '600',
    color: '#72788D',
  },
  cantonAndTitleTablet: {
    justifyContent: 'center',
  },
  cantonTablet: {
    fontSize: 20,
    color: '#719FFF',
    marginBottom: 15,
    fontWeight: '500',
  },
  titleIconTablet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTablet: {
    color: '#3F465C',
    fontWeight: '600',
    fontSize: 20,
    marginRight: 9,
  },
  imageContainerTablet: {
    borderLeftWidth: 1,
    height: '100%',
    justifyContent: 'center',
    borderColor: '#F8F9FC',
    marginLeft: 19,
  },
});
