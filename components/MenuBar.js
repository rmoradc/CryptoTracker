import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 
import { ThemeContext } from '../context/ThemeContext';
import { SearchContext } from '../context/SearchContext';
import { GlobalStyles } from '../utils/GlobalStyles';

const MenuBar = () => {
    
    const { isDark, changeTheme } = useContext(ThemeContext);
    const { term, setTerm } = useContext(SearchContext);

    return (
        <View style={styles.menuBarContainer}>
            <EvilIcons style={[styles.searchButton, isDark ? GlobalStyles.darkText : GlobalStyles.lightText]} name="search" size={24} color="black" />
            <TextInput onChangeText={text => setTerm(text)} value={term} style={styles.searchInput} />
            <TouchableOpacity style={styles.trackerButton} onPress={changeTheme}>
                <Text style={[styles.title, GlobalStyles.titleFont, isDark ? GlobalStyles.darkText : GlobalStyles.lightText]}>Tracker</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menuBarContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent:'flex-start',
        alignItems: 'center',
        width: 375,
        height: 65,
        marginTop: 43,
        marginBottom: 47,
    },
    title: {
        fontSize: 18,
        lineHeight: 21,
        color: '#495162',
        width: 100
    },
    trackerButton: {
        flex: 1,
        marginTop: 23.15,
        marginLeft: 152,
        paddingRight: 70,
    },
    searchButton: {
        flex: 1,
        marginTop: 23.15,
    },
    searchInput: {
        flex: 1,
        borderColor: '#F6F6F6',
        borderRadius: 15,
        borderWidth: 1,
        height: 20,
        width: 50,
        alignSelf: 'center',
        marginTop: 23.15,
        marginRight: 10
    }

})

export default MenuBar;
