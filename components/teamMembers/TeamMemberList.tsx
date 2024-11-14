import React, { FC } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TeamMemberCard from './TeamMemberCard';

type TeamMemberListProps = {
  data: any[]; 
  onItemPress: (item: any) => void;
  isTabletMode: boolean;
};

const TeamMemberList: FC<TeamMemberListProps> = ({ data, onItemPress, isTabletMode }) => {
  const renderItem = ({ item }: { item: any }) => (
    <TeamMemberCard
      item={item}
      onPress={() => onItemPress(item)}
      isTabletMode={isTabletMode}
    />
  );

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={isTabletMode ? 1 : 2}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});

export default TeamMemberList;
