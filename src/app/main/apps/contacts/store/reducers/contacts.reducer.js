import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: null,
	total: null,
	searchText: '',
	routeParams: {},
	contactDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};

const contactsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CONTACTS: {
			return {
				...state,
				entities: _.keyBy(action.payload, 'id'),
				routeParams: action.routeParams,
				total: action.total
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		
		default: {
			return state;
		}
	}
};

export default contactsReducer;
