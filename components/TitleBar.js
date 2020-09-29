import React, { useContext } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../context/ThemeContext';
import { GlobalStyles } from '../utils/GlobalStyles';

const TitleBar = ({crypto, navigation}) => {
    
    const { isDark } = useContext(ThemeContext);

    const pressHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.backButton} onPress={pressHandler}>
                <Feather style={isDark ? GlobalStyles.darkText : GlobalStyles.lightText }name="chevron-left" size={24} color={'black'} />
            </TouchableOpacity>
            <Image style={styles.symbol} source={{uri: crypto.icon_address}} />
            <Text style={[styles.title, GlobalStyles.titleFont, isDark ? GlobalStyles.darkText : GlobalStyles.lightText]}>{crypto.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 375,
        marginBottom: 29
    },
    title: {
        fontSize: 18,
        lineHeight: 21,
        color: '#495162',
        alignSelf: 'center',
        marginLeft: 6,
        marginTop: 62
    },
    symbol: {
        width: 36,
        height: 36,
        marginRight: 6,
        marginTop: 59
    },
    backButton: {
        marginRight: 101.35,
        marginTop: 67.08,
        marginLeft: 17.56
    },

})

export default withNavigation(TitleBar);
