import React, { useEffect } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { connect } from 'react-redux';

import * as CustomerActions from '../../../framework/redux/modules/Users';
import Locations from '../../../Locations';
import { withSecureLayout } from '../../layout/SecureLayout';
import { withSecurity } from '../../routing/SecureRoutes';

const styles = {
	actionsColumn: { textAlign: 'center', width: '10em' },
	viewButton: { marginRight: '.3em' },
};

const UserList = ({ dispatch, user, history }) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		dispatch(CustomerActions.list());
	}, [dispatch]);

	const viewCustomer = entityId => () => {
		history.push(Locations.UserEdit.toUrl({ type: 'view', entityId: entityId }));
	};

	const editCustomer = entityId => () => {
		history.push(Locations.UserEdit.toUrl({ type: 'edit', entityId: entityId }));
	};

	const deleteCustomer = entityId => () => {
		dispatch(CustomerActions.remove(entityId))
	}

	const newCustomer = () => {
		history.push(Locations.UserNew.toUrl({ type: 'new' }));
	};

	const clickUserRole = () => {
		dispatch(CustomerActions.clickUserRole())
	}

	const clickAdminRole = () => {
		dispatch(CustomerActions.clickAdminRole())
	}

	const actionButtons = (rowData) => {
		return (
			<div>
				<Button type="button" tooltip="View" icon="pi pi-search" style={styles.viewButton} onClick={viewCustomer(rowData.entityId)} />
				<Button type="button" tooltip="Edit" icon="pi pi-pencil" style={styles.viewButton} onClick={editCustomer(rowData.entityId)} />
				<Button type="button" tooltip="Delete" icon="pi pi-trash" onClick={deleteCustomer(rowData.entityId)} />
			</div>
		);
	};

	return (
		<div className="p-grid">
			<div className="p-col-12">
				<div className="card card-w-title">
					<h1>DataTable</h1>
					<h4><Button type="button" label="Add User" icon="pi pi-plus" onClick={newCustomer} /></h4>
					<DataTable
						value={user.list}
						rows={5}
						paginatorPosition="both"
						paginator
						responsive
						autoLayout
					>
						<Column field="entityId" header="ID" sortable={true} />
						<Column field="name" header="Name" sortable={true} />
						<Column field="age" header="Age" sortable={true} />
						<Column field="email" header="Email" sortable={true} />
						<Column body={actionButtons} style={styles.actionsColumn} />
					</DataTable>
				</div>
			</div>
			<div>
				<h2>Role Base Actions</h2>
				<Button type="button" label="Role User" onClick={clickUserRole}></Button>&nbsp;
				<Button type="button" label="Role Admin" onClick={clickAdminRole}></Button>
			</div>
		</div>
	);
};

export default connect(state => ({
	user: state.user,
	page: state.page
}))(withSecurity(withSecureLayout(UserList)));