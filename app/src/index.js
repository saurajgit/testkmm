import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import ScrollToTop from './ScrollToTop';

ReactDOM.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<ScrollToTop>
			<AppWrapper />
		</ScrollToTop>
	</BrowserRouter>
	, document.getElementById('root'));

