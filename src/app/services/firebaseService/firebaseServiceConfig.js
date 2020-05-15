const prodConfig = {
	apiKey           : "AIzaSyC0m3fxQEBygE45vObW-6whXj9HdDt5nbs",
	authDomain       : "limaretail-9d453.firebaseapp.com",
	databaseURL      : "https://limaretail-9d453.firebaseio.com",
	projectId        : "limaretail-9d453",
	storageBucket    : "limaretail-9d453.appspot.com",
	messagingSenderId: "37150081773"
};

const devConfig = {
	 apiKey           : "AIzaSyC0m3fxQEBygE45vObW-6whXj9HdDt5nbs",
	 authDomain       : "limaretail-9d453.firebaseapp.com",
	 databaseURL      : "https://limaretail-9d453.firebaseio.com",
	 projectId        : "limaretail-9d453",
	 storageBucket    : "limaretail-9d453.appspot.com",
	 messagingSenderId: "37150081773"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
