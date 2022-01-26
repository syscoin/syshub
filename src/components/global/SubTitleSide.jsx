import React from 'react'

/**
 * Component that shows a subtitle with h2
 * @component
 * @subcategory Global
 * @param {string} heading The content of the subtitle 
 */
export default function SubTitle({heading}) {
  return (
    <h2 className="article__title title-border title-border--left title-border--blue">
      {heading}
    </h2>
  )
}
