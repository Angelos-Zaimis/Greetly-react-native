import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../util/LangContext';

type NoBookmarksProps = {
  isTabletMode: boolean;
};

const NoBookmarks: FC<NoBookmarksProps> = ({ isTabletMode }) => {
  const { t } = useLanguage();
  return (
    <View
      style={
        isTabletMode
          ? styles.noBookmarksContainerTablet
          : styles.noBookmarksContainer
      }
    >
      <Text style={isTabletMode ? styles.noBookmarksTablet : styles.noBookmarks}>
        {t('Nobookmarks')}
      </Text>
    </View>
  );
};

export default NoBookmarks;

const styles = StyleSheet.create({
  noBookmarksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBookmarks: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 18,
    fontStyle: 'italic',
  },
  // Tablet styles
  noBookmarksContainerTablet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBookmarksTablet: {
    color: '#3F465C',
    fontWeight: '500',
    fontSize: 28,
    fontStyle: 'italic',
  },
});
