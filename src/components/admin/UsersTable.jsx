import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";

import { getAllUsers } from "../../utils/request";

import UserPagination from "./UserPagination";

const userArray = [
  {name: 'asd', email: 'example1@example.com', admin: 'no'},
  {name: 'asd', email: 'example2@example.com', admin: 'no'},
  {name: 'asd', email: 'example3@example.com', admin: 'no'}
];

const UsersTable = ({t}) => {
  const [dataload, setDataload] = useState(0);
  const [dataTable, setDataTable] = useState(userArray);
  const [page, setPage] = useState(0);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const loadUsers = useCallback(async () => {
    try {
      const response = await getAllUsers(cancelSource.token);
      console.log(response)
      if (response.data) {
        console.log(response.data)
        await setDataTable(response.data.users);
        setTotalRecords(response.data.users.length);
        setDataload(1);
      }
    } catch (error) {
      setDataload(2);
      // console.log(error);
    }
  }, [cancelSource]);

  useEffect(() => {
    loadUsers()
    return () => {
      cancelSource.cancel('The request has been canceled')
      
    }
  }, [loadUsers, cancelSource]);

  const handleTableChange = () => {

  }


  if (dataload === 1) {
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
  } else if(dataload === 0){
    return <p>Loading...</p>;
  }
  else {
    return <p>The data couldn't be fetched</p>
  }
};

export default withTranslation()(UsersTable);
