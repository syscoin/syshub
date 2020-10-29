import React from 'react';
import Title from '../partials/Title';
import Background from './Background';
import BackgroundInner from './BackgroundInner';

const Loading = () => {
    return (
      <Background>
        <BackgroundInner />
        <div className="shell-large">
          <div className="section__body">
            <div className="articles">
              <section className="article">
                <div className="cols">
                  <div className="col col--size-12">
                    <div className="article__content text-center">
                      <Title heading="Loading..."/>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Background>
    );
};

export default Loading;
