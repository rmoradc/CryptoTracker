import React, { useState } from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import { PeriodContextProvider } from './context/PeriodContext';
import { SearchContextProvider } from './context/SearchContext';
import HomeStack from './routes/HomeStack'; 
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'RawlineMedium': require('./assets/fonts/rawline-500.ttf'),
    'RawlineSemiBold': require('./assets/fonts/rawline-600.ttf'),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return (
    <ThemeContextProvider>
      <PeriodContextProvider>
        <SearchContextProvider>
          <HomeStack />
        </SearchContextProvider>
      </PeriodContextProvider>
    </ThemeContextProvider>
  );
}

