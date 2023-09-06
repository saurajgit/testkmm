import React, { useContext } from 'react';

import Dashboard from '../../components/Dashboard';
import UserList from '../secure/Users/UserList';
import SecurityContext from './SecurityContext';

export default () => {
	const { authContext } = useContext(SecurityContext) || {}
	const { keycloak } = authContext || {}

	if (keycloak && keycloak.authenticated) {
		alert("Login successful")
		return <UserList />;
	}

	return <Dashboard />;
};
