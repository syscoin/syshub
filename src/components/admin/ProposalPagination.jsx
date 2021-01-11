import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


/**
 * Component that renders the pagination of the proposals table
 * @component
 * @subcategory masternodes
 * @param {*} props the props sent by its father
 * @example
 * return (
 *  <ProposalPagination  />
 * )
 */

const ProposalPagination = ({
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
        text: t("admin.proposals.table.hash"),
        dataField: "hash",
      },
      {
        text: t("admin.proposals.table.creation"),
        dataField: "createTime",
        align: 'center',
        formatter: proposalDateFormatter
      },
      {
        text: t("admin.proposals.table.actions"),
        dataField: "actions",
        isDummyField: true,
        align: 'center',
        formatter: actionsFormatter
      }
    ];
  };



  const actionsFormatter = (cell, proposalRow) => {
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
        onClick={() => showProposal(proposalRow)}
      >
        Show proposal
      </button>
    )
  }

  const showProposal = (proposalRow) => {
    console.log(proposalRow);
  }

  /**
   * Function that returns a date in human format using the unix timestamps
   * @function
   * @param {number} creationTime number with a unix timestamp
   */
  function proposalDateFormatter(creationTime) {
    let unixTimestamp = creationTime;
    let milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = (
      dateObject.getDate() +
      "-" +
      (dateObject.getMonth() + 1) +
      "-" +
      dateObject.getFullYear()
    );
    return humanDateFormat;
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
              keyField="uid"
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
export default ProposalPagination;
