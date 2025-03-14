
import React, { useMemo }  from 'react'
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native'
import { useLanguage } from '../util/LangContext';
import Expandable from './Expandable';
import { useSelf } from '../hooks/useSelf';

export const RenderContentItem = ({ item, navigation }) => {
    const {t} = useLanguage();

    const {user: userInfo} = useSelf();

    const {width: SCREENWIDTH} = useWindowDimensions();
  
    console.log(item)
    const isTabletMode = useMemo(() => {
      if(SCREENWIDTH > 700) {
        return true;
      }
  
      return false;
    },[SCREENWIDTH])
    

    if (!item) {
        return null;
    }

    if (isTabletMode) {
        return (
            <React.Fragment>

            {
                item.type === 'mainTitle' && (
                   <View>
                        <Text style={styles.mainTitleTablet}>{t(item.content)}</Text>
                   </View>
                )
            }

            {
                item.type === 'orangeText' && (
                    <View style={styles.orangeTextContainerTablet}>
                        <Text style={styles.orangeTextTablet}>{t(item.content)}</Text>
                    </View>
                )
            }

            {
                item.type === 'expandable' && (
                   <Expandable 
                            title={t(item.title)}
                            iconDown={t(item.iconDown)}
                            content={t(item.content)}
                            listItems={item.items} items={item.items} isTabletMode={isTabletMode}
                            textLink={item.textLink} listOfCompanies={item.listOfCompanies} text={item.text}/>
                )
            }
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>

            {
                item.type === 'mainTitle' && (
                   <View>
                        <Text style={styles.mainTitle}>{t('openBankAccountZurichEuEfta', { country: t(userInfo.country) })}</Text>
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
                item.type === 'expandable' && (
                   <Expandable 
                        title={t(item.title)}
                        iconDown={t(item.iconDown)}
                        content={t(item.content)}
                        listItems={item.items} items={item.items} isTabletMode={isTabletMode}
                        textLink={item.textLink} listOfCompanies={item.listOfCompanies} text={item.text}/>
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
    },
    link: {
      color: '#0090F5',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 5,
      marginVertical: 10,
      fontSize: 17,
      fontWeight: '600',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 10
    },


    // TABLET STYLES

    containerTablet: {
        flex: 1,
      },
      mainTitleTablet: {
          fontSize: 23,
          paddingHorizontal: 22,
          lineHeight: 30,
          fontWeight: '700',
          marginVertical: 15,
          color: 'black',
          textAlign: 'center',
      },
      titleTablet: {
          fontSize: 20,
          paddingHorizontal: 10,
          marginVertical: 10,
          fontWeight: '700',
          color: 'black',
      },
      textContainerTablet: {
          flex: 1, 
          alignItems: 'center'
      },
      textTablet: {
        fontSize: 24,
        paddingHorizontal: 20,
        textAlign: 'center',
        color: '#72788D',
        fontWeight: '700',
        lineHeight: 30,
      },
      orangeTextContainerTablet: {
          flex: 1, 
          alignItems: 'center',
          backgroundColor: '#FFE5DF',
          borderRadius: 8,
          padding: 6,
          marginHorizontal: 30,
          marginBottom: 20,
          marginTop: 10
      },
      orangeTextTablet: {
          fontSize: 22,
          paddingHorizontal: 15,
          textAlign: 'center',
          color: '#4E0E00',
          fontWeight: '700',
          lineHeight: 28,
        },
      listTablet: {
        marginLeft: 20, // Indent for list items
        marginBottom: 20
      },
      listItemTablet: {
        fontSize: 19,
        color: '#72788D',
        fontWeight: '700',
        lineHeight: 30,
      },
      linkTablet: {
        color: '#0090F5',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 5,
        marginVertical: 10,
        fontSize: 224,
        fontWeight: '600',
      },
      linkContainerTablet: {
          flexDirection: 'row',
          alignItems:'center',
          marginBottom: 10
      }
})