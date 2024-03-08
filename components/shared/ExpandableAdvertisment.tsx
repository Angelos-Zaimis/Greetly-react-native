import React, { FC, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../util/LangContext';
import CompanyProfile from './CompanyProfile';

type company = {
    id: string;
    imageUrl: string;
    link: string;
}

type ExpandableAdvertismentProps = {
    title: string;
    text: string;
    isTabletMode?: boolean;
    iconDown: string;
    children?: React.ReactNode;
    listOfCompanies: company[];
};

export const ExpandableAdvertisment: FC<ExpandableAdvertismentProps> = ({ title, iconDown, listOfCompanies, text, isTabletMode}) => {
    const [expanded, setExpanded] = useState(false);
    const { t } = useLanguage();
  
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    if (isTabletMode) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleExpand} style={styles.headerTablet}>
                    <Text style={styles.headerTextTablet}>{t(title)}</Text>
                    <FontAwesome5 name={iconDown} size={21} color="black" style={[styles.iconDownTablet, expanded && { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
                
                {expanded && listOfCompanies.length > 0 && (
                    <View style={styles.listContainerTablet}>
                        <View style={styles.textContainerTablet}>
                            <Text style={styles.textTablet}>{t(text)}</Text>
                        </View>
                        <FlatList
                            style={{flex: 1,width:'100%'}}
                            horizontal={true}
                            data={listOfCompanies}
                            renderItem={({item}) => (
                                <CompanyProfile key={item.id} imageUrl={item.imageUrl} link={item.link} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                )}
            </View>

        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.headerText}>{t(title)}</Text>
                <FontAwesome5 name={iconDown} size={21} color="black" style={[styles.iconDown, expanded && { transform: [{ rotate: '180deg' }] }]} />
            </TouchableOpacity>

            {expanded && listOfCompanies.length > 0 && (
                <View style={styles.listContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{t(text)}</Text>
                    </View>
                    <FlatList
                        style={{flex: 1,width:'100%'}}
                        horizontal={true}
                        data={listOfCompanies}
                        renderItem={({item}) => (
                            <CompanyProfile key={item.id} imageUrl={item.imageUrl} link={item.link} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5, // Rounded corners for the component
        marginHorizontal: 10,
        paddingRight: 20,
        marginTop: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    headerText: {
        flex: 1,
        fontSize: 17,
        fontWeight: '800',
        color: '#3F465C',
    },
    iconDown: {
        marginRight: 10
    },
    link: {
        color: '#0090F5',
        fontSize: 17,
        fontWeight: '600',
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        color: '#3F465C',
        lineHeight: 24,
        paddingHorizontal: 15
    },
    listContainer: {
      height: 350
    },
    textContainer: {
        marginTop: 10,
        marginBottom: 5,
    },


    // TABLET STYLES

    headerTablet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    headerTextTablet: {
        flex: 1,
        fontSize: 22,
        fontWeight: '800',
        color: '#3F465C',
    },
    iconDownTablet: {
        marginRight: 10
    },
    linkTablet: {
        color: '#0090F5',
        fontSize: 22,
        fontWeight: '600',
    },
    textTablet: {
        fontSize: 22,
        fontWeight: '600',
        color: '#3F465C',
        lineHeight: 32,
        paddingHorizontal: 15
    },
    listContainerTablet: {
      height: 350
    },
    textContainerTablet: {
        marginTop: 10,
        marginBottom: 5,
    }
});
