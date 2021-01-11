import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { deleteAdmin, getAllUsers, makeAdmin } from "../../utils/request";
import Title from "../global/Title";
import UserPagination from "./UserPagination";
import CustomModal from '../global/CustomModal';
import UsersAddModal from "./UsersAddModal";


const UsersTable = ({ t }) => {
  const [dataload, setDataload] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const scrollRef = useRef(null);
  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const { register, handleSubmit, reset } = useForm();

  const executeScroll = () => scrollRef.current.scrollIntoView() 

  const loadUsers = useCallback(async () => {
    setDataload(0);
    try {
      const response = await getAllUsers(
        currentPage,
        search,
        cancelSource.token
      );
      console.log(response);
      if (response.data) {
        console.log(response.data.users);
        if (isMounted.current) {
          setDataTable(response.data.users);
          setSizePerPage(response.data.pageSize);
          (response.data.users.length === 0) && setTotalRecords(0);
          (response.data.users.length > 0) && setTotalRecords(response.data.totalRecords);
  
          setDataload(1);
        }
      }
    } catch (error) {
      isMounted.current && setDataload(2);
      console.log(error);
    }
  }, [currentPage, search, cancelSource]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cancelSource.cancel("The request has been canceled");
    };
  }, [cancelSource]);

  const handleTableChange = (type, { page }) => {
    setCurrentPage(page);
    executeScroll();
  };

  const doSearch = ({ searchValue }) => {
    setCurrentPage(1);
    setSearch(searchValue);
  };

  const doReset = () => {
    reset({ searchValue: "" });
    setCurrentPage(1);
    setSearch('');
  };

  const doAddAdmin = async (user) => {
    console.log('add', user);
    await makeAdmin({ uid: user.uid, email: user.email });
    loadUsers();
    executeScroll();
  }

  const doRemoveAdmin = async (user) => {
    console.log('remove admin', user);
    await deleteAdmin(user.uid);
    loadUsers();
    executeScroll();

  }

  const doAddNewAdmin = async (userData) => {
    console.log('add new admin', userData);
    await makeAdmin({
      email: userData.email,
      name: userData.name,
      pwd: userData.password
    });
    loadUsers();
    executeScroll();
    setOpenModal(false);
  }

  return (
    <>
      <Title propsRef={scrollRef} heading={t('admin.heading')} />
      
      <form className="input-form" onSubmit={handleSubmit(doSearch)}>
        <div className="form-group">
          <label>{t("admin.users.label")}</label>
          <br />
          <input
            id="searchValue"
            type="text"
            name="searchValue"
            ref={register}
            className="styled"
            placeholder={t("admin.users.placeholder")}
          />

          <div className="btn-group text-center" style={{ marginTop: "20px" }}>
            <button
              type="reset"
              className="btn btn--blue-border"
              onClick={doReset}
            >
              Clear
            </button>
            <button type="submit" className="btn btn--blue">
              Search
            </button>
            <button type="button" className="btn btn--blue" onClick={() => setOpenModal(true)}>
              Add new user
            </button>
          </div>
        </div>
      </form>

      {dataload === 1 ? (
        <UserPagination
          data={dataTable}
          page={currentPage}
          sizePerPage={sizePerPage}
          totalSize={totalRecords}
          onTableChange={handleTableChange}
          onAddAdmin={doAddAdmin}
          onRemoveAdmin={doRemoveAdmin}
          t={t}
        />
      ) : dataload === 0 ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <p className="text-center">The data couldn't be fetched</p>
      )}
      
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <UsersAddModal onAddAdmin={doAddNewAdmin} />
      </CustomModal>
    </>
  );
};

export default withTranslation()(UsersTable);
