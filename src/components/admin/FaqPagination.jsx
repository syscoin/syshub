import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";


/**
 * Component that renders the pagination of the FAQ table
 * @component
 * @subcategory admin
 * @param {*} props the props sent by its father
 * @example
 * return (
 *  <FaqPagination  />
 * )
 */
const FaqPagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  onUpdateFaq,
  onDeleteFaq,
  t,
  path
}) => {

  const getColumns = () => {
    return [
      {
        text: t("admin.faqs.table.title"),
        dataField: "title",
      },
      {
        text: t("admin.faqs.table.creation"),
        dataField: "created_at",
        align: 'center',
        formatter: proposalDateFormatter
      },
      {
        text: t("admin.faqs.table.update"),
        dataField: "updated_at",
        align: 'center',
        formatter: proposalDateFormatter
      },
      {
        text: t("admin.faqs.table.actions"),
        dataField: "actions",
        isDummyField: true,
        align: 'center',
        formatter: actionsFormatter
      }
    ];
  };



  const actionsFormatter = (cell, faqRow) => {
    return (
      <>
        <button
          style={{
            background: '#1e255f29',
            lineHeight: '40px',
            textAlign: 'center',
            marginRight: '5px',
            border: '0',
            padding: '0 5px'
          }}
        >
          <Link
            style={{textDecoration: 'none'}}
            to={`${path}/faq/${faqRow.uid}`}
          >
            Update
          </Link>
        </button>
        <button
          className=""
          style={{
            background: '#1e255f29',
            lineHeight: '40px',
            textAlign: 'center',
            marginLeft: '5px',
            border: '0',
            padding: '0 5px'
          }}
          onClick={() => onDeleteFaq(faqRow)}
        >
          Delete
        </button>
      </>
    )
  }


  /**
   * Function that returns a date in human format using the unix timestamps
   * @function
   * @param {number} creationTime number with a unix timestamp
   */
  function proposalDateFormatter(creationTime) {
    if (creationTime) {
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
    else {
      return 'No update'
    }
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
              columns={getColumns()}
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
export default FaqPagination;
