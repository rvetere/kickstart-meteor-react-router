import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import todoRoutes from 'TodoApp/client/routes';
import {configureStore} from 'TodoApp/client/configureStore';


// Data that is populated by hooks during startup (no, they won't populate - isolated scopes to each other -.-)
let history;
let store;
let initialState;

// 1.(ssr: 2.) Use history hook to get a reference to the history object
const historyHook = newHistory => {
  history = newHistory;

  // if (Meteor.isServer) {
  //     store = configureStore(history);
  //     history = syncHistoryWithStore(history, store);
  // }
};


// (ssr: 1.) Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();

// 2. Take the rehydrated state and use it as the initial state client side
const rehydrateHook = state => initialState = state;

// 3. Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
  store = configureStore(history, initialState);
  history = syncHistoryWithStore(history, store);

  // this line of code, like in the readme proposed - falls back to hash-routing oO
  // return <Provider store={store}>{app}</Provider>;

  // while this block where i overwrite the history of Router again with the new "enhanced" one from redux-router - works as expected
  return (
    <Provider store={store}>
      {/* it's the only way we can attach the enhanced history object to the Router :-/ */}
      <Router
        history={history}
        children={todoRoutes} />
    </Provider>
  );
};

const clientOptions = {historyHook, rehydrateHook, wrapperHook};
const serverOptions = {historyHook, dehydrateHook};

// passing "todoRoutes" becomes useless - as we're overwriting the full "app" prop given in wrapperHook again -> pass custom props right there
ReactRouterSSR.Run(todoRoutes, clientOptions, serverOptions);
