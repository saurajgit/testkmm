import localForage from 'localforage';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistCombineReducers } from 'redux-persist';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { monitorReducerEnhancer } from './Enhancers';
import { crashReporter } from './Middlewares';
import rootReducer from './Reducers';

const isProductionMode = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production';

let middleware = null

const middlewares = [thunk, promise, crashReporter]

if (isProductionMode) {
	middleware = compose(applyMiddleware(...middlewares))

} else {
	middleware = composeWithDevTools(
		applyMiddleware(...middlewares, createLogger()),
		monitorReducerEnhancer
	)
}

const configureStore = preloadedState => {
	const store = createStore(
		persistCombineReducers(
			{
				key: 'keycloak-react',
				storage: localForage,
				whitelist: ['authContext']
			},
			rootReducer,
		),
		preloadedState,
		middleware
	)

	return store
}

export default configureStore()