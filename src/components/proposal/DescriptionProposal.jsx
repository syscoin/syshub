import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";

//import for text editor
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const schema = yup.object().shape({
  proposalDescription: yup.string().required('The proposal description is required.')
});

export default function DescriptionProposal({onNext, onBack}) {
  // const editorState = EditorState.createEmpty();
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [proposalDescription, setProposalDescription] = useState('');
  const {register, watch, handleSubmit, setValue, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      proposalDescription: proposalDescription
    }
  });

  useEffect(() => {
    if (!showEditor) {
      let previewContainer = document.getElementById('preview-html-container');
      previewContainer.innerHTML = draftToHtml(convertToRaw(proposalDescription.getCurrentContent()))
    }
  }, [showEditor])

  const onEditorStageChange = (editorState) => {
    setShowEditor(true)
    setProposalDescription(editorState)
  }

  const st = {background: "#fff"}
  return (
    <form className="input-form" onSubmit={handleSubmit(onNext)}>
      <div className="form-group">

        {showEditor ? (
          <>
            <button
              className="btn btn--blue-border"
              onClick={() => {
                console.log('entro aqui')
                setShowPreview(true);
                setShowEditor(false);
              }}>
              Preview
            </button>
            <Editor
              editorState={proposalDescription}
              onEditorStateChange={onEditorStageChange}
              toolbarClassName="toolbarClassName"
              wrapperClassName="proposalEditor-wrapper"
              editorClassName="proposal-editor"
              toolbar={{
                options: ['inline', 'list'],
                inline: {
                  options: ['bold', 'italic', 'underline', 'monospace'],
                  list: {
                    options: ['unordered', 'ordered']
                  }
                }
              }}
            />
          </>
        ) : null}

        {showPreview ? (
          <>
            <button
              className="btn btn--blue-border"
              onClick={() => {
                setShowPreview(false);
                setShowEditor(true);

              }}>
              Editor
            </button>
            <div
              className="proposalContent-div"
              id="preview-html-container"
            />
          </>
        ) : null}


        {/*<label htmlFor="proposalDescription">Proposal description</label>*/}
        {/*<input type="text" id="proposalDescription" ref={register} name="proposalDescription" className="styled"/>*/}
        {/*<ErrorMessage*/}
        {/*  errors={errors}*/}
        {/*  name="proposalDescription"*/}
        {/*  render={({message}) => <small><p style={{lineHeight: '1.5'}}>{message}</p></small>}*/}
        {/*/>*/}
      </div>
      <div className="form-actions-spaced">
        <button className="btn btn--blue-border" type="button" onClick={onBack}>Back</button>
        <button className="btn btn--blue" type="submit">Next</button>
      </div>
    </form>
  )
}
