import React, {useState} from "react";
import {Collapse} from "react-collapse";

/**
 * Component that shows the F.A.Q. item inside the faq list
 * @component
 * @subcategory FAQ
 * @param {Object} faq the question to show
 * @param {Object} index the index of the question to show
 * @example
 * const faq = {};
 * const index = 0;
 * return (
 *  <FaqItem faq={faq} index={index} />
 * )
 */
const FaqItem = ({faq, index}) => {
  const [isActive, setIsActive] = useState(false);
  // const re = new RegExp('target="_blank"', 'gmi');

  /* TODO */
  /*
  * the text editor for creating the FAQ does not add the rel = "noopener"
  therefore DOMPurify.sanitize (faq.description) removes the target = "_ blank" from the images
  * function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };

  const assignText = faq.description.split(' ').filter((e) => {
    if (re.exec(e)) {
      let j=array_move(e.split('>').concat('rel="noopener"'), 2, 1)
      return j.join('>').replace('/>/',' ')
    }else{
      return e;
    }
  });
  * */

  const toggleActive = () => setIsActive(!isActive);

  return (
    <div className="faq-item">
      <div
        className="wizard-head"
        style={{cursor: "pointer"}}
        onClick={toggleActive}
      >
        <span>{index}</span>
        {faq.title}
      </div>
      <Collapse
        theme={{
          collapse: "ReactCollapse--collapse",
          content: "ReactCollapse--content wizard-body",
        }}
        isOpened={isActive}
        initialStyle={{height: 0, overflow: "hidden"}}
      >
        <article
          className="answer-container"
          style={{
            width: "100%",
            padding: "20px",
            background: "#ffffff1f",
            borderRadius: "3px",
            WebkitBorderRadius: "3px",
            MozBorderRadius: "3px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{margin: "0 20px"}}
            dangerouslySetInnerHTML={{
              __html: faq.description,
            }}
          ></div>
        </article>
      </Collapse>
    </div>
  );
};

export default FaqItem;
