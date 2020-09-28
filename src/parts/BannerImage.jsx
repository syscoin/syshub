import React from "react";

export default function BannerImage(props) {
    const checkImageDirection = () => {
        if (props.direction === 'left') return 'article__image--pull-left';
        if (props.direction === 'top-right') return 'article__image--pull-top-right';
        return '';
    }
    
    return (
        <section className="article article--revirse">
            <div className="cols morder">
                <div className="col col--size6">
                    <div className={`article__image ${checkImageDirection()} hidmob`}>
                        <img src={process.env.PUBLIC_URL+'/assets/images/masternode.png'} alt="" />
                    </div>
                </div>

                <div className="col col--size6">
                    <div className="article__content article__content--pull-left mobile-center">
                        <h1 className="article__title title-border title-border--left title-border--blue">
                            {props.heading}
                        </h1>
                        
                        {props.children}
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
