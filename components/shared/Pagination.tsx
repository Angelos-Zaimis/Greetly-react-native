import { View } from 'react-native'
import React, { FC } from 'react' 
import { ScaledSheet } from 'react-native-size-matters'


type PaginationProps = {
    data: any[];
    FlatListIndex: {
        value: number | null;
    };

}

export const Pagination: FC<PaginationProps> = ({data, FlatListIndex}) =>{


    const PaginationComp = ({ index }: { index: number })  => {
        return (
          <View
            style={[
              styles.dots,
              { backgroundColor: FlatListIndex.value === index ? '#3F465C' : 'transparent' },
            ]}
          />
        );
      };
      
    return (
        <View style={styles.paginationContainer}>
          {data.map((_, i) => (
            <View key={i}>
              <PaginationComp index={i} />
            </View>
          ))}
        </View>
    );
      
}

const styles = ScaledSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dots: {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        marginHorizontal:  10, 
        borderRadius: 5,
        borderWidth: 1
    
    }
})