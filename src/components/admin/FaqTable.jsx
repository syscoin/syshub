import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import swal from "sweetalert2";

import { getAllFaqs, deleteFaq } from "../../utils/request";
import SubTitle from "../global/SubTitle";
import FaqPagination from "./FaqPagination";
import { Link, useRouteMatch } from "react-router-dom";

/**
 * Component that shows the F.A.Q. info and table inside admin section
 * @component
 * @subcategory admin
 * @param {*} t t prop received from withTranslation
 * @example
 * return (
 *  <FaqTable />
 * )
 */
const FaqTable = ({ t }) => {
  let { path } = useRouteMatch();
  const [dataload, setDataload] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const scrollRef = useRef(null);
  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  /**
   * function that executes and change the position to scroll into the ref
   * @function
   */
  const executeScroll = () => scrollRef.current.scrollIntoView();

  /**
   * function that load all the questions from the API
   * @function
   */
  const loadQuestions = useCallback(async () => {
    setDataload(0);
    try {
      const response = await getAllFaqs(currentPage, cancelSource.token);
      // console.log(response);
      if (response.data.faqs) {
        if (isMounted.current) {
          setDataTable(response.data.faqs);
          setSizePerPage(response.data.pageSize);
          setTotalRecords(response.data.totalRecords);

          setDataload(1);
        }
      }
    } catch (error) {
      isMounted.current && setDataload(2);
      // console.log(error);
    }
  }, [currentPage, cancelSource]);

  /**
   * UseEffect that loads the questions
   * @function
   */
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

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
   * function to delete a faq
   * @param {object} faq the data of the faq to delete
   */
  const doDeleteFaq = async (faq) => {
    const result = await swal.fire({
      title: `You will remove the question`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
    });
    if (result.isConfirmed) {
      swal.fire({
        title: "Deleting question please wait",
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading();
        },
      });
      try {
        await deleteFaq(faq.uid);
        swal.fire({
          icon: "success",
          title: "The question has been deleted",
          timer: 2500,
        });
        loadQuestions();
        executeScroll();
      } catch (error) {
        swal.fire({
          icon: "error",
          title: "There was an error",
          text: error.message,
        });
      }
    }
  };

  return (
    <>
      <SubTitle propsRef={scrollRef} heading={t("admin.faqs.heading")} />
      <div className="text-center">
        <Link to={`${path}/faq`} className="btn btn--blue">
          Add new question
        </Link>
      </div>

      {dataload === 1 ? (
        dataTable.length === 0 ? (
          <p className="text-center">There are no questions.</p>
        ) : (
          <FaqPagination
            data={dataTable}
            page={currentPage}
            sizePerPage={sizePerPage}
            totalSize={totalRecords}
            onTableChange={handleTableChange}
            onDeleteFaq={doDeleteFaq}
            t={t}
            path={path}
          />
        )
      ) : dataload === 0 ? (
        <p className="text-center">{t("admin.faqs.loading")}</p>
      ) : (
        <p className="text-center">The data couldn't be fetched.</p>
      )}
    </>
  );
};

export default withTranslation()(FaqTable);
