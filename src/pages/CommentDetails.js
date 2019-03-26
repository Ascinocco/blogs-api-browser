import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Page from '../components/Page'

import {
  startLoading,
  stopLoading
} from '../actions'

const propTypes = {
  comment: PropTypes.object,
  writer: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired
}

const defaultProps = {
  comment: {},
  writer: {}
}

class CommentDetails extends Component {
  componentDidMount() {
    if (isEmpty(this.props.comment)) {
      this.props.startLoading()
    }
  }

  shouldComponentUpdate(nextProps) {
    const commentsChanged =  Object.keys(this.props.comment).length !== Object.keys(nextProps.comment).length
    const writerChanged = Object.keys(this.props.writer).length !== Object.keys(nextProps.writer).length
    if (commentsChanged || writerChanged) {
      this.props.stopLoading()
      return true
    }
    return false
  }

  render() {
    const { comment, writer } = this.props
    console.log('comment', comment)
    if (isEmpty(comment)) {
     return <div />
   }
 
   const writerDetails = `${writer.name}, ${writer.email}`
   const writerMarkup = writer.id ? (
     <Link to={`/authors/${writer.id}`}>
       <li>{writerDetails}</li>
     </Link>
   ) : (
     <li>{writerDetails}</li>
   )
 
   return (
     <Page {...this.props} >
       <h1>Comment #{comment.id}</h1>
       <ul>
         <li>{comment.attributes.body}</li>
       </ul>
 
       <h1>Writer</h1>
       <ul>
         {writerMarkup}
       </ul>
     </Page>
   )
  }
}

CommentDetails.propTypes = propTypes
CommentDetails.defaultProps = defaultProps

const mapStateToProps = (state, props) => {
  const { match = {} } = props
  const { params = {} } = match
  const comments = state.get('comments').comments
  if (!comments) return { comment: {}, writer: {} }

  const comment = comments.data.find(currentComment => currentComment.id === params.id)

  const writerId = (comment.relationships.writer.data || {}).id
  const authors = state.get('authors').authors
  const commentWriter = authors.data.find(author => author.id === writerId)
  const writerData = commentWriter ?
    { id: commentWriter.id, ...commentWriter.attributes } :
    { name: 'unknown', email: 'unknown' }

  return {
    comment,
    writer: writerData
  }
}

export default connect(mapStateToProps, { startLoading, stopLoading })(withRouter(CommentDetails))
