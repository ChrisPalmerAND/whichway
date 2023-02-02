import React from 'react';
import { initialState, reducer } from './reducer';

export const AppContext = React.createContext({
    state: { ...initialState },
    dispatch: () => null,
});

export const AppProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    console.log('state', state);
    return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};
