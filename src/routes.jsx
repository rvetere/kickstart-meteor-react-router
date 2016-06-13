import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import todoRoutes from 'TodoApp/client/routes';
import { configureStore } from 'TodoApp/client/configureStore';

// Data that is populated by hooks during startup
let history;
let store;
let initialState;

// Use history hook to get a reference to the history object
const historyHook = newHistory => {
    history = newHistory;

    // if (Meteor.isServer) {
    //     store = configureStore(history);
    //     history = syncHistoryWithStore(history, store);
    // }
};


// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();

// Take the rehydrated state and use it as the initial state client side
const rehydrateHook = state => initialState = state;

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
    store = configureStore(browserHistory, initialState);
    history = syncHistoryWithStore(browserHistory, store);
    return <Provider store={store}>{app}</Provider>;
};

const clientOptions = { historyHook, rehydrateHook, wrapperHook };
const serverOptions = { historyHook, dehydrateHook };

ReactRouterSSR.Run(todoRoutes, clientOptions, serverOptions);
