import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LineChart } from 'react-native-svg-charts'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { assemblePriceHistory, fetchAssetPriceForPeriod } from '../utils/UtilFunctions';
import { ThemeContext } from '../context/ThemeContext';
import { GlobalStyles } from '../utils/GlobalStyles';


const CryptoPanel = ({crypto, period, navigation }) => {
    
    const [assetPrice, setAssetPrice] = useState([]);
    const [priceHistory, setPriceHistory] = useState([]);
    const [perChange, setPerChange] = useState();
    const [valChange, setValChange] = useState();
    const [changeString, setChangeString] = useState();
    const { isDark } = useContext(ThemeContext);
    
    useEffect(() => {

        async function loadContent() {
            let data = await fetchAssetPriceForPeriod(crypto.id, period)

            // Calculate changes in currency value
            let valChange = data.rate - data.history[0].rate;
            let perChange = (valChange/data.rate) * 100;
            let changeString = valChange < 0 ? `${perChange.toFixed(2)}% ($${valChange.toFixed(4)})` : `+${perChange.toFixed(2)}% ($${valChange.toFixed(4)})`

            setAssetPrice(data);
            setValChange(valChange);
            setPerChange(perChange);
            setChangeString(changeString);
            setPriceHistory(assemblePriceHistory(data.history));
        }

        loadContent();

    }, [period]);
    
    const pressHandler = () => {
        navigation.navigate('Info', {
            crypto: crypto, 
            valChange: valChange, 
            perChange: perChange, 
            priceHistory: priceHistory,
            assetPrice: assetPrice,
            changeString: changeString 
        });
    }

    return (
        <TouchableOpacity onPress={pressHandler}>
            <View style={[styles.mainView, , isDark ? GlobalStyles.darkBorder : GlobalStyles.lightBorder]}>
                    <View style={styles.infoView}>
                        <View style={styles.nameView}>
                            <Image style={styles.symbol} source={{uri: crypto.icon_address}} />
                            <Text style={[styles.name, GlobalStyles.infoFont, isDark ? GlobalStyles.darkText : GlobalStyles.lightText]}>{crypto.name}</Text>
                        </View>
                        <View style={styles.priceView}>
                            <Text style={[styles.rate,  GlobalStyles.infoFont, isDark ? GlobalStyles.darkText : GlobalStyles.lightText]}>${assetPrice.rate}</Text>
                            <Text style={[styles.changeRate,  GlobalStyles.infoFont]}>{changeString}</Text>
                        </View>
                    </View>
                    {priceHistory && <LineChart 
                        style={styles.graph}
                        data={priceHistory}
                        svg={{ stroke: '#F15A29', strokeOpacity: 0.6, strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 3 }}
                        contentInset={{ top: 20, bottom: 20 }}
                        showGrid={false}
                    />}
            </View>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    mainView: {
        borderWidth: 2,
        borderColor: '#F6F6F6',
        borderRadius: 15,
        width: 343,
        height: 140,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 338,
        height: 54
    },
    symbol: {
        width: 36,
        height: 36,
    },
    name: {
        fontSize: 15,
        lineHeight: 18,
        color: '#495162',
        paddingLeft: 12 
    },
    rate: {
        textAlign: 'right',
        maxWidth: 77,
        height: 21,
        fontSize: 15,
        lineHeight: 18,
        color: '#495162',
    },
    changeRate: {
        fontSize: 12,
        lineHeight: 18, 
        color: '#33BB5D',
        textAlign: 'right',
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 14
    },
    priceView: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 12,
        textAlign: 'right', 
    },
    graph: {
        height: 66,
    }

})


export default withNavigation(CryptoPanel);
