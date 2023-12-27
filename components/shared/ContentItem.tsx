
import React, { FC } from 'react'
import { Image,TouchableOpacity, Text, View, StyleSheet, Linking} from 'react-native'
import { useLanguage } from '../util/LangContext';
import { FontAwesome5 } from '@expo/vector-icons';
import ExpandableSection from './ExpandableSection';
import ExpandableSectionList from './ExpandableList';
import ExpandableLink from './ExpandableLink';
import { ExpandableAdvertisment } from './ExpandableAdvertisment';

export const RenderContentItem = ({ item, navigation }) => {
    const {t} = useLanguage();

    if (!item) {
        return null;
    }
    
    console.log(item)
    return (
        <React.Fragment>

            {
                item.type === 'mainTitle' && (
                   <View>
                        <Text style={styles.mainTitle}>{t(item.content)}</Text>
                   </View>
                )
            }

            {
                item.type === 'orangeText' && (
                    <View style={styles.orangeTextContainer}>
                        <Text style={styles.orangeText}>{t(item.content)}</Text>
                    </View>
                )
            }

            {
                item.type === 'advertisment' && (
                    <ExpandableAdvertisment title={item.title} iconDown={item.iconDown} text={item.text} listOfCompanies={item.listOfCompanies}/>
                )
            }

            {
                item.type === 'expandable' && (
                    <ExpandableSection title={t(item.title)} content={item.content} iconDown={item.iconDown} textLink={item.textLink} children={''}>
                    </ExpandableSection>
                )
            }
            
            {
                item.type === 'expandableList' && (
                    <ExpandableSectionList title={item.title} listItems={item.items} iconDown={item.iconDown} >
                        <Text>
                            {item.content}
                        </Text>
                    </ExpandableSectionList>
                )
            }

            {
                item.type === 'expandableLink' && (
                    <ExpandableLink title={t(item.title)} items={item.items} text={item.text} navigation={navigation} iconDown={item.iconDown}>
                       
                    </ExpandableLink>
                )
            }

        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mainTitle: {
        fontSize: 18,
        paddingHorizontal: 20,
        lineHeight: 30,
        fontWeight: '700',
        marginVertical: 15,
        color: 'black',
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontWeight: '700',
        color: 'black',
    },
    textContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    text: {
      fontSize: 18,
      paddingHorizontal: 20,
      textAlign: 'center',
      color: '#72788D',
      fontWeight: '700',
      lineHeight: 30,
      fontFamily: 'Inter-Bold',
    },
    orangeTextContainer: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#FFE5DF',
        borderRadius: 8,
        padding: 6,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 10
    },
    orangeText: {
        fontSize: 16,
        paddingHorizontal: 15,
        textAlign: 'center',
        color: '#4E0E00',
        fontWeight: '700',
        lineHeight: 28,
        fontFamily: 'Inter-Bold',
      },
    list: {
      marginLeft: 20, // Indent for list items
      marginBottom: 10
    },
    listItem: {
      fontSize: 17,
      color: '#72788D',
      fontWeight: '700',
      lineHeight: 30,
      fontFamily: 'Inter-Regular',
    },
    link: {
      color: '#0090F5',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 5,
      marginVertical: 10,
      fontSize: 17,
      fontWeight: '600',
      fontFamily: 'Inter-Regular', 
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 10
    }
})