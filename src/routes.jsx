import { render } from 'react-dom';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import todoRoutes from 'TodoApp/client/routes';
import {configureStore} from 'TodoApp/client/configureStore';


// Data that is populated by hooks during startup (no, they won't populate - isolated scopes to each other -.-)
let history;
let store;
let initialState;

// Use history hook to get a reference to the history object
const historyHook = newHistory => history = newHistory;

// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();

// Take the rehydrated state and use it as the initial state client side
const rehydrateHook = state => initialState = state;

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = () => {
  store = configureStore(history, initialState);
  history = syncHistoryWithStore(history, store);

  const app = (
    <AppContainer>
      <Provider store={store}>
        <Router
          history={history}
          children={todoRoutes}
        />
      </Provider>
    </AppContainer>
  );

  // The following is needed so that we can hot reload our App.
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('TodoApp/client/routes', () => {
      render(
        app,
        document.getElementById('react-app')
      );
    });
  }

  // this line of code, like in the readme proposed - falls back to hash-routing oO
  // return <Provider store={store}>{app}</Provider>;

  // while this block where i overwrite the history of Router again with the new "enhanced" one from redux-router - works as expected
  return app;
};

const clientOptions = {historyHook, rehydrateHook, wrapperHook};
const serverOptions = {historyHook, dehydrateHook};

ReactRouterSSR.Run(todoRoutes, clientOptions, serverOptions);
