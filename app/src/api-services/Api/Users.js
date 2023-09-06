import BaseService from '../BaseService';

class Users extends BaseService {
	list() {
		return this.serviceConnector().callApi({ url: '/user' });
	}

	retrieve(userId) {
		return this.serviceConnector().callApi({ url: `/user/${userId}` });
	}

	create(customer) {
		return this.serviceConnector().invokeRequest({
			url: '/user',
			method: 'POST',
			data: customer,
		});
	}

	update(customer) {
		return this.serviceConnector().invokeRequest({
			url: `/user/${customer.entityId}`,
			method: 'PUT',
			data: customer,
		});
	}

	remove(userId) {
		return this.serviceConnector().invokeRequest({
			url: `/user/${userId}`,
			method: 'DELETE',
		});
	}

	accessByUserRole() {
		return this.serviceConnector().invokeRequest({
			url: '/users',
			method: 'GET'
		})
	}

	accessByAdminRole() {
		return this.serviceConnector().invokeRequest({
			url: '/admin',
			method: 'GET'
		})
	}
}

const user = new Users();

export default user;
