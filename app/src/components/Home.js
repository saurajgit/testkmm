import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div class="center" color='blue'>
				<div>
				<h1>Landing page where keycloak login will be provided</h1>
				<Link to="/user">Login</Link>
				</div>
			</div>
		)
	}
}

export default Home