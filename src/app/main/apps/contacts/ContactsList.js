import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import * as Actions from './store/actions';
import withFixedColumns from "react-table-hoc-fixed-columns";

// import withFixedColumns from "react-table-hoc-fixed-columns";

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
	const total = useSelector(({ contactsApp }) => contactsApp.contacts.total);
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const [filteredData, setFilteredData] = useState(null);

	var d = new Date();
	var month = new Array();
	month[0] = "ENERO";
	month[1] = "FEBRERO";
	month[2] = "MARZO";
	month[3] = "ABRIL";
	month[4] = "MAYO";
	month[5] = "JUNIO";
	month[6] = "JULIO";
	month[7] = "AGOSTO";
	month[8] = "SEPTIEMBRE";
	month[9] = "OCTUBRE";
	month[10] = "NOVIEMBRE";
	month[11] = "DICIEMBRE";
	var n = month[d.getMonth()];
	var nAnt = month[d.getMonth() - 1];
	if(n === 0)
	{
		nAnt = month[11];
	}

	const columns = React.useMemo(
		() => [

			
			//nombreCampania
			{
				Header: 'Campaña',
				accessor: 'nombreCampania',
				className: 'font-bold',
				fixed: "left",
				sortable: true
			},

			// ID Campaña
			{
				Header: 'ID Campaña',
				accessor: 'idCampania',
				className: 'font-bold',
				sortable: true
			},	

			// impresiones

			
			{
				Header: 'IMP',
				accessor: 'g_impresiones',
				className: 'font-bold',
				sortable: true
			},
			
			{
				Header:  nAnt , //'g_impresionesAnt',
				accessor: 'g_impresionesAnt',
				className: 'font-bold',
				sortable: true
			},

			{
				Header: '% Var',
				accessor: 'g_impresionesVar',
				className: 'font-bold',
				sortable: true
			},

			// CLICS
			{
				Header: 'CLICS',
				accessor: 'g_clicks',
				className: 'font-bold',
				sortable: true
			},

			{
				Header: nAnt,//'g_clicksAnt',
				accessor: 'g_clicksAnt',
				className: 'font-bold',
				sortable: true
			},

			{
				Header: '% Var',
				accessor: 'g_clicksVar',
				className: 'font-bold',
				sortable: true
			},
			
			// CTR
			{
				Header: 'CTR',
				accessor: 'g_ctr',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: nAnt, //'g_ctrAnt',
				accessor: 'g_ctrAnt',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '% Var',
				accessor: 'g_ctrVar',
				className: 'font-bold',
				sortable: true
			},
			
			// coste medio
			{
				Header: 'COSTE',
				accessor: 'g_averageCpc',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: nAnt,// 'g_averageCpcAnt',
				accessor: 'g_averageCpcAnt',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '% Var',
				accessor: 'g_averageCpcVar',
				className: 'font-bold',
				sortable: true
			},
			//GASTO
			{
				Header: n,
				accessor: 'g_costo',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: nAnt,
				accessor: 'g_costoAnt',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: '% Var',
				accessor: 'g_costoVar',
				className: 'font-bold',
				sortable: true
			},

			
			// LEADS
			
			{
				// Header: month[5],  'leads',
				 Header:  n, //'leads',
				accessor: 'leads',
				sortable: true
			},
			
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'leadsAnt',
				accessor: 'leadsAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'leadsAntPercentVar',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'leadsAntVar',
				sortable: true
			},
			
			
			// CONVERSIÓN

			{
				// Header: month[5],  'leads',
				 Header:  n,//'conversion',
				accessor: 'conversion',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'conversionAnt',
				accessor: 'conversionAnt',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'conversionVar',
				sortable: true
			},


			// VENTAS TOTALES

			//VENTAS LEADS MES

			{
				// Header: month[5],  'leads',
				 Header: n,//'ventasLeadMes',
				accessor: 'ventasLeadMes',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'ventasLeadMesAnt',
				accessor: 'ventasLeadMesAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'ventasLeadMesVar',
				sortable: true
			},
			

			// EFECTIVIDAD Mes
			{
				// Header: month[5],  'leads',
				 Header: n, //'efectividadVentaLeadMes',
				accessor: 'efectividadVentaLeadMes',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'efectividadVentaLeadMesAnt',
				accessor: 'efectividadVentaLeadMesAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'efectividadVentaLeadMesVar',
				sortable: true
			},

			// CPL
			{
				// Header: month[5],  'leads',
				 Header: n,// 'costoPorLead',
				accessor: 'costoPorLead',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoPorLeadAnt',
				accessor: 'costoPorLeadAnt',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoPorLeadVar',
				sortable: true
			},

			// CPV Totales
			{
				// Header: month[5],  'leads',
				 Header: n, //'costoPorVentaFacturada',
				accessor: 'costoPorVentaFacturada',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoPorVentaFacturadaAnt',
				accessor: 'costoPorVentaFacturadaAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoPorVentaFacturadaVar',
				sortable: true
			},
			
			// CPV Mes
			{
				// Header: month[5],  'leads',
				 Header: n,//'costoPorVentaLeadMes',
				accessor: 'costoPorVentaLeadMes',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoPorVentaLeadMesAnt',
				accessor: 'costoPorVentaLeadMesAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoPorVentaLeadMesVar',
				sortable: true
			},
			
			// MERMA
			{
				// Header: month[5],  'leads',
				 Header: n,//'merma',
				accessor: 'merma',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'mermaAnt',
				accessor: 'mermaAnt',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'mermaVar',
				sortable: true
			},
			
			// PRIORIDAD 1
			{
				// Header: month[5],  'leads',
				 Header: n,//'prioridad1',
				accessor: 'prioridad1',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'prioridad1Ant',
				accessor: 'prioridad1Ant',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'prioridad1Var',
				sortable: true
			},

			// CP P1

			{
				// Header: month[5],  'leads',
				 Header: n,//'costoPrioridad1',
				accessor: 'costoPrioridad1',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoPrioridad1Ant',
				accessor: 'costoPrioridad1Ant',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoPrioridad1Var',
				sortable: true
			},

			// TIEMPO P1
			{
				// Header: month[5],  'leads',
				 Header: n,//'tiempoAtencionPrioridad1',
				accessor: 'tiempoAtencionPrioridad1',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt ,//'tiempoAtencionPrioridad1Ant',
				accessor: 'tiempoAtencionPrioridad1Ant',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'tiempoAtencionPrioridad1Var',
				sortable: true
			},

			// % CONV P1
			{
				// Header: month[5],  'leads',
				 Header: n,//'porcentajeConversionPrioridad1',
				accessor: 'porcentajeConversionPrioridad1',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'porcentajeConversionPrioridad1Ant',
				accessor: 'porcentajeConversionPrioridad1Ant',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '%Var',
				accessor: 'porcentajeConversionPrioridad1Var',
				sortable: true
			},

			// ABIERTO
			{
				// Header: month[5],  'leads',
				 Header: n,//'abiertoSinGestionar',
				accessor: 'abiertoSinGestionar',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'abiertoSinGestionarAnt',
				accessor: 'abiertoSinGestionarAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'abiertoSinGestionarVar',
				sortable: true
			},

			// CALIFICADO
			{
				// Header: month[5],  'leads',
				 Header:n, //'calificado',
				accessor: 'calificado',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'calificadoAnt',
				accessor: 'calificadoAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'calificadoVar',
				sortable: true
			},

			// CONVERTIDO

			{
				// Header: month[5],  'leads',
				 Header: n,//'convertido',
				accessor: 'convertido',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'convertidoAnt',
				accessor: 'convertidoAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'convertidoVar',
				sortable: true
			},

			// SOLO CONSULTA PRECIO
			{
				// Header: month[5],  'leads',
				 Header: n,//'soloConsultaPrecio',
				accessor: 'soloConsultaPrecio',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'soloConsultaPrecioAnt',
				accessor: 'soloConsultaPrecioAnt',
				sortable: true
			},
			
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'soloConsultaPrecioVar',
				sortable: true
			},

			// COMPRA FUTURA
			{
				// Header: month[5],  'leads',
				 Header: n, //'compraFutura',
				accessor: 'compraFutura',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: nAnt ,//'compraFuturaAnt',
				accessor: 'compraFuturaAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'compraFuturaVar',
				sortable: true
			},

			// CP ABIERTO
			{
				// Header: month[5],  'leads',
				 Header: n,// 'costoAbierto',
				accessor: 'costoAbierto',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoAbiertoAnt',
				accessor: 'costoAbiertoAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoAbiertoVar',
				sortable: true
			},
			
			// CP CALIFICADO

			{
				// Header: month[5],  'leads',
				 Header: n,//'costoCalificado',
				accessor: 'costoCalificado',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: nAnt, //'costoCalificadoAnt',
				accessor: 'costoCalificadoAnt',
				sortable: true
			},
			
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoCalificadoVar',
				sortable: true
			},

			// CP CONVERTIDO
			{
				// Header: month[5],  'leads',
				 Header: n, //'costoConvertido',
				accessor: 'costoConvertido',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoConvertidoAnt',
				accessor: 'costoConvertidoAnt',
				sortable: true
			},

			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoConvertidoVar',
				sortable: true
			},
			
			// CP SOLO PRECIO

			{
				// Header: month[5],  'leads',
				 Header: n,//'costoSoloPrecio',
				accessor: 'costoSoloPrecio',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoSoloPrecioAnt',
				accessor: 'costoSoloPrecioAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoSoloPrecioVar',
				sortable: true
			},
			

			// CP COMPRA FUTURA
			{
				// Header: month[5],  'leads',
				 Header: n,//'costoCompraFutura',
				accessor: 'costoCompraFutura',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: nAnt,//'costoCompraFuturaAnt',
				accessor: 'costoCompraFuturaAnt',
				sortable: true
			},
			{
				// Header: month[5],  'leads',
				 Header: '% Var',
				accessor: 'costoCompraFuturaVar',
				sortable: true
			}

		],
		[dispatch, user.starred]
	);

	useEffect(() => 	{
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText,total]);

	if (!filteredData) {
		return null;
	}


	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No hay registros
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ContactsTable
				columns={columns}
				data={filteredData}
				total={total}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;
