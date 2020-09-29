import React, {useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LineChart } from 'react-native-svg-charts'
import { ThemeContext } from '../context/ThemeContext';
import CryptoDetails from '../components/CryptoDetails';
import TimeBar from '../components/TimeBar';
import TitleBar from '../components/TitleBar';
import { PeriodContext } from '../context/PeriodContext';
import { assemblePriceHistory, fetchAssetPriceForPeriod } from '../utils/UtilFunctions';
import { GlobalStyles } from '../utils/GlobalStyles';


const InfoScreen = ({navigation}) => {

    const [priceHistory, setPriceHistory] = useState(navigation.getParam('priceHistory'));
    const crypto = navigation.getParam('crypto');
    const { isDark } = useContext(ThemeContext);
    const { period } = useContext(PeriodContext);

    useEffect(() => {

        async function loadData() {
            let data = await fetchAssetPriceForPeriod(crypto.id, period)
            setPriceHistory(assemblePriceHistory(data.history));
        }

        loadData();

    }, [period])

    return (
        <View style={[styles.container, isDark ? GlobalStyles.darkBg : GlobalStyles.lightBg]}>
            <TitleBar crypto={crypto} />
            <TimeBar />
            <View style={[styles.graphView, isDark ? GlobalStyles.darkBorder : GlobalStyles.lightBorder]}>
                <Text style={[styles.priceText,  GlobalStyles.infoFont, isDark ? GlobalStyles.darkText : GlobalStyles.lightText]}>{`$${navigation.getParam('assetPrice').rate.toFixed(4)}`}</Text>
                <Text style={[styles.changeText,  GlobalStyles.infoFont]}>{navigation.getParam('changeString')}</Text>
                <LineChart 
                    style={styles.graph}
                    data={priceHistory}
                    svg={{ stroke: '#F15A29', strokeOpacity: 0.6, strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 3 }}
                    contentInset={{ top: 20, bottom: 20 }}
                    showGrid={false}
                />
            </View>

            <CryptoDetails crypto={navigation.getParam('crypto')}  assetPrice={navigation.getParam('assetPrice')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 375,
        height: 812,
        justifyContent: 'space-around',
        paddingBottom: 246
    },
    graph: {
        width: 335,
        height: 117
    },
    graphView: {
        width: 335,
        height: 185,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#F6F6F6' 
    },
    priceText: {
        fontSize: 18,
        lineHeight: 21,
        color: '#495162',
        marginTop: 12
    },
    changeText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#33BB5D'
    },

})


export default InfoScreen;
