import React from 'react';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    routing: routerReducer
  });

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      Meteor.isClient && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store
}
