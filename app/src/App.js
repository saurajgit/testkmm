import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './App.css';

import React, {
  Component,
  Suspense,
} from 'react';

import i18next from 'i18next';
import { ProgressSpinner } from 'primereact/progressspinner';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import * as AuthorizationActions from './framework/redux/modules/Authorization';
import Locations from './Locations';
import SecurityContext from './pages/routing/SecurityContext';
import User from './pages/secure/Users/User';
import UserList from './pages/secure/Users/UserList';

class App extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		authContext: PropTypes.shape({
			keycloak: PropTypes.object,
			token: PropTypes.string,
			user: PropTypes.shape({
				username: PropTypes.string,
			}),
			login: PropTypes.func,
			loginUrl: PropTypes.string,
			logout: PropTypes.func,
			logoutUrl: PropTypes.string,
			registerUrl: PropTypes.string,
			accountUrl: PropTypes.string
		}).isRequired,
	};

	setAuthContext = authContext => {
		this.props.dispatch(AuthorizationActions.initialize(authContext));
	};

	render = () => {
		const { authContext } = this.props;
		return (
			<SecurityContext.Provider value={{ authContext: authContext, setAuthContext: this.setAuthContext }}>
				<Suspense fallback={<ProgressSpinner />}>
					<I18nextProvider i18n={i18next}>
						<Switch>
							{Locations.Home.toRoute({ component: Home, invalid: NotFound }, true)}
							{/* Public Routes */}
							{/* End Public Routes */}
							{/* Secure Routes */}
							{Locations.UserEdit.toRoute({ component: User, invalid: NotFound }, true)}
							{Locations.UserNew.toRoute({ component: User, invalid: NotFound }, true)}
							{Locations.UserList.toRoute({ component: UserList, invalid: NotFound }, true)}
							{/* End Secure Routes */}

							<Route path="/not-found" component={NotFound} />
							<Route path="*" render={() => <Redirect to="/not-found" />} />
						</Switch>
					</I18nextProvider>
				</Suspense>
			</SecurityContext.Provider>
		);
	};
}

export default connect(state => ({
	authContext: state.authContext,
}))(App);
