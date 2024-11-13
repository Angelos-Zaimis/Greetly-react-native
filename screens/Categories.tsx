import { StyleSheet, View, FlatList, useWindowDimensions} from 'react-native'
import React, { FC, useCallback, useMemo } from 'react'
import Spinner from '../components/shared/Spinner';
import { useCategories } from '../components/hooks/useCategories';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Header from '../components/categories/Header';
import CategoryItem from '../components/categories/CategoryItem';

type CategoriesProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<{ params: { cityName: string } }>;
};

const Categories: FC<CategoriesProps> = ({ navigation, route }) => {
  const { cityName } = route?.params ?? {};
  const { categories } = useCategories(cityName);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const isTabletMode = useMemo(() => SCREEN_WIDTH > 700, [SCREEN_WIDTH]);

  const handleNavigationBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!categories) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Header
        categories={categories}
        handleNavigationBack={handleNavigationBack}
        isTabletMode={isTabletMode}
        SCREEN_HEIGHT={SCREEN_HEIGHT}
      />
      <View style={isTabletMode ? styles.flatlistContainerTablet : styles.flatlistContainer}>
      <FlatList
        data={categories.categories}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() =>
              navigation.navigate('SubCategories', {
                cityName: cityName,
                category: item.name,
              })
            }
            isTabletMode={isTabletMode}
          />
        )}
        keyExtractor={(item) => item.id ? item.id.toString() : item.name}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 18,
  },
  flatlistContainerTablet: {
    flex: 1,
    marginTop: 18,
  },
});

export default Categories;
