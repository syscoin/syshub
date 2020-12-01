import React from 'react';

/**
 * Component that shows a Title with h1
 * @component
 * @param {string} heading The content of the Title 
 */
export default function Title({heading}) {
  return (
    <h1 className="article__title text-center title-border title-border--blue">
      {heading}
    </h1>
  )
}
