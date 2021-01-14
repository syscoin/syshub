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
import swal from 'sweetalert2'

import { deleteAdmin, getAllUsers, makeAdmin } from "../../utils/request";
import Title from "../global/Title";
import UserPagination from "./UserPagination";
import CustomModal from '../global/CustomModal';
import UsersAddModal from "./UsersAddModal";

/**
 * Component that shows the Users info and table inside admin section
 * @component
 * @subcategory Admin
 * @param {*} t t prop received from withTranslation
 * @example
 * return (
 *  <UsersTable />
 * )
 */
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

  /**
   * function that executes and change the position to scroll into the ref
   * @function
   */
  const executeScroll = () => scrollRef.current.scrollIntoView() 

  /**
   * function that load all the users from the API
   * @function
   */
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

  /**
   * UseEffect that loads the users
   * @function
   */
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /**
   * UseEffect that handles the mounting and unmounting and cancels requests
   * @function
   */
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cancelSource.cancel("The request has been canceled");
    };
  }, [cancelSource]);

  /**
   * function that handles the table changes and sets the current page
   * @function
   * @param {*} type 
   * @param {{number}} page current page in the table
   */
  const handleTableChange = (type, { page }) => {
    setCurrentPage(page);
    executeScroll();
  };

  /**
   * function that handles the user search
   * @param {{string}} searchValue value that is being searched
   */
  const doSearch = ({ searchValue }) => {
    setCurrentPage(1);
    setSearch(searchValue);
  };

  /**
   * function that handles the reset of the form 
   * @function
   */
  const doReset = () => {
    reset({ searchValue: "" });
    setCurrentPage(1);
    setSearch('');
  };

  /**
   * function that handles the action of giving admin privileges to an existing user
   * @function
   * @param {*} user data of the user that is going to be given privileges
   */
  const doAddAdmin = async (user) => {
    const result = await swal.fire({
      title: `Give admin privileges to ${user.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });
    if (result.isConfirmed) {
      swal.fire({
        title: 'Giving privileges, please wait',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      });
      try {
        await makeAdmin({ uid: user.uid, email: user.email });
        swal.fire({
          icon: 'success',
          title: `${user.email} is now an admin`,
          timer: 2500
        });
        loadUsers();
        executeScroll();
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'There was an error',
          text: error.message
        });
      }
    }
    
  }

  /**
   * function that handles the action of removing admin privileges to an existing user
   * @function
   * @param {*} user data of the user that is going to be removed privileges
   */
  const doRemoveAdmin = async (user) => {
    const result = await swal.fire({
      title: `Remove admin privileges of ${user.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
    });
    if (result.isConfirmed) {
      swal.fire({
        title: 'Removing please wait',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      });
      try {
        await deleteAdmin(user.uid);
        swal.fire({
          icon: 'success',
          title: 'The admin was removed',
          text: 'The user does not have admin privileges anymore',
          timer: 2500
        });
        loadUsers();
        executeScroll();
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'There was an error',
          text: error.message
        });
      }
    }
  }

  /**
   * function that handles the action of creating a new user with admin privileges
   * @function
   * @param {*} userData data of the user that is going to be created
   */
  const doAddNewAdmin = async (userData) => {
    swal.fire({
      title: 'Creating user, please wait',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    try {
      await makeAdmin({
        email: userData.email,
        name: userData.name,
        pwd: userData.password
      });
      swal.fire({
        icon: 'success',
        title: 'The user was created',
        text: `${userData.email} is an admin`,
        timer: 2500
      });
      
      loadUsers();
      executeScroll();
      setOpenModal(false);
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: error.message
      });
    }
  }

  return (
    <>
      <Title propsRef={scrollRef} heading={t('admin.heading')} />
      
      <form className="input-form" onSubmit={handleSubmit(doSearch)}>
        <div className="form-group">
          <label htmlFor="searchValue">{t("admin.users.label")}</label>
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
