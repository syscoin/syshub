import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../../context/user-context';
import { createMasterNode } from '../../utils/request';

import AddMNForm from './AddMNForm';
import Title from './Title';

export default function AddMasternodes() {
  const { user } = useUser(); 
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);

  const singleCreation = async (data) => {
    setSubmitting(true);
    try {
      await createMasterNode(user.token, data).catch(err => { throw err });
      await Swal.fire({
        title: 'masternode created',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      setSubmitting(false);
      history.push('/profile');
    } catch (error) {
      Swal.fire({ title: error, icon: 'error' });
      setSubmitting(false);
    }

  }

  const multipleCreation = async ({ masternodeConf }) => {
    setSubmitting(true);
    try {
      await createMasterNode(user.token, {listMN: masternodeConf}).catch(err => { throw err });
      await Swal.fire({
        title: 'masternode created',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      setSubmitting(false);
      history.push('/profile');
    } catch (error) {
      Swal.fire({ title: 'There was an error', text: 'Please verify the data and try again', icon: 'error' });
      setSubmitting(false);
    }
  }

  return (
    <div className="shell-large">
      <div className="section__body">
        <div className="articles">
          <section className="article">
            <div className="cols">
              <div className="col col--size-12">
                <div className="article__content article__content--pull-left text-center">
                  <Title heading="Add masternodes" />
                  <AddMNForm
                    onSingleCreation={singleCreation}
                    onMultipleCreation={multipleCreation}
                    submitting={submitting}
                  />
                  <Link to="/profile" className="btn btn--blue-border">Profile</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
