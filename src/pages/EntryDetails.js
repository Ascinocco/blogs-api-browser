import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import Page from '../components/Page'

const propTypes = {
  entries: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const defaultProps = {
  entries: { data: [] }
}

function EntryDetails(props) {
  const { entry } = props
  const { attributes } = entry
  const entryAttributes = Object.keys(attributes).map(key => (
    <li key={`entry-${entry.id}-${key}`}>
      {key}: {attributes[key]}
    </li>
  ))

  const entryAuthors = entry.authors.map(author => (
    <li key={`entry-${entry.id}-${author.id}`}>
      <Link to={`/authors/${author.id}`}>{author.attributes.name}, {author.attributes.email}</Link>
    </li>
  ))


  const entryComments = entry.comments.map(comment => (
    <li key={`entry-${entry.id}-comments-${comment.id}`}>
      {comment.attributes.body}
    </li>
  ))

  return (
    <Page {...props}>
      <h1>Entry #{entry.id}</h1>
      <Container>
        <Row>
          <Col>
            <h5>Attributes</h5>
            <ul>
              {entryAttributes}
            </ul>

            <h5>Authors</h5>
            <ul>
              {entryAuthors}
            </ul>

            <h5>Comments</h5>
            <ul>
              {entryComments}
            </ul>
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

EntryDetails.propTypes = propTypes
EntryDetails.defaultProps = defaultProps

const mapStateToProps = (state, props) => {
  const { match = {} } = props
  const { params = {} } = match
  const entries = state.get('entries').entries
  const authors = state.get('authors').authors
  const currentEntry = entries.data.find(entry => entry.id === params.id) || {}
  const mappedEntry = {
    ...currentEntry,
    comments: entries.included.filter(comment => comment.relationships.entry.data.id === currentEntry.id),
    authors: authors.data.filter(author => currentEntry.relationships.authors.data.find(entryAuthor => entryAuthor.id === author.id))
  }

  console.log('authors', authors)
  console.log('mappedEntry', mappedEntry)
  return {
    entry: mappedEntry
  }
}

export default connect(mapStateToProps, null)(withRouter(EntryDetails))
