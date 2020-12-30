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
  const [dataTable, setDataTable] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  
  
  const loadUsers = useCallback(async () => {
    try {
      const response = await getAllUsers(cancelSource.token);
      console.log(response)
      if (response.data) {
        console.log(response.data.users)
        await setDataTable(response.data.users);
        setTotalRecords(response.data.users.length);
        setCurrentData(response.data.users.slice(0, sizePerPage));
        setDataload(1);
      }
    } catch (error) {
      setDataload(2);
      // console.log(error);
    }
  }, [cancelSource, sizePerPage]);

  useEffect(() => {
    loadUsers()
    return () => {
      cancelSource.cancel('The request has been canceled')
      
    }
  }, [loadUsers, cancelSource]);

  

  const handleTableChange = (type, { page }) => {
    const index = (page - 1) * sizePerPage;
    setCurrentPage(page);
    setCurrentData(dataTable.slice(index, sizePerPage * page));
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
          data={currentData}
          page={currentPage}
          sizePerPage={sizePerPage}
          totalSize={totalRecords}
          onTableChange={handleTableChange}
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
