import React, { FC, useCallback, useContext, useMemo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, useWindowDimensions, View } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useLanguage } from '../components/util/LangContext';
import { AuthContext } from '../components/auth/AuthContext';
import { useSelf } from '../components/hooks/useSelf';
import { languages } from '../assets/languages';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileItem from '../components/profile/ProfileItem';
import SignOutButton from '../components/profile/SignOutButton';
import TermsList from '../components/profile/TermsListComponent';
import DeleteAccountButton from '../components/profile/DeleteAcountButton';

type ProfileProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: {} }>;
};

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const { logout, deleteAccount } = useContext(AuthContext);
  const { user: userInfo } = useSelf();
  const { width: SCREENWIDTH } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);

  const navigateToProfileItem = useCallback(
    (type: string, value: string | undefined) => {
      navigation.navigate('ProfileItem', {
        [type]: value,
      });
    },
    [navigation]
  );

  const navigateToChangePassword = useCallback(() => {
    navigation.navigate('ChangePassword', {
      inApp: true,
    });
  }, [navigation]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleDeleteAccount = useCallback(async () => {
    await deleteAccount(userInfo?.user ?? '');
    await logout();
  }, [deleteAccount, logout, userInfo]);

  const getCountryLanguage = useCallback((languageCode: string) => {
    const language = languages.find((l) => l.language === languageCode);
    return language ? language.countryLanguage : null;
  }, []);

  return (
    <ScrollView
      style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}
    >
      <SafeAreaView style={styles.container}>
        <ProfileHeader isTabletMode={isTabletMode} />
        <ProfileItem
          label="Email"
          value={userInfo?.username}
          isEditable={false}
          isTabletMode={isTabletMode}
        />
        <ProfileItem
          label="Password"
          value="************"
          onPress={navigateToChangePassword}
          isEditable={true}
          isTabletMode={isTabletMode}
        />
        <ProfileItem
          label={t('countryOfOrigin')}
          value={userInfo?.country}
          onPress={() => navigateToProfileItem('country', userInfo?.country)}
          isEditable={true}
          isTabletMode={isTabletMode}
        />
        <ProfileItem
          label={t('occupation')}
          value={userInfo?.status}
          onPress={() => navigateToProfileItem('status', userInfo?.status)}
          isEditable={true}
          isTabletMode={isTabletMode}
        />
        <ProfileItem
          label={t('language')}
          value={getCountryLanguage(userInfo?.language ?? '')}
          onPress={() => navigateToProfileItem('language', userInfo?.language)}
          isEditable={true}
          isTabletMode={isTabletMode}
        />
        <SignOutButton isTabletMode={isTabletMode} onConfirm={handleLogout} />
        <View style={isTabletMode ? styles.lineTablet : styles.line}></View>
        <TermsList isTabletMode={isTabletMode} />
        <DeleteAccountButton isTabletMode={isTabletMode} onConfirm={handleDeleteAccount} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: '#DADADC',
    marginTop: 30,
    marginBottom: 30,
  },
  // Tablet styles
  lineTablet: {
    borderTopWidth: 1,
    borderTopColor: '#DADADC',
    marginTop: 35,
    marginBottom: 35,
  },
});
