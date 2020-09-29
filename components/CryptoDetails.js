import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { GlobalStyles } from '../utils/GlobalStyles';

const CryptoDetails = ({crypto, assetPrice}) => {
    
    const { isDark } = useContext(ThemeContext);
    return (
        <View style={styles.mainView}>
            <Text style={[styles.infoTitleText,  GlobalStyles.titleFont, isDark ? GlobalStyles.darkBorder : GlobalStyles.lightBorder]}>Information</Text>
            <Text style={[styles.infoBodyText,  GlobalStyles.infoFont]}>Symbol:              {crypto.symbol}</Text>
            <Text style={[styles.infoBodyText,  GlobalStyles.infoFont]}>{`Market Cap:      $${assetPrice.market_cap} NZD`}</Text>
            <Text style={[styles.infoBodyText,  GlobalStyles.infoFont]}>{`24h Volume:     $${assetPrice.volume_24h} NZD`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 31,
    },
    infoTitleText: {
        fontSize: 15,
        lineHeight: 21,
        color: '#495162'
    },
    infoBodyText: {
        fontSize: 15,
        lineHeight: 21,
        color: '#8A96AA',
        alignSelf: 'flex-start',
        marginLeft: 34,
        marginTop: 12 
    }
})

export default CryptoDetails;
