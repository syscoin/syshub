import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
  proposalDescription: yup.string().max(40, 'The proposal title must be at most 40 characters.').required('The proposal title is required.')
});

export default function DescriptionProposal({ onNext, onBack }) {
  
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      proposalDescription: ''
    }
  });


  return (
    <form className="input-form" onSubmit={handleSubmit(onNext)}>
      <div className="form-group">
        <label htmlFor="proposalTitle">Proposal title</label>
        <input type="text" id="proposalTitle" ref={register} name="proposalTitle" className="styled" maxLength="40" />
        <ErrorMessage
            errors={errors}
            name="proposalTitle"
            render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
          />
      </div>
      <div className="form-actions-spaced">
        <button className="btn btn--blue-border" type="button" onClick={onBack}>Back</button>
        <button className="btn btn--blue" type="submit">Next</button>
      </div>
    </form>
  )
}
