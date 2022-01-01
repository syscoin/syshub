import React, {useState} from "react";
import DOMPurify from "dompurify";

import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";

//import for text editor
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from 'html-to-draftjs';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const schema = yup.object().shape({
    proposalUrl: yup.string().url("Must be a valid url"),
});


export function escape(unescaped) {
    return unescaped
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function unescape(escaped) {
    return escaped
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

/**
 * Component to show the Proposal description form
 * @component
 * @subcategory Proposal
 * @param {*} onNext function that gets executed after the form is submitted
 * @param {*} onBack function that gets executed to go back
 * @example
 * const onNext = () => {}
 * const onBack = () => {}
 * return (
 *  <DescriptionProposal onNext={onNext} onBack={onBack} />
 * )
 */
function DescriptionProposal({onNext, onBack}) {
    const [showEditor, setShowEditor] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [proposalDescription, setProposalDescription] = useState(
        EditorState.createEmpty()
    );

    const {register, handleSubmit, errors} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

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
     * goes back on the step of proposal creation but first hides the preview and shows the editor
     * @function
     */
    const backEditor = () => {
        if (showPreview) {
            setShowPreview(false);
        }
        if (!showEditor) {
            setShowEditor(true);
        }
        onBack();
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

    /**
     * goes next on the step of proposal creation but first hides the preview and shows the editor
     * @function
     * @param {{url: string}} data the data from the url input
     */
    const nextEditor = (data) => {
        if (showPreview) {
            setShowPreview(false);
        }
        if (!showEditor) {
            setShowEditor(true);
        }
        const descriptionRaw = draftToHtml(
            convertToRaw(proposalDescription.getCurrentContent())
        );

        onNext({proposalDescription: escape(descriptionRaw), ...data});
    };

    return (
        <form className="input-form" onSubmit={handleSubmit(nextEditor)}>
            <div className="form-group">
                {showEditor && (
                    <>
                        <Editor
                            editorState={proposalDescription}
                            onEditorStateChange={onEditorStageChange}
                            wrapperClassName="proposalEditor-wrapper article"
                            editorClassName="proposal-editor styled"
                            toolbar={{
                                options: ["inline", "list"],
                                inline: {
                                    options: ["bold", "italic", "underline", "monospace"],
                                    list: {
                                        options: ["unordered", "ordered"],
                                    },
                                },
                            }}
                            toolbarClassName="toolbarClassName"
                            toolbarStyle={{borderRadius: "3px", color: "#0f1f1f"}}
                            editorStyle={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                color: "#0f1f1f",
                                backgroundColor: "rgba(138, 196, 247, 0.322)",
                            }}
                        />
                        {editorEmpty(proposalDescription) && (
                            <small>
                                <p style={{lineHeight: "1.5"}}>The description is required</p>
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
                                    __html: DOMPurify.sanitize(
                                        draftToHtml(
                                            convertToRaw(proposalDescription.getCurrentContent())
                                        ),
                                        {ALLOWED_TAGS: ['p', '#text']}
                                    ),
                                }}
                                style={{margin: "0 10px"}}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="proposalUrl">URL</label>
                <input
                    type="url"
                    placeholder="https://support.syscoin.org/example-proposal"
                    className="styled"
                    name="proposalUrl"
                    id="proposalUrl"
                    ref={register}
                />
                <ErrorMessage
                    errors={errors}
                    name="proposalUrl"
                    render={({message}) => (
                        <small>
                            <p style={{lineHeight: "1.5"}}>{message}</p>
                        </small>
                    )}
                />
            </div>

            <div className="form-actions-spaced">
                <button
                    className="btn btn--blue-border"
                    type="button"
                    onClick={backEditor}
                >
                    Back
                </button>

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
                    disabled={editorEmpty(proposalDescription)}
                >
                    Next
                </button>
            </div>
        </form>
    );
}

export default DescriptionProposal;
