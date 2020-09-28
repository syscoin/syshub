import React from 'react'

export default function Title(props) {
  return (
    <h1 className="article__title title-border title-border--blue">
      {props.heading}
    </h1>
  )
}
