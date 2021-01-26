import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import axios from "axios";

//import for text editor
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { createFaq, getSingleFaq, updateFaq } from "../../utils/request";
import Title from "../global/Title";
import swal from "sweetalert2";

const schema = yup.object().shape({
  title: yup.string().required("The title is required"),
});

const FaqForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [proposalDescription, setProposalDescription] = useState(
    EditorState.createEmpty()
  );

  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { title: id ? "Loading..." : "" },
  });

  useEffect(() => {
    /**
     * function to get saved proposal from the API
     * @function
     */
    const getFAQ = async (uid) => {
      setLoading(true);
      try {
        let { data } = await getSingleFaq(uid, cancelSource.token).catch(
          (err) => {
            throw err;
          }
        );
        // console.log(data);
        if (data.fq) {
          if (isMounted.current) {
            const blocksFromHtml = htmlToDraft(data.fq.description);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
              contentBlocks,
              entityMap
            );
            setProposalDescription(EditorState.createWithContent(contentState));
            setValue("title", data.fq.title, { shouldValidate: true });
            setLoading(false);
          }
        }
      } catch (error) {
        // console.log(error)
        if (isMounted.current) {
          setLoading(false);
          setFetchError(true);
          setValue("title", "", { shouldValidate: true });
        }
        if (error.response) {
          if (error.response?.status >= 400 && error.response?.status <= 500) {
            history.push("/404");
            return;
          }
        }

        await swal.fire({
          icon: "error",
          title: "There was an error",
          text: error.response?.data?.message,
          footer: error.message,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };
    isMounted.current = true;
    if (id) {
      getFAQ(id);
    }

    return () => {
      cancelSource.cancel("The request has been canceled");
      isMounted.current = false;
    };
  }, [id, cancelSource, setValue, history]);

  /**
   * shows the description editor
   * @function
   * @param {*} editorState the editor state
   */
  const onEditorStageChange = (editorState) => {
    setShowEditor(true);
    setProposalDescription(editorState);
  };

  /**
   * checks if the editor is empty
   * @function
   * @param {*} editor the editor received to check if it's empty
   * @returns {boolean}
   */
  const editorEmpty = (editor) => {
    const editorRaw = convertToRaw(editor.getCurrentContent());
    if (editorRaw.blocks[0].text.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const submit = async ({ title }) => {
    const descriptionRaw = draftToHtml(
      convertToRaw(proposalDescription.getCurrentContent())
    );
    if (id) {
      update({
        title,
        description: descriptionRaw
      });
    } else {
      create({
        title,
        description: descriptionRaw
      });
    }
  };
  const update = async (faq) => { 
    swal.fire({
      title: "Updating question please wait",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      }
    });
    try {
      await updateFaq(id, {
        data: faq
      });
      await swal.fire({
        icon: "success",
        title: "The question has been updated",
        timer: 2500,
        showConfirmButton: false,
      });
      history.push('/admin');
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "There was an error",
        text: error.response?.data?.message,
        footer: error.message
      });
    }

  }
  
  const create = async (data) => {
    swal.fire({
      title: "Adding question please wait",
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading();
      }
    });

    try {
      await createFaq(data);
      await swal.fire({
        icon: "success",
        title: "The question has been created",
        timer: 2500,
        showConfirmButton: false,
      });
      history.push('/admin');
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "There was an error",
        text: error.response?.data?.message,
        footer: error.message
      });
    }
  }

  return (
    <>
      {id ? (
        <Title heading={t("admin.faqs.updateFaq.title")} />
      ) : (
        <Title heading={t("admin.faqs.newFaq.title")} />
      )}

      <form className="input-form" onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <label htmlFor="title-faq">Title</label>
          <input
            type="text"
            className="styled"
            name="title"
            id="title-faq"
            ref={register}
            disabled={loading || fetchError}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <small>
                <p style={{ lineHeight: "1.5" }}>{message}</p>
              </small>
            )}
          />
        </div>
        <div className="form-group">
          {showEditor && (
            <>
              <Editor
                editorState={proposalDescription}
                onEditorStateChange={onEditorStageChange}
                wrapperClassName="proposalEditor-wrapper article"
                editorClassName="faq-editor styled"
                toolbar={{
                  options: ["inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "image",
                    "emoji",
                    "history",
                    "list"],
                  // inline: {
                  //   options: ["bold", "italic", "underline", "monospace"],
                  //   list: {
                  //     options: ["unordered", "ordered"],
                  //   },
                }}
                toolbarClassName="toolbarClassName"
                toolbarStyle={{ borderRadius: "3px" }}
                editorStyle={{ paddingTop: 0, paddingBottom: 0 }}
              />
              {editorEmpty(proposalDescription) && (
                <small>
                  <p style={{ lineHeight: "1.5" }}>The answer is required</p>
                </small>
              )}
            </>
          )}

          {showPreview && (
            <div className="proposals">
              <div className="proposal">
                <div
                  className="proposalContent-div"
                  id="preview-html-container"
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(
                      convertToRaw(proposalDescription.getCurrentContent())
                    ),
                  }}
                  style={{ margin: "0 10px" }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="form-actions-spaced">
          {showEditor && (
            <button
              className="btn btn--blue-border"
              onClick={() => {
                setShowPreview(true);
                setShowEditor(false);
              }}
            >
              Preview
            </button>
          )}
          {showPreview && (
            <button
              className="btn btn--blue-border"
              onClick={() => {
                setShowPreview(false);
                setShowEditor(true);
              }}
            >
              Editor
            </button>
          )}

          <button
            className="btn btn--blue"
            type="submit"
            disabled={editorEmpty(proposalDescription) || loading || fetchError}
          >
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FaqForm;
