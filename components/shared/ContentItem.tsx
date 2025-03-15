
import React, { useMemo }  from 'react'
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native'
import { useLanguage } from '../util/LangContext';
import Expandable from './Expandable';
import { useSelf } from '../hooks/useSelf';


export const RenderContentItem = ({ item, navigation }) => {
    const { t } = useLanguage();
    const { user: userInfo } = useSelf();
    const { width: SCREENWIDTH } = useWindowDimensions();

    const isTabletMode = useMemo(() => SCREENWIDTH > 700, [SCREENWIDTH]);

    if (!item) return null;

    const renderExpandable = () => (
        <Expandable
            title={t(item.title)}
            iconDown={t(item.iconDown)}
            content={item.content ? t(item.content) : undefined}
            items={item.items}
            isTabletMode={isTabletMode}
            textLink={item.textLink}
            listOfCompanies={item.listOfCompanies}
            text={item.text} listItems={[]}        />
    );

    if (isTabletMode) {
        return (
            <>
                {item.type === 'mainTitle' && (
                    <View>
                        <Text style={styles.mainTitleTablet}>{t(item.content)}</Text>
                    </View>
                )}
                {item.type === 'orangeText' && (
                    <View style={styles.orangeTextContainerTablet}>
                        <Text style={styles.orangeTextTablet}>{t(item.content)}</Text>
                    </View>
                )}
                {item.type === 'expandable' && renderExpandable()}
            </>
        );
    }

    return (
        <>
            {item.type === 'mainTitle' && (
                <View>
                    <Text style={styles.mainTitle}>{t('openBankAccountZurichEuEfta', { country: t(userInfo.country) })}</Text>
                </View>
            )}
            {item.type === 'orangeText' && (
                <View style={styles.orangeTextContainer}>
                    <Text style={styles.orangeText}>{t(item.content)}</Text>
                </View>
            )}
            {item.type === 'expandable' && renderExpandable()}
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainTitle: {
        fontSize: 16,
        paddingHorizontal: 24,
        lineHeight: 32,
        fontWeight: '800',
        marginVertical: 20,
        color: '#1C1C1E',
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        paddingHorizontal: 16,
        marginVertical: 12,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    textContainer: {
        flex: 1, 
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 22,
        textAlign: 'center',
        color: '#72788D',
        fontWeight: '600',
        lineHeight: 30,
    },
    orangeTextContainer: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#FFEFE9',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginHorizontal: 16,
        marginBottom: 24,
        marginTop: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orangeText: {
        fontSize: 17,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#4E0E00',
        fontWeight: '700',
        lineHeight: 28,
    },
    list: {
        marginLeft: 22,
        marginBottom: 16,
    },
    listItem: {
        fontSize: 17,
        color: '#555D70',
        fontWeight: '600',
        lineHeight: 28,
    },
    link: {
        color: '#007AFF',
        marginVertical: 10,
        marginHorizontal: 8,
        fontSize: 17,
        fontWeight: '600',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },


    // TABLET STYLES
    containerTablet: {
        flex: 1,
    },
    mainTitleTablet: {
        fontSize: 26,
        paddingHorizontal: 30,
        lineHeight: 34,
        fontWeight: '800',
        marginVertical: 22,
        color: '#1C1C1E',
        textAlign: 'center',
    },
    titleTablet: {
        fontSize: 22,
        paddingHorizontal: 20,
        marginVertical: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    textContainerTablet: {
        flex: 1, 
        alignItems: 'center',
    },
    textTablet: {
        fontSize: 24,
        paddingHorizontal: 26,
        textAlign: 'center',
        color: '#555D70',
        fontWeight: '600',
        lineHeight: 34,
    },
    orangeTextContainerTablet: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#FFEFE9',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginHorizontal: 40,
        marginBottom: 28,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 4,
    },
    orangeTextTablet: {
        fontSize: 22,
        paddingHorizontal: 12,
        textAlign: 'center',
        color: '#4E0E00',
        fontWeight: '700',
        lineHeight: 30,
    },
    listTablet: {
        marginLeft: 24,
        marginBottom: 20,
    },
    listItemTablet: {
        fontSize: 20,
        color: '#555D70',
        fontWeight: '600',
        lineHeight: 32,
    },
    linkTablet: {
        color: '#007AFF',
        marginVertical: 12,
        marginHorizontal: 12,
        fontSize: 20,
        fontWeight: '600',
    },
    linkContainerTablet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
});
