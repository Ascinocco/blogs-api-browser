import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Page from '../../components/Page'
import formatBlogData from '../../lib/formatBlogData'

import styles from './BlogDetails.module.css'

import {
  startLoading,
  stopLoading
} from '../../actions'

const propTypes = {
  blogData: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired
}

const defaultProps = {
  blogData: {}
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
          <li>
            <Link to={`/authors/${author.id}`}>
              {author.attributes.name}: {author.attributes.email}
            </Link>
          </li>
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

class BlogDetails extends Component {
  componentDidMount() {
    if (isEmpty(this.props.blogData)) {
      this.props.startLoading()
    }
  }

  shouldComponentUpdate(nextProps) {
    const blogDataChanged =  Object.keys(this.props.blogData).length !== Object.keys(nextProps.blogData).length
    if (blogDataChanged) {
      this.props.stopLoading()
      return true
    }
    return false
  }

  render() {
    const { blogData } = this.props
    const { attributes, entries } = blogData
    console.log('blogData', blogData)
    if (isEmpty(blogData)) {
      return <div />
    }

    const renderedEntries = renderEntries(entries)

    return (
      <Page {...this.props}>
        <h1>{attributes.name}</h1>
        {renderedEntries}
      </Page>
    )
  }
}

BlogDetails.propTypes = propTypes
BlogDetails.defaultProps = defaultProps

const mapStateToProps = (state, props) => ({
  blogData: formatBlogData(state, props)
})

export default connect(mapStateToProps, { startLoading, stopLoading })(withRouter(BlogDetails))
