import React, { Component } from 'react';

/**
 * Component that shows the old inner banner of sysnode
 * @component
 */
class InnerBanner extends Component {
    render() {
        return(
            <section className="section_innerBanner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="page__title text-center">
                            <h1 className="text-white">{this.props.heading}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
export default InnerBanner;
