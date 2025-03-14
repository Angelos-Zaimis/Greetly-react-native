import React, { FC, useCallback, useMemo, useState } from 'react';
import { SafeAreaView, useWindowDimensions, Platform, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useLanguage } from '../components/util/LangContext';
import HelpHeader from '../components/help/Header';
import DropdownComponent from '../components/help/Dropdown';
import HelpList from '../components/help/HelpList';

type HelpProps = {
  navigation: NavigationProp<any>;
};

const Help: FC<HelpProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const text = t("HelpPageTitle").split(' ');
  const { height: SCREEN_HEIGHT, width: SCREENWIDTH } = useWindowDimensions();
  const [selectedCanton, setSelectedCanton] = useState<string>();

  const cantons = [
    { label: 'Zurich', value: 'ZH' },
    { label: 'Bern', value: 'BE' },
    { label: 'Basel', value: 'BA' },
    { label: 'Lucerne', value: 'LU' }
  ];

  const data = [
    { key: '1', text: 'InsuranceAgents', type: "InsuranceAgent", icon: require('../assets/help/helpback.png') },
    { key: '2', text: 'ImmigrationConsultants', type: "ImmigrationConsultant", icon: require('../assets/help/helpback.png') },
    { key: '3', text: 'Lawyers', type: "Laywer", icon: require('../assets/help/helpback.png') },
    { key: '4', text: 'Recruiters', type: "Recruiter", icon: require('../assets/help/helpback.png') },
    { key: '5', text: 'Doctors', type: "Doctor", icon: require('../assets/help/helpback.png') },
    { key: '6', text: 'HousingSpecialists', type: "HouseSpecialist", icon: require('../assets/help/helpback.png') }
  ];

  const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);

  const handleOpenTeamMembers = useCallback(
    (type: string, name: string, canton: string) => {
      navigation.navigate('TeamMembers', { name, type, canton });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && { paddingTop: 25 }]}>
      <HelpHeader text={text} t={t} isTablet={isTabletMode} />
      {!isTabletMode && (
        <DropdownComponent cantons={cantons} selectedCanton={selectedCanton} setSelectedCanton={setSelectedCanton} />
      )}
      <HelpList data={data} handleOpenTeamMembers={handleOpenTeamMembers} selectedCanton={selectedCanton} isTablet={isTabletMode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Help;
