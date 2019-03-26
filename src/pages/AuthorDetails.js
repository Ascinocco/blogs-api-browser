import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import Page from '../components/Page'

import {
  startLoading,
  stopLoading
} from '../actions'

const propTypes = {
  author: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const defaultProps = {
  author: { data: [] }
}

class AuthorDetails extends Component {
  componentDidMount() {
    if (isEmpty(this.props.author)) {
      this.props.startLoading()
    }
  }

  shouldComponentUpdate(nextProps) {
    const authorChanged =  Object.keys(this.props.author).length !== Object.keys(nextProps.author).length
    if (authorChanged) {
      this.props.stopLoading()
      return true
    }
    return false
  }

  render(){
    const { author } = this.props
    const { attributes, entries } = author
  
    if (isEmpty(author)) {
      return <div />
    }

    const entryItems = entries.map(entry => (
      <li key={`author-${author.id}-entry-${entry.id}`}>
        <Link to={`/entries/${entry.id}`}>{entry.attributes.headline}</Link>
      </li>
    ))
  
    return (
      <Page {...this.props}>
        <h1>Author #{author.id}</h1>
        <Container>
          <Row>
            <Col>
              <h5>Details</h5>
              <ul>
                <li>{attributes.name}</li>
                <li>{attributes.email}</li>
              </ul>
  
              <h5>Entries</h5>
              <ul>
                {entryItems}
              </ul>
            </Col>
          </Row>
        </Container>
      </Page>
    )
  }
}

AuthorDetails.propTypes = propTypes
AuthorDetails.defaultProps = defaultProps

const defaultAuthor = {
  author: {},
}

const mapStateToProps = (state, props) => {
  const { match = {} } = props
  const { params = {} } = match
  const authors = state.get('authors').authors
  const entries = state.get('entries').entries
  if (isEmpty(authors) || isEmpty(entries)) return defaultAuthor

  const author = authors.data.find(currentAuthor => currentAuthor.id === params.id)
  const authorsEntries = entries.data.filter(entry => (
    entry.relationships.authors.data.find(entryAuthor => entryAuthor.id === author.id))
  )

  return {
    author: {
      ...author,
      entries: authorsEntries
    }
  }
}

export default connect(mapStateToProps, { startLoading, stopLoading })(withRouter(AuthorDetails))
