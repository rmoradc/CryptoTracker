import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    state = {
        isDark: false,
    }

    changeTheme = () => {
        this.setState({ isDark: !this.state.isDark});
    };

    render() {
        return (
            <ThemeContext.Provider value={{...this.state, changeTheme: this.changeTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export { ThemeContextProvider};

