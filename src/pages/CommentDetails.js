import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Page from '../components/Page'

import { initializeStoreFromApi } from '../actions'

const propTypes = {
  comment: PropTypes.object,
  writer: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const defaultProps = {
  comment: {},
  writer: {}
}

class CommentDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.comment).length !== Object.keys(this.props.comment).length) {
      this.setState({ comment: this.props.comment })
    }
  }

  render() {
    const { writer } = this.props
    const { comment } = this.state
    if (isEmpty(comment)) {
     return (
       <div>
         <h1>Loading...</h1>
       </div>
     )
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

  const writerId = comment.relationships.writer.data.id
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

export default connect(mapStateToProps, { initializeStoreFromApi })(withRouter(CommentDetails))
