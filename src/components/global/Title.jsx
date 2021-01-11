import React from 'react';

/**
 * Component that shows a Title with h1
 * @component
 * @subcategory Global
 * @param {string} heading The content of the Title 
 */
export default function Title({heading, propsRef}) {
  return (
    <h1 ref={propsRef} className="article__title text-center title-border title-border--blue">
      {heading}
    </h1>
  )
}
