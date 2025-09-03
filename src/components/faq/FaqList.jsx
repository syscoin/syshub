import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { getPublicFaqs } from "../../utils/request";
import FaqItem from "./FaqItem";

/**
 * Component that shows the F.A.Q. List
 * @component
 * @subcategory FAQ
 * @example
 * return (
 *  <FaqList />
 * )
 */
const FaqList = () => {
  const { t } = useTranslation();
  const [dataload, setDataload] = useState(0);
  const [faqList, setFaqList] = useState([]);

  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  
  const loadQuestions = useCallback(async () => {
    setDataload(0);
    try {
      const response = await getPublicFaqs(cancelSource.token);
      if (response.data.faqs) {
        if (isMounted.current) {
          setFaqList(response.data.faqs);

          setDataload(1);
        }
      }
    } catch (error) {
      isMounted.current && setDataload(2);
    }
  }, [cancelSource]);

  
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cancelSource.cancel("The request has been canceled");
    };
  }, [cancelSource]);

  return (
    <div className="input-form">
      {dataload === 1 ? (
        faqList.length === 0 ? (
          <p className="text-center">There are no questions.</p>
        ) : (
          faqList.map((faq, index) => <FaqItem faq={faq} key={faq.title} index={++index} />)
        )
      ) : dataload === 0 ? (
        <p className="text-center">{t("admin.faqs.loading")}</p>
      ) : (
        <p className="text-center">The data couldn't be fetched.</p>
      )}
    </div>
  );
};

export default FaqList;
