import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './firebaseServiceConfig';
import { func } from 'prop-types';

class FirebaseService {
	init(success) {
		if (Object.entries(config).length === 0 && config.constructor === Object) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(
					'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
				);
			}
			success(false);
			return;
		}

		if (firebase.apps.length) {
			return;
		}
		firebase.initializeApp(config);
		this.db = firebase.database();
		this.auth = firebase.auth();
		success(true);
	}

	getUserData = userId => {
		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			this.db
				.ref(`users/${userId}`)
				.once('value')
				.then(snapshot => {
					const user = snapshot.val();
					resolve(user);
				});
		});
	};

	updateUserData = user => {
		if (!firebase.apps.length) {
			return false;
		}
		return this.db.ref(`users/${user.uid}`).set(user);
	};

	onAuthStateChanged = callback => {
		if (!this.auth) {
			return;
		}
		this.auth.onAuthStateChanged(callback);
	};

	signOut = () => {
		if (!this.auth) {
			return;
		}
		this.auth.signOut();
	};


	getSpreadData = idarchivo => {
		let data = [];

		var today = new Date();
		var dia = '0'+ today.getDate();
		var mes = '0' + (today.getMonth() + 1);
		var anio = '0' + today.getFullYear();
		var date = mes.substring(mes.length -2,  mes.length)  +'-'+  anio.substring(anio.length -2,  anio.length);
		var url = date + '/'+ idarchivo // + '/' +'data'
		//var url = "03-20" + '/'+ idarchivo //+ '/' +'data'
		console.log(url)
		if (!firebase.apps.length) {
			return false;
		}
		
		return new Promise((resolve, reject) => {
			this.db
			.ref(url)
			.once('value')
			.then(snapshot => {
				// snapshot.forEach(function(childSnapshot) {
				// 	var childData = childSnapshot.val();
					
					
				// });
				data = snapshot.val();
				console.log(data);
				resolve(data);
			});

		});
	};


	getSpreadHijo = idarchivo => {
		let data = [];
		if (!firebase.apps.length) {
			return false;
		}	
		return new Promise((resolve, reject) => {
			this.db
				.ref("03-20").orderByKey().equalTo(idarchivo)
				.on("child_added", snapshot => {
					data = snapshot.val();
					resolve(data);
				});
		});
	};



	getArchivos = usuario => {
		let data = [];

		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			this.db
				.ref(`grupos`)  //.orderByValue().equalTo("raul@gmail.com")
				.once('value')
				.then(snapshot => {
					data = snapshot.val();
					resolve(data);
				});
		});
	};


}

const instance = new FirebaseService();

export default instance;
