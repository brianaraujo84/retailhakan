import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
// const listaArchivos = useSelector(lista => ({
	
// }));

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));

function ContactsSidebarContent(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const total = useSelector(({ contactsApp }) => contactsApp);

	if (!user) {
		return null;
	}

	const userList = Object.values(user);

	if (!userList) {
		return null;
	}

	return (

		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					{user.length > 0 && (
						<div className="p-24 flex items-center">
							Lista de Grupos
						</div>
					)}
					<Divider />
					<List>

						{userList.map(item => (

							<ListItem
							key={item.grupo}
							button
							component={NavLinkAdapter}
							to= {"/apps/contacts/" +  item.grupo}
							activeClassName="active"
							className={classes.listItem}
							> 
								<ListItemText className="truncate" primary= {item.grupo} disableTypography />
							</ListItem>

						))}
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
