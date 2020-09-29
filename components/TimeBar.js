import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PeriodContext } from '../context/PeriodContext';
import { GlobalStyles } from '../utils/GlobalStyles';

const MenuBar = () => {

    const { period, changePeriod } = useContext(PeriodContext);

    return (
        <View style={styles.menuBarContainer}>
            <TouchableOpacity style={[styles.button, GlobalStyles.titleFont]} onPress={() => changePeriod('all')}><Text style={[styles.timeText, period === 'all' ? styles.timeTextSelect : null]} >all</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, GlobalStyles.titleFont]} onPress={() => changePeriod('year')}><Text style={[styles.timeText, period === 'year' ? styles.timeTextSelect : null]} >year</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, GlobalStyles.titleFont]} onPress={() => changePeriod('month')}><Text style={[styles.timeText, period === 'month' ? styles.timeTextSelect : null]} >month</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, GlobalStyles.titleFont]} onPress={() => changePeriod('week')}><Text style={[styles.timeText, period === 'week' ? styles.timeTextSelect : null]} >week</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, GlobalStyles.titleFont]} onPress={() => changePeriod('day')}><Text style={[styles.timeText, period === 'day' ? styles.timeTextSelect : null]} >day</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menuBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 8
    },
    timeText: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        color: '#8A96AA'   
    },
    button: {
        height: 30,
        margin: 10
    },
    timeTextSelect: {
        color: '#F15A29'
    }
})

export default MenuBar;
