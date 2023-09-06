import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import ApplicationStore from './framework/redux/ApplicationStore';

class AppWrapper extends Component {
	constructor(props) {
		super(props)
		this.persistor = persistStore(ApplicationStore)
	}

	render() {
		return (
			<Provider store={ApplicationStore}>
				<PersistGate loading={null} persistor={this.persistor}>
					<App />
				</PersistGate>
			</Provider>
		)
	}
}

export default AppWrapper
