import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import ContactsTablePaginationActions from './ContactsTablePaginationActions';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import withFixedColumns from "react-table-hoc-fixed-columns";

const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.common.black,
	  color: theme.palette.common.white,
	},
	body: {
	  fontSize: 14,
	},
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
	root: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.background.default,
	  },
	},
  }))(TableRow);
  


const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<Checkbox ref={resolvedRef} {...rest} />
		</>
	);
});

const EnhancedTable = ({ columns, data, total, onRowClick }) => {
  const classes = withStyles();
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
		
		
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true,
			total
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		withFixedColumns,
		hooks => {
			hooks.allColumns.push(_columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					sortable: false,
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox.  Pagination is a problem since this will select all
					// rows even though not all rows are on the current page.  The solution should
					// be server side pagination.  For one, the clients should not download all
					// rows in most cases.  The client should only download data for the current page.
					// In that case, getToggleAllRowsSelectedProps works fine.
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox
								{...row.getToggleRowSelectedProps()}
								onClick={ev => ev.stopPropagation()}
							/>
						</div>
					)
				},
				..._columns
			]);
		}
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value));
	};

	// Render the UI for your table
	return (
		<TableContainer className="whitespace-no-wrap p-12"  >
			<MaUTable stickyHeader aria-label="sticky table" >
				<TableHead>
					<TableRow>
						<TableCell className="whitespace-no-wrap p-12" align="center" colSpan={3}>
							MAYO
           				</TableCell>

					   <TableCell align="center" colSpan={3}>
							IMPRESIONES
           				</TableCell>

						<TableCell align="center" colSpan={3}>
							CLICS
           				</TableCell>

					   <TableCell align="center" colSpan={3}>
							CTR
           				</TableCell>

						<TableCell align="center" colSpan={3}>
							COSTE MEDIO
           				</TableCell>
						<TableCell align="center" colSpan={3}>
							GASTO
           				</TableCell>
						<TableCell align="center" colSpan={4}>
							LEADS
           				</TableCell>

					   <TableCell align="center" colSpan={3}>
						   CONVERSIÓN
           				</TableCell>

					   <TableCell align="center" colSpan={3}>
					   		VENTAS LEADS MES	
           				</TableCell>

						<TableCell align="center" colSpan={3}>
							EFECTIVIDAD MES	
           				</TableCell>
						
						<TableCell align="center" colSpan={3}>
							CPL	
           				</TableCell>

						<TableCell align="center" colSpan={3}>
							CPV TOTALES	
           				</TableCell>

						   <TableCell align="center" colSpan={3}>
							CPV MES	
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
							MERMA
           				</TableCell>

						   <TableCell align="center" colSpan={3}>
						   PRIORIDAD 1
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CP P1
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   TIEMPO P1
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   % CONV P1
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   ABIERTO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CALIFICADO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CONVERTIDO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   SOLO CONSULTA PRECIO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   COMPRA FUTURA
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CP ABIERTO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CP CALIFICADO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CP CONVERTIDO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CP SOLO PRECIO
           				</TableCell>
						   <TableCell align="center" colSpan={3}>
						   CP COMPRA FUTURA
           				</TableCell>
					</TableRow>

					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<TableCell align="right" 
									className="whitespace-no-wrap p-12"
								>
									{column.render('Header')}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<TableRow
								{...row.getRowProps()}
								// onClick={ev => onRowClick(ev, row)}
								className="truncate cursor-pointer"
							>
								{row.cells.map(cell => {
									return (
										<TableCell
											{...cell.getCellProps()}
											className={clsx('p-12', cell.column.className)}
										>
											{cell.render('Cell')}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
					<TableRow>
					
						<TableCell rowSpan={3} />
						<TableCell colSpan={2}>{total.length}</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					{/* <TableRow>
						<TablePagination
							classes={{
								root: 'overflow-hidden',
								spacer: 'w-0 max-w-0'
							}}
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
							colSpan={5}
							count={data.length}
							rowsPerPage={pageSize}
							page={pageIndex}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: false
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={ContactsTablePaginationActions}
						/>
					</TableRow> */}
				</TableFooter>
			</MaUTable>
		</TableContainer>
	);
};

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	total: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default EnhancedTable;
