import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import InfoScreen from '../screens/InfoScreen';
import CryptoPanel from '../components/CryptoPanel';

const screens = {
    Home: {
        screen: MainScreen
    },
    Info: {
        screen: InfoScreen
    }
}

const HomeStack = createStackNavigator(screens, {defaultNavigationOptions: {
    headerShown: false
}});

export default createAppContainer(HomeStack);