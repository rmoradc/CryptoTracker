import React, { createContext, Component } from 'react';

export const SearchContext = createContext();

class SearchContextProvider extends Component {
    state = {
        term: '',
    }

    setTerm = (term) => {
        this.setState({ term: term});
    };

    render() {
        return (
            <SearchContext.Provider value={{...this.state, setTerm: this.setTerm}}>
                {this.props.children}
            </SearchContext.Provider>
        );
    }
}

export { SearchContextProvider};

