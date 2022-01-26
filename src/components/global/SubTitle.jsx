import React from 'react'

/**
 * Component that shows a subtitle with h2
 * @component
 * @subcategory Global
 * @param {string} heading The content of the subtitle 
 */
export default function SubTitle({heading, propsRef}) {
  return (
    <h2 ref={propsRef} className="article__title text-center title-border title-border--blue">
      {heading}
    </h2>
  )
}
