import React from 'react';

const MaterialUIComponentsRoutes = [
	{
		path: '/documentation/material-ui-components/tables',
		component: React.lazy(() => import('app/main/documentation/material-ui-components/pages/Tables'))
	}
];

export default MaterialUIComponentsRoutes;
