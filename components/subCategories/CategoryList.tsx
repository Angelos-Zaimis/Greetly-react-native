import React, { FC } from 'react';
import { View } from 'react-native';
import CategoryButton from '../shared/CategoryButton';

type CategoryListProps = {
  categories: { name: string; imageSource: string; navigate: () => void }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isTabletMode?: boolean;
};

const CategoryList: FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory, isTabletMode }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: isTabletMode ? '-5%' : '-8%' }}>
      {categories.map((category) => (
        <CategoryButton
          key={category.name}
          selected={category.name === selectedCategory}
          imageSource={category.imageSource}
          handlePress={category.navigate}
          tabletMode={isTabletMode}
        />
      ))}
    </View>
  );
};

export default CategoryList;
