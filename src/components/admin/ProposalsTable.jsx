import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import axios from "axios";
import {withTranslation} from "react-i18next";
import swal from 'sweetalert2';
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";

import {createHiddenProposal, deleteHiddenProposal, getAllHiddenProposals} from "../../utils/request";
import ProposalPagination from "./ProposalPagination";
import SubTitle from "../global/SubTitle";

const schema = yup.object().shape({
  proposalHash: yup.string()
    .test('len', 'Proposal hash has to be 64 characters', val => val.length === 64)
    .required("Proposal hash is required")
});

/**
 * Component that shows the hidden proposals info and table inside admin section
 * @component
 * @subcategory admin
 * @param {*} t t prop received from withTranslation
 * @example
 * return (
 *  <ProposalsTable />
 * )
 */
const ProposalsTable = ({t}) => {
  const [dataload, setDataload] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const scrollRef = useRef(null);
  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const {register, handleSubmit, errors, reset} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  /**
   * function that executes and change the position to scroll into the ref
   * @function
   */
  const executeScroll = () => scrollRef.current.scrollIntoView();

  /**
   * function that load all the hidden proposals from the API
   * @function
   */
  const loadProposals = useCallback(async () => {
    setDataload(0);
    try {
      const response = await getAllHiddenProposals(
        currentPage,
        cancelSource.token
      );
      if (response.data.proposalHash) {
        if (isMounted.current) {
          setDataTable(response.data.proposalHash);
          setSizePerPage(response.data.pageSize);
          setTotalRecords(response.data.totalRecords);

          setDataload(1);
        }
      }
    } catch (error) {
      isMounted.current && setDataload(2);
    }
  }, [currentPage, cancelSource]);

  /**
   * UseEffect that loads the hidden proposals
   * @function
   */
  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

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
  const handleTableChange = (type, {page}) => {
    setCurrentPage(page);
    executeScroll();
  };

  /**
   * function to hide a proposal
   * @param {string} proposalHash the hash of the proposal to hide
   */
  const doHideProposal = async ({proposalHash}) => {
    swal.fire({
      title: 'Hiding proposal, please wait',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    await createHiddenProposal({hash: proposalHash})
      .then(() => {
        swal.fire({
          icon: 'success',
          title: 'The proposal is hidden',
          timer: 2800
        });
        reset({proposalHash: ''});
        loadProposals();
        executeScroll();

      })
      .catch(err => {
        if (err.response.status === 406) {
          swal.fire({
            icon: 'info',
            title: 'information',
            text: err.response.data.message,
            timer: 2500
          });
          reset({proposalHash: ''});
          loadProposals();
          executeScroll();
        } else {
          swal.fire({
            icon: 'error',
            title: 'There was an error',
            text: err.message
          });
        }
      })

  };

  /**
   * function to show a proposal
   * @param {object} proposal the data of the proposal to show
   */
  const doShowProposal = async (proposal) => {
    const result = await swal.fire({
      title: `You will show this proposal on the app again`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, show it',
    });
    if (result.isConfirmed) {
      swal.fire({
        title: 'Showing proposal please wait',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      });
      try {
        await deleteHiddenProposal(proposal.hash);
        swal.fire({
          icon: 'success',
          title: 'The proposal is now showing',
          timer: 2500
        });
        loadProposals();
        executeScroll();
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'There was an error',
          text: error.message
        });
      }
    }
  };

  return (
    <>
      <SubTitle propsRef={scrollRef} heading={t("admin.proposals.heading")}/>

      <form className="input-form" onSubmit={handleSubmit(doHideProposal)}>
        <div className="form-group">
          <label htmlFor="proposalHash">{t("admin.proposals.label")}</label>
          <br/>

          <input
            id="proposalHash"
            type="text"
            name="proposalHash"
            ref={register}
            className="styled"
            placeholder={t("admin.proposals.placeholder")}
          />
          <ErrorMessage
            errors={errors}
            name="proposalHash"
            render={({message}) => (
              <small>
                <p style={{lineHeight: "1.5"}}>{message}</p>
              </small>
            )}
          />
        </div>
        <div className="btn-group text-center" style={{marginTop: "20px"}}>
          <button type="submit" className="btn btn--blue">
            Hide
          </button>
        </div>
      </form>

      {dataload === 1 ? (
        dataTable.length === 0 ? (
          <p className="text-center">There are no hidden proposals.</p>
        ) : (
          <ProposalPagination
            data={dataTable}
            page={currentPage}
            sizePerPage={sizePerPage}
            totalSize={totalRecords}
            onTableChange={handleTableChange}
            onShowProposal={doShowProposal}
            t={t}
          />
        )
      ) : dataload === 0 ? (
        <p className="text-center">Loading hidden proposals...</p>
      ) : (
        <p className="text-center">The data couldn't be fetched.</p>
      )}
    </>
  );
};

export default withTranslation()(ProposalsTable);
