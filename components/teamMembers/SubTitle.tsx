import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

type SubtitleProps = {
  text: string;
  isTabletMode: boolean;
  width: string;
};

const Subtitle: FC<SubtitleProps> = ({ text, isTabletMode, width }) => {
  return (
    <Text style={[isTabletMode ? styles.subtitleTablet : styles.subtitle, { width }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#72788D',
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 20,
    width: '64%',
    marginVertical: 8,
  },
  subtitleTablet: {
    color: '#72788D',
    fontSize: 26,
    lineHeight: 34,
    paddingLeft: 20,
    width: '64%',
    marginVertical: 8,
  },
});

export default Subtitle;
