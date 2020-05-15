import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import firebaseService from 'app/services/firebaseService';
export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';

export function getContacts(routeParams) {
	console.log(routeParams.id)

	if(routeParams.id === 'all'){
		routeParams.id= ''
	}
	const request = firebaseService.getSpreadData(routeParams.id)


	// firebaseService.getSpreadHijo('6897694273')
	
	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_CONTACTS,
				payload: response.data,
				total: response.total,
				routeParams
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	};
}





