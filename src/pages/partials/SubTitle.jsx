import React from 'react'

export default function SubTitle(props) {
  return (
    <h2 className="article__title title-border title-border--blue">
      {props.heading}
    </h2>
  )
}
