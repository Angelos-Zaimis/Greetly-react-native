import React, { FC, useCallback, useMemo } from 'react';
import { SafeAreaView, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useLanguage } from '../components/util/LangContext';
import { useTeamMembers } from '../components/hooks/useTeamMembers';
import Header from '../components/teamMembers/Header';
import Subtitle from '../components/teamMembers/SubTitle';
import ImageBanner from '../components/teamMembers/ImageBanner';
import TeamMemberList from '../components/teamMembers/TeamMemberList';

type HelpProps = {
  navigation: any; 
  route: any;
};

const TeamMembers: FC<HelpProps> = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { type, name, canton } = route.params ?? {};
  const text = t(name).split(' ');
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = useWindowDimensions();

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const { teamMembers } = useTeamMembers(type, canton);

  const handleItemPress = (item: any) => {
    navigation.navigate('TeamMember', {
      name: item.name,
      location: item.location,
      occupation: item.occupation,
      profileImage: item.profileImage,
      languages: item.languages,
      licensed: item.licensed,
      specialization: item.specialization,
      aboutMe: item.aboutMe,
      longitude: item.longitude,
      latitude: item.latitude,
      latitudeDelta: item.latitudeDelta,
      longitudeDelta: item.longitudeDelta,
      linkAddress: item.linkAddress,
    });
  };

  const subtitleWidth = SCREEN_HEIGHT < 700 ? '100%' : '63%';

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}>
      <Header onBackPress={handleNavigationBack} titleText={text} isTabletMode={isTabletMode} />
      <Subtitle text={t('TeamMembersPageSubtitle')} isTabletMode={isTabletMode} width={subtitleWidth} />
      <ImageBanner isTabletMode={isTabletMode} />
      <TeamMemberList
        data={teamMembers}
        onItemPress={handleItemPress}
        isTabletMode={isTabletMode}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default TeamMembers;
