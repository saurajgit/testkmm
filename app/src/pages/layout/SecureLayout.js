import 'fullcalendar/dist/fullcalendar.css';
import '../../App.css';

import React, { Component } from 'react';

import classNames from 'classnames';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import PropTypes from 'prop-types';
import { isValidElementType } from 'react-is';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppFooter } from '../../AppFooter';
import Locations from '../../Locations';
import { withLoadingScreen } from './withLoadingScreen';

class SecureLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			layoutMode: 'static',
			layoutColorMode: 'dark',
			staticMenuInactive: false,
			overlayMenuActive: false,
			mobileMenuActive: false,
		};

		this.onWrapperClick = this.onWrapperClick.bind(this);
		this.onToggleMenu = this.onToggleMenu.bind(this);
		this.onSidebarClick = this.onSidebarClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.createMenu();
	}

	onWrapperClick(event) {
		if (!this.menuClick) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false,
			});
		}

		this.menuClick = false;
	}

	onToggleMenu(event) {
		this.menuClick = true;

		if (this.isDesktop()) {
			if (this.state.layoutMode === 'overlay') {
				this.setState({
					overlayMenuActive: !this.state.overlayMenuActive,
				});
			}
			else if (this.state.layoutMode === 'static') {
				this.setState({
					staticMenuInactive: !this.state.staticMenuInactive,
				});
			}
		}
		else {
			const mobileMenuActive = this.state.mobileMenuActive;
			this.setState({
				mobileMenuActive: !mobileMenuActive,
			});
		}

		event.preventDefault();
	}

	onSidebarClick(event) {
		this.menuClick = true;
		setTimeout(() => {
			// this.layoutMenuScroller.moveBar();
		}, 500);
	}

	onMenuItemClick(event) {
		if (!event.item.items) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false,
			});
		}
	}

	navigateToMenu = (itemUrl: String) => {
		this.props.history.push(itemUrl);
	}

	createMenu() {
		this.menu = [
			{
				label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {
					this.navigateToMenu(Locations.Dashboard.toUrl())
				},
			},
			{
				label: 'Users', icon: 'pi pi-fw pi-list', command: () => {
					this.navigateToMenu(Locations.UserList.toUrl());
				},
			},
			{
				label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
				items: [
					{ label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'static' }) },
					{ label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'overlay' }) },
				],
			},
			{
				label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
				items: [
					{ label: 'Dark', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'dark' }) },
					{ label: 'Light', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'light' }) },
				],
			},
			{
				label: 'Components', icon: 'pi pi-fw pi-globe', badge: '9',
				items: [
					{ label: 'Sample Page', icon: 'pi pi-fw pi-th-large', to: '/sample' },
					{ label: 'Forms', icon: 'pi pi-fw pi-file', to: '/forms' },
					{ label: 'Data', icon: 'pi pi-fw pi-table', to: '/data' },
					{ label: 'Panels', icon: 'pi pi-fw pi-list', to: '/panels' },
					{ label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/overlays' },
					{ label: 'Menus', icon: 'pi pi-fw pi-plus', to: '/menus' },
					{ label: 'Messages', icon: 'pi pi-fw pi-spinner', to: '/messages' },
					{ label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/charts' },
					{ label: 'Misc', icon: 'pi pi-fw pi-upload', to: '/misc' },
				],
			},
			{
				label: 'Template Pages', icon: 'pi pi-fw pi-file',
				items: [
					{ label: 'Empty Page', icon: 'pi pi-fw pi-circle-off', to: '/empty' },
				],
			},
			{
				label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
				items: [
					{
						label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
								],
							},
							{
								label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' },
								],
							},
						],
					},
					{
						label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
								],
							},
							{
								label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' },
								],
							},
						],
					},
				],
			},
			{
				label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => {
					this.navigateToMenu(Locations.Document.toUrl());
				},
			},
			{
				label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {
					window.location = 'https://github.com/primefaces/sigma';
				},
			},
		];
	}

	addClass(element, className) {
		if (element.classList)
			element.classList.add(className);
		else
			element.className += ' ' + className;
	}

	removeClass(element, className) {
		if (element.classList)
			element.classList.remove(className);
		else
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	componentDidUpdate() {
		if (this.state.mobileMenuActive)
			this.addClass(document.body, 'body-overflow-hidden');
		else
			this.removeClass(document.body, 'body-overflow-hidden');
	}

	render() {
		let logo = this.state.layoutColorMode === 'dark' ? '/assets/layout/images/logo-white.svg' : '/assets/layout/images/logo.svg';

		let wrapperClass = classNames('layout-wrapper', {
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
			'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
			'layout-mobile-sidebar-active': this.state.mobileMenuActive,
		});
		let sidebarClassName = classNames('layout-sidebar', { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' });

		return (
			<div className={wrapperClass} onClick={this.onWrapperClick}>
			
				<div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>

					<ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
						<div className="layout-sidebar-scroll-content">
							<div className="layout-logo">
								<img alt="Logo" src={logo} />
							</div>
							
						</div>
					</ScrollPanel>
				</div>

				<div className="layout-main">
					<this.props.SecureComponent {...this.props} />
				</div>

				<AppFooter />

				<div className="layout-mask"></div>
			</div>
		);
	}
}

SecureLayout.propTypes = {
	dispatch: PropTypes.func.isRequired,
	SecureComponent: (props, propName) => {
		if (props[propName] && !isValidElementType(props[propName])) {
			return new Error(
				`Invalid prop 'SecureComponent' supplied to 'SecureLayout': the prop is not a valid React component`,
			);
		}
	},
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const ConnectedLayout = connect()(withRouter(withLoadingScreen(SecureLayout)));

export const withSecureLayout = SecureComponent => props => (
	<ConnectedLayout {...props} SecureComponent={SecureComponent} />
);
