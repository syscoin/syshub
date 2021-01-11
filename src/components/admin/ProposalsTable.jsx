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

import { getAllHiddenProposals } from "../../utils/request";
import ProposalPagination from "./ProposalPagination";
import SubTitle from "../global/SubTitle";

const ProposalsTable = ({ t }) => {
  const [dataload, setDataload] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const scrollRef = useRef(null);
  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const { register, handleSubmit } = useForm();

  const executeScroll = () => scrollRef.current.scrollIntoView() 

  const loadProposals = useCallback(async () => {
    setDataload(0);
    try {
      const response = await getAllHiddenProposals(
        currentPage,
        cancelSource.token
      );
      console.log(response);
      if (response.data.proposalHash) {
        isMounted.current && setDataTable(response.data.proposalHash);
        isMounted.current && setSizePerPage(response.data.pageSize);
        isMounted.current && setTotalRecords(response.data.totalRecords);

        isMounted.current && setDataload(1);
      }
    } catch (error) {
      isMounted.current && setDataload(2);
      console.log(error);
    }
  }, [currentPage, cancelSource]);

  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

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

  const doAddProposal = (data) => {};

  return (
    <>
      <SubTitle propsRef={scrollRef} heading={t('admin.proposals.heading')} />
      
      <form className="input-form" onSubmit={handleSubmit(doAddProposal)}>
        <div className="form-group">
          <label>{t("admin.proposals.label")}</label>
          <br />
          <input
            id="searchValue"
            type="text"
            name="searchValue"
            ref={register}
            className="styled"
            placeholder={t("admin.proposals.placeholder")}
          />

          <div className="btn-group text-center" style={{ marginTop: "20px" }}>
            <button type="submit" className="btn btn--blue">
              Add
            </button>
          </div>
        </div>
      </form>

      {dataload === 1 ? (
        <ProposalPagination
          data={dataTable}
          page={currentPage}
          sizePerPage={sizePerPage}
          totalSize={totalRecords}
          onTableChange={handleTableChange}
          t={t}
        />
      ) : dataload === 0 ? (
        <p className="text-center">Loading hidden proposals...</p>
      ) : (
        <p className="text-center">The data couldn't be fetched</p>
      )}
    </>
  );
};

export default withTranslation()(ProposalsTable);
