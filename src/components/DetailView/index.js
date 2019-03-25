import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import styles from './DetailView.module.css'

const propTypes = {
  attributes: PropTypes.object,
  entries: PropTypes.array,
}

const defaultProps = {
  attributes: {},
  entries: []
}



const renderEntries = (entries) => {
  if (isEmpty(entries)) {
    return (
      <div className={styles['blog-details-container']}>
        <h4>No entries found.</h4>
      </div>
    )
  }

  return entries.map((entry) => {
    const { author, attributes, comments } = entry
  
    const authorDetails = (
      <div>
        <h5>Author</h5>
        <ul>
          <li>{author.attributes.name}: {author.attributes.email}</li>
        </ul>
      </div>
    )
  
    const attributeItems = Object.keys(attributes).map(key =>(
      <li key={`entry-${entry.id}-key-${key}`}>
        {key}: {entry.attributes[key]}
      </li>
    ))
  
    const entryAttributes = (
      <div>
        <h5>Details</h5>
        <ul>
          {attributeItems}
        </ul>
      </div>
    )
  
    const commentItems = comments.map((comment) => {
      const { commentWriter } = comment
      const name = !isEmpty(commentWriter) ? commentWriter.attributes.name : ''
      const body = !isEmpty(comment.attributes) ? comment.attributes.body : ''
      const nameString = name ? `${name}:` : 'unknown:'
  
      return (
        <li key={`entry-${entry.id}-${comment.id}`}>
          {`${nameString} ${body}`}
        </li>
      )
    })
    
    return (
      <Container key={`entry-container-${entry.id}`}>
        <Row>
          <Col>
            <h5 className={styles['entry-header']}>Entry #{entry.id}</h5>
            <div className={styles['blog-details-container']}>
              {authorDetails}
              {entryAttributes}
              {commentItems}
            </div>
          </Col>
        </Row>
      </Container>
    )
  })
}

function DetailView(props) {
  console.log(props)
  const { attributes, entries } = props
  const renderedEntries = renderEntries(entries)
  return (
    <div>
      <h1>{attributes.name}</h1>
      {renderedEntries}
    </div>
  )
}

DetailView.propTypes = propTypes
DetailView.defaultProps = defaultProps

export default DetailView
