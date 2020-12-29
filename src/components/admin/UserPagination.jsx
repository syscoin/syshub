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
  onSizeChange,
  changeFieldOrder,
  t
}) => {

  const getColumns = (t) => {
    return [
      {
        text: t("admin.users.table.email"),
        dataField: "email",
      },
      {
        text: t("admin.users.table.name"),
        dataField: "name",
      },
      {
        text: t("admin.users.table.admin"),
        dataField: "admin",
      },
      {
        text: t("admin.users.table.actions"),
        dataField: "actions",
        isDummyField: true,
        formatter: actionFormatter
      }
    ];
  };

  const actionFormatter = (cell, userRow) => {
    return <button onClick={() => makeUserAdmin(userRow)}>make admin</button>
  }

  const makeUserAdmin = (user) => {
    console.log({ user });
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
