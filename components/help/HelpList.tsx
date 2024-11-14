import React from 'react';
import { FlatList } from 'react-native';
import HelpItem from './HelpItem';

const HelpList = ({ data, handleOpenTeamMembers, selectedCanton, isTablet }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <HelpItem item={item} handleOpenTeamMembers={handleOpenTeamMembers} selectedCanton={selectedCanton} isTablet={isTablet} />
    )}
    keyExtractor={item => item.key}
    numColumns={2}
  />
);

export default HelpList;
