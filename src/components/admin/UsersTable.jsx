import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import {useForm} from "react-hook-form";

import { getAllUsers } from "../../utils/request";
import UserPagination from "./UserPagination";


const UsersTable = ({t}) => {
  const [dataload, setDataload] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const {register, handleSubmit, reset} = useForm();
  
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

  const doSearch = ({searchValue}) => {
    // console.log(searchValue);
    setCurrentPage(1);
    let filteredArray = dataTable.filter(element => element.email.includes(searchValue.toLowerCase()));
    console.log(filteredArray)
    setCurrentData(filteredArray)
  }

  const doReset = () => {
    reset({ searchValue: '' });
    setCurrentPage(1);
    setCurrentData(dataTable.slice(0, sizePerPage));
  }

  if (dataload === 1) {
    return (
      <>
        <form className="input-form" onSubmit={handleSubmit(doSearch)}>
          <div className="form-group">
            <label>{t('admin.users.label')}</label>
            <br/>
            <input
              id="searchValue"
              type="text"
              name="searchValue"
              ref={register}
              className="styled"
              placeholder={t('admin.users.placeholder')}
            />

            <div className="btn-group text-center" style={{marginTop: '20px'}}>
              <button type="submit" className="btn btn--blue">
                Search
              </button>
              <button
                type="reset"
                className="btn btn--blue-border"
                onClick={doReset}
              >
                Clear
              </button>
            </div>
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
    return <p className="text-center">Loading...</p>;
  }
  else {
    return <p className="text-center">The data couldn't be fetched</p>
  }
};

export default withTranslation()(UsersTable);
