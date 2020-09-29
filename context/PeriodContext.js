import React, { createContext, Component } from 'react';

export const PeriodContext = createContext();

class PeriodContextProvider extends Component {
    state = {
        period: 'month',
    }

    changePeriod = (newPeriod) => {
        this.setState({ period: newPeriod })
    }

    render() {
        return (
            <PeriodContext.Provider value={{...this.state, changePeriod: this.changePeriod}}>
                {this.props.children}
            </PeriodContext.Provider>
        );
    }
}

export { PeriodContextProvider };

