import React from 'react';
import AddMNForm from './AddMNForm';
import Title from './Title';

export default function AddMasternodes() {
  return (
    <div className="shell-large">
      <div className="section__body">
        <div className="articles">
          <section className="article">
            <div className="cols">
              <div className="col col--size-12">
                <div className="article__content article__content--pull-left text-center">
                  <Title heading="Add masternodes" />
                  <AddMNForm />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
