import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import UserPagination from "./UserPagination";

const userArray = [
  {name: 'asd', email: 'example1@example.com', admin: 'no'},
  {name: 'asd', email: 'example2@example.com', admin: 'no'},
  {name: 'asd', email: 'example3@example.com', admin: 'no'}
];

const UsersTable = ({t}) => {
  const [dataload, setDataload] = useState(false);
  const [dataTable, setDataTable] = useState(userArray);
  const [page, setPage] = useState(0);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);


  const handleTableChange = () => {

  }


  if (!dataload) {
    return (
      <>
        <form className="input-form">
          <div className="form-group">
            <label>{t('admin.users.label')}</label>
            <br/>
            <input
              id="srcVal"
              type="text"
              className="styled"
              placeholder={t('admin.users.placeholder')}
              // onKeyUp={this.searchInTable}
            />

            <button
              type="button"
              className="btn btn--blue"
              style={{
                margin: "20px auto",
                width: "150px",
                display: "block",
              }}
            >
              Search
            </button>
          </div>
        </form>
        

        <UserPagination
          data={dataTable}
          page={page}
          sizePerPage={sizePerPage}
          totalSize={totalRecords}
          onTableChange={handleTableChange}
          // onSizeChange={this.onSizeChange}
          // changeFieldOrder={this.changeFieldOrder}
          t={t}
        />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default withTranslation()(UsersTable);
