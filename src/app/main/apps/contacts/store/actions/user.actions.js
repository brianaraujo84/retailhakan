import axios from 'axios';
import firebaseService from 'app/services/firebaseService';
import firebase from 'firebase/app';

export const GET_USER_DATA = '[CONTACTS APP] GET USER DATA';

export function getUserData() {
	const { currentUser } = firebase.auth();
	const request = firebaseService.getArchivos(currentUser.email)
	console.log(request)
	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_USER_DATA,
				payload: response
			})
		);
}
