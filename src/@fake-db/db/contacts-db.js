import FuseUtils from '@fuse/utils';
import firebaseService from 'app/services/firebaseService';
import _ from '@lodash';
import mock from '../mock';

const contactsDB = {
	contacts: [
		
			{
			   "id":2,
			   "firstName":"Galia",
			   "lastName":"Ojalvo",
			   "emailAddress":"alix.leroy@demo.com",
			   "phoneNumber":"01 23 45 67 89",
			   "country":"France",
			   "department":"Accounting",
			   "weight":51.1,
			   "birthDate":"1950-10-19T06:00:00.000Z"
			},
			{
			   "id":3,
			   "firstName":"Nicolette ",
			   "lastName":"Araujo",
			   "emailAddress":"timothée.laurent@demo.com",
			   "phoneNumber":"01 23 45 67 89",
			   "country":"Spain",
			   "department":"Sales",
			   "weight":57.9,
			   "birthDate":"1941-12-01T06:00:00.000Z"
			},
			{
			   "id":4,
			   "firstName":"Gaila",
			   "lastName":"Araujo",
			   "emailAddress":"sidney.richard@demo.com",
			   "phoneNumber":"01 23 45 67 89",
			   "country":"England",
			   "department":"Marketing",
			   "weight":58.3,
			   "birthDate":"1953-10-18T06:00:00.000Z"
			},
			{
			   "id":5,
			   "firstName":"Samir",
			   "lastName":"Araujo",
			   "emailAddress":"samir@samir.com",
			   "phoneNumber":"01 23 45 67 89",
			   "country":"Bolivia",
			   "department":"Gerencia",
			   "weight":60,
			   "birthDate":"2007-02-20T07:00:00.000Z"
			}
		 
	],
	user: [
		{
			id: '5725a6802d10e277a0f35724',
			name: 'John Doe',
			avatar: 'assets/images/avatars/profile.jpg',
			starred: [
				'5725a680ae1ae9a3c960d487',
				'5725a6801146cce777df2a08',
				'5725a680bbcec3cc32a8488a',
				'5725a680bc670af746c435e2',
				'5725a68009e20d0a9e9acf2a'
			],
			frequentContacts: [
				'5725a6809fdd915739187ed5',
				'5725a68031fdbb1db2c1af47',
				'5725a680606588342058356d',
				'5725a680e7eb988a58ddf303',
				'5725a6806acf030f9341e925',
				'5725a68034cb3968e1f79eac',
				'5725a6801146cce777df2a08',
				'5725a680653c265f5c79b5a9'
			],
			groups: [
				{
					id: '5725a6802d10e277a0f35739',
					name: 'Friends',
					contactIds: ['5725a680bbcec3cc32a8488a', '5725a680e87cb319bd9bd673', '5725a6802d10e277a0f35775']
				},
				{
					id: '5725a6802d10e277a0f35749',
					name: 'Clients',
					contactIds: [
						'5725a680cd7efa56a45aea5d',
						'5725a68018c663044be49cbf',
						'5725a6809413bf8a0a5272b1',
						'5725a6803d87f1b77e17b62b'
					]
				},
				{
					id: '5725a6802d10e277a0f35329',
					name: 'Recent Workers',
					contactIds: [
						'5725a680bbcec3cc32a8488a',
						'5725a680653c265f5c79b5a9',
						'5725a6808a178bfd034d6ecf',
						'5725a6801146cce777df2a08'
					]
				}
			]
		}
	]
};

mock.onGet('/api/contacts-app/contacts').reply(config => {
	const { id } = config.params;
	let response = [];
	const resultado = firebaseService.getSpreadHijo('6897694273').then(
		response => {
			console.log("hola?")
			console.log(response)
			return response
		}
	).then();


	// switch (id) {
	// 	case 'frequent': {
	// 		response = firebaseService.getSpreadData('04-05-20'); //'contactsDB.contacts.filter(contact => contactsDB.user[0].frequentContacts.includes(contact.id));
	// 		break;
	// 	}
	// 	case 'starred': {
	// 		response = firebaseService.getSpreadData('04-05-20'); //'contactsDB.contacts.filter(contact => contactsDB.user[0].starred.includes(contact.id));
	// 		break;
	// 	}
	// 	default: {

	// 		// response = firebaseService.getSpreadData('04-05-20');

	// 	// response = contactsDB.contacts

	// 	}
	// }
	return [200, resultado];
});

mock.onGet('/api/contacts-app/user').reply(config => {
	return [200, contactsDB.user[0]];
});

mock.onPost('/api/contacts-app/add-contact').reply(request => {
	const data = JSON.parse(request.data);
	contactsDB.contacts = [
		...contactsDB.contacts,
		{
			...data.newContact,
			id: FuseUtils.generateGUID()
		}
	];
	return [200, contactsDB.contacts];
});

mock.onPost('/api/contacts-app/update-contact').reply(request => {
	const data = JSON.parse(request.data);

	contactsDB.contacts = contactsDB.contacts.map(contact => {
		if (data.contact.id === contact.id) {
			return data.contact;
		}
		return contact;
	});

	return [200, contactsDB.contacts];
});

mock.onPost('/api/contacts-app/remove-contact').reply(request => {
	const data = JSON.parse(request.data);

	contactsDB.contacts = contactsDB.contacts.filter(contact => data.contactId !== contact.id);

	return [200, contactsDB.contacts];
});

mock.onPost('/api/contacts-app/remove-contacts').reply(request => {
	const data = JSON.parse(request.data);
	contactsDB.contacts = contactsDB.contacts.filter(contact => !data.contactIds.includes(contact.id));
	return [200, contactsDB.contacts];
});

mock.onPost('/api/contacts-app/toggle-starred-contact').reply(request => {
	const data = JSON.parse(request.data);
	contactsDB.user[0].starred = _.xor(contactsDB.user[0].starred, [data.contactId]);
	return [200, contactsDB.user[0]];
});

mock.onPost('/api/contacts-app/toggle-starred-contacts').reply(request => {
	const data = JSON.parse(request.data);
	contactsDB.user[0].starred = _.xor(contactsDB.user[0].starred, data.contactIds);
	return [200, contactsDB.user[0]];
});

mock.onPost('/api/contacts-app/set-contacts-starred').reply(request => {
	const data = JSON.parse(request.data);

	contactsDB.user[0].starred = [...contactsDB.user[0].starred, ...data.contactIds];

	return [200, contactsDB.user[0]];
});

mock.onPost('/api/contacts-app/set-contacts-unstarred').reply(request => {
	const data = JSON.parse(request.data);

	contactsDB.user[0].starred = contactsDB.user[0].starred.filter(contactId => !data.contactIds.includes(contactId));

	return [200, contactsDB.user[0]];
});
