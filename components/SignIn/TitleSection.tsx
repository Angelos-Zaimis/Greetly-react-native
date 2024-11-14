import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type TitleSectionProps = {
  text: string[];
  subtitleCreateAccountText: string[];
  handleNavigationSignIn: () => void;
  isTabletMode: boolean;
};

const TitleSection: FC<TitleSectionProps> = ({
  text,
  subtitleCreateAccountText,
  handleNavigationSignIn,
  isTabletMode,
}) => {
  return (
    <>
      <Text style={isTabletMode ? styles.titletablet : styles.title}>
        {text.map((word, index) =>
          index === 2 ? (
            <Text key={index} style={isTabletMode ? styles.titleOrangetablet : styles.titleOrange}>
              {word}{' '}
            </Text>
          ) : (
            <Text key={index}>{word} </Text>
          )
        )}
      </Text>
      <Text style={isTabletMode ? styles.subtitletablet : styles.subtitle}>
        Get customized information based on your profile.
      </Text>
      <Text style={isTabletMode ? styles.subtitletablet : styles.subtitle}>
        Find solutions for all aspects of relocation for your specific needs.
      </Text>
      <TouchableOpacity onPress={handleNavigationSignIn}>
        <Text style={isTabletMode ? styles.subtitleThreetablet : styles.subtitleThree}>
          {subtitleCreateAccountText.map((word, index) =>
            [3, 4, 5].includes(index) ? (
              <Text
                key={index}
                style={isTabletMode ? styles.titleBluetablet : styles.titleBlue}
              >
                {word}{' '}
              </Text>
            ) : (
              <Text key={index}>{word} </Text>
            )
          )}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 28,
    width: 220,
    marginLeft: 20,
    marginBottom: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
  titleOrange: {
    color: '#F06748',
    fontWeight: '600',
  },
  subtitle: {
    width: 280,
    fontSize: 18,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 12,
  },
  subtitleThree: {
    width: 280,
    fontSize: 14,
    marginLeft: 20,
    color: '#72788D',
  },
  titleBlue: {
    color: '#719FFF',
  },
  // Tablet styles
  titletablet: {
    marginTop: 10,
    fontSize: 40,
    width: 220,
    marginLeft: 20,
    marginBottom: 20,
    color: '#3F465C',
    fontWeight: '500',
  },
  titleOrangetablet: {
    color: '#F06748',
    fontWeight: '600',
  },
  subtitletablet: {
    width: 320,
    fontSize: 22,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 12,
  },
  subtitleThreetablet: {
    width: 350,
    fontSize: 18,
    marginLeft: 20,
    color: '#72788D',
    marginBottom: 25,
  },
  titleBluetablet: {
    color: '#719FFF',
  },
});
