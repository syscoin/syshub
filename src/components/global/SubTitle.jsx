import React from 'react'

/**
 * Component that shows a subtitle with h2
 * @component
 * @param {string} heading The content of the subtitle 
 */
export default function SubTitle({heading}) {
  return (
    <h2 className="article__title text-center title-border title-border--blue">
      {heading}
    </h2>
  )
}
