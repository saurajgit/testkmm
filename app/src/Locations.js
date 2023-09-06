import Location from 'react-app-location';
import * as Yup from 'yup';

const integer = Yup.number().integer();
const wholeNbr = integer.positive();
const string = Yup.string();

export const HomeLocation = new Location('/');
export const DashboardLocation = new Location('/dashboard');
export const UserEditLocation = new Location('/user/:type/:entityId', {
 	type: string.required(),
 	entityId: wholeNbr.required()
 });
export const UserNewLocation = new Location('/user/:type', {
	type: string.required()
});
export const UserListLocation = new Location('/user', null, null);

export default {
	Home: HomeLocation,
	Dashboard: DashboardLocation,
	UserList: UserListLocation,
	UserEdit: UserEditLocation,
	UserNew: UserNewLocation,
};