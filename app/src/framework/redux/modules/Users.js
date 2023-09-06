import CustomerService from '../../../api-services/Api/Users';
import { SUCCESS } from '../../../models/Response';
import Dispatch from '../Dispatch';
import * as PageActions from './Page';

const LIST = 'user/LIST';
const CREATE = 'user/CREATE';
const RETRIEVE = 'user/RETRIEVE';
const UPDATE = 'user/UPDATE';
const DELETE = 'user/DELETE';
const CLICK = 'user/CLICK';

const initialState = {
	selected: {},
	list: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Dispatch.loadingAction(LIST): {
			return {
				...state
			};
		}
		case Dispatch.successAction(LIST): {
			return {
				...state,
				list: [...action.payload._embedded.user]
			};
		}
		case Dispatch.successAction(RETRIEVE): {
			return {
				...state,
				selected: { ...action.payload },
			};
		}
		case Dispatch.successAction(DELETE): {
			return {
				...state,
				list: [...state.list.filter((e, index, arr) => { return e.entityId !== action.payload.entityId })]
			};
		}
		case Dispatch.successAction(CLICK): {
			return {
				...state,
				selected: { ...action.payload },
			};
		}
		default:
			return state;
	}
}

export const list = () => dispatch => {
	Dispatch.loading(dispatch, LIST);
	CustomerService.list()
		.then(response => {
			Dispatch.done(dispatch, LIST, response);
		});
};

export const create = (customer, nextFunc) => dispatch => {
	Dispatch.loading(dispatch, CREATE);
	CustomerService.create(customer)
		.then(result => {
			Dispatch.done(dispatch, CREATE, result);
			if (nextFunc) {
				nextFunc();
			}
		});
};

export const retrieve = entity => dispatch => {
	Dispatch.loading(dispatch, RETRIEVE);
	if (!!entity && !!entity.entityId) {
		CustomerService.retrieve(entity.entityId)
			.then(result => {
				Dispatch.done(dispatch, RETRIEVE, result);
			});

	} else {
		Dispatch.done(dispatch, RETRIEVE, { status: SUCCESS, result: {} });
	}
};

export const update = (customer, nextFunc) => dispatch => {
	Dispatch.loading(dispatch, UPDATE);
	PageActions.startLoading(dispatch)
	CustomerService.update(customer)
		.then(result => {
			Dispatch.done(dispatch, UPDATE, result);
			if (nextFunc) {
				nextFunc();
				//Dispatch.done(dispatch, PageActions.PAGE_LOADING, { status: SUCCESS, result: {} });
				PageActions.stopLoading(dispatch);
			}
		});
};

export const remove = userId => dispatch => {
	Dispatch.loading(dispatch, DELETE);
	CustomerService.remove(userId)
		.then(result => {
			Dispatch.done(dispatch, DELETE, { status: SUCCESS, result: { entityId: userId } });
		});
};

export const clickUserRole = () => dispatch => {
	console.log('click')
	CustomerService.accessByUserRole()
		.then(response => {
			Dispatch.done(dispatch, CLICK, { status: SUCCESS, response });
		})
}

export const clickAdminRole = () => dispatch => {
	console.log('click')
	CustomerService.accessByAdminRole()
		.then(response => {
			Dispatch.done(dispatch, CLICK, { status: SUCCESS, response });
		})
}
