import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


/**
 * Component that renders the pagination of the proposals or users table
 * @component
 * @subcategory masternodes
 * @param {*} props the props sent by its father
 * @example
 * return (
 *  <UserPagination  />
 * )
 */

const UserPagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  t
}) => {

  const getColumns = (t) => {
    return [
      {
        text: t("admin.users.table.email"),
        dataField: "email",
      },
      {
        text: t("admin.users.table.admin"),
        dataField: "admin",
        align: 'center',
        formatter: adminFormatter
      },
      {
        text: t("admin.users.table.actions"),
        dataField: "actions",
        isDummyField: true,
        align: 'center',
        formatter: actionsFormatter
      }
    ];
  };

  const adminFormatter = (cell, userRow) => {
    const isAdmin = userRow.role.find(role => role === 'admin');

    if (isAdmin === 'admin') {
      return 'Admin'
    }
    else {
      return 'Not admin'
    }
    
  }

  const actionsFormatter = (cell, userRow) => {
    const isAdmin = userRow.role.find(role => role === 'admin');

    if (isAdmin === 'admin') {
      return (
        <button
          className=""
          style={{
            background: '#1e255f29',
            lineHeight: '40px',
            textAlign: 'center',
            border: '0',
            padding: '0 5px'
          }}
          onClick={() => removeUserAdmin(userRow)}
        >
          Remove admin
        </button>
      )
    }
    else {
      return (
        <button
          className=""
          style={{
            background: '#1e255f29',
            lineHeight: '40px',
            textAlign: 'center',
            border: '0',
            padding: '0 5px'
          }}
          onClick={() => makeUserAdmin(userRow)}
        >
          Add admin
        </button>
      )
    }
  }

  const removeUserAdmin = (user) => {

  }

  const makeUserAdmin = (user) => {
    console.log(user);
  }

  return (
    <div>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page,
          sizePerPage,
          totalSize,
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <BootstrapTable
              remote
              keyField="email"
              data={data}
              columns={getColumns(t)}
              onTableChange={onTableChange}
              {...paginationTableProps}
            />
            
            <PaginationListStandalone {...paginationProps} />
          </div>
        )}
      </PaginationProvider>
    </div>
  );
}
export default UserPagination;
