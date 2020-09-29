import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import CryptoPanel from '../components/CryptoPanel';
import MenuBar from '../components/MenuBar';
import TimeBar from '../components/TimeBar';
import { PeriodContext } from '../context/PeriodContext';
import { ThemeContext } from '../context/ThemeContext';
import { GlobalStyles } from '../utils/GlobalStyles';
import { SearchContext } from '../context/SearchContext';


const MainScreen = () => {

    const [cryptoData, setCryptoData] = useState();
    const [searchResults, setSearchResults] = useState();
    const { period } = useContext(PeriodContext);
    const { isDark } = useContext(ThemeContext);
    const { term } = useContext(SearchContext);



    useEffect(() => {
        fetch('https://assets-api.sylo.io/v2/all').then(response => response.json()).then((data) => {
            setCryptoData(data);
            setSearchResults(data);
        })
    }, []);

    useEffect(() => {

        if(term.length > 0 && cryptoData.length > 0){
            let data = cryptoData.filter(crypto => crypto.name.includes(term));
            setSearchResults(data)
        } else {
            setSearchResults(cryptoData);
        }
    }, [term])

    const renderCryptoPanel = ({ item }) => (
        <CryptoPanel crypto={item} period={period}/>
    );

    const periodChange = (time) => {
        setPeriod(time);
    }


    return (
        <View style={[styles.container, isDark ? GlobalStyles.darkBg : GlobalStyles.lightBg]}>
            <MenuBar />
            <TimeBar periodChange={periodChange} period={period}/>
            {cryptoData && <FlatList
                    style={styles.list}
                    data={searchResults}
                    renderItem={renderCryptoPanel}
                    keyExtractor={item => item.id}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 375,
        height: 812,
        justifyContent: 'space-around',
    },
    list: {
        height: 680 
    }

})


export default MainScreen;
