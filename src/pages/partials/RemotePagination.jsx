import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


const getColumns = (t) => {
  return [
    {
      text: t("check.table.address"),
      dataField: "address",
    },
    {
      text: t("check.table.protocol"),
      dataField: "protocol",
    },
    {
      text: t("check.table.status"),
      dataField: "status",
    },
    {
      text: t("check.table.payee"),
      dataField: "payee",
    },
    {
      text: t("check.table.lastpaidtime"),
      dataField: "lastpaidtime",
    },
    {
      text: t("check.table.activeseconds"),
      dataField: "activeseconds",
    },
    {
      text: t("check.table.lastseen"),
      dataField: "lastseen",
    },
  ];
};

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  onSizeChange,
  changeFieldOrder,
  t,
  simple
}) => (
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
            keyField="address"
            data={data}
            columns={getColumns(t)}
            onTableChange={onTableChange}
            {...paginationTableProps}
          />
          
          { !simple && <PaginationListStandalone {...paginationProps} /> }
        </div>
      )}
    </PaginationProvider>
  </div>
);

export default RemotePagination;