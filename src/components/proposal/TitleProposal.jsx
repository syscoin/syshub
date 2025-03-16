import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
  proposalTitle: yup.string().max(40, 'The proposal title must be at most 40 characters.').required('The proposal title is required.')
});

/**
 * Component to show the Proposal title form
 * @component
 * @subcategory Proposal
 * @param {*} onNext function that gets executed after the form is submitted
 * @example
 * const onNext = () => {}
 * return (
 *  <TitleProposal onNext={onNext} />
 * )
 */
function TitleProposal({ onNext }) {
  
  const { register, watch, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      proposalTitle: ''
    }
  });
  const watchedTitle = watch('proposalTitle');

  return (
    <form className="input-form" onSubmit={handleSubmit(onNext)}>
      <div className="form-group">
        <label htmlFor="proposalTitle">Proposal title</label>
        <input type="text" id="proposalTitle" ref={register} name="proposalTitle" className="styled" maxLength="40" />
        <small><p style={{lineHeight:'1.5'}}>{40 - watchedTitle.length} characters left.</p></small>
        <ErrorMessage
          errors={errors}
          name="proposalTitle"
          render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
        />
      </div>
      <div className="form-actions-spaced">
        <button className="btn btn--blue" type="submit">Next</button>
      </div>
    </form>
  )
}

export default TitleProposal;