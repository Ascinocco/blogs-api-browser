import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import Page from '../components/Page'

import { fetchBlog } from '../actions'

const propTypes = {
  author: PropTypes.object,
  fetchBlog: PropTypes.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const defaultProps = {
  blogData: { data: {} }
}

function AuthorDetails(props) {
  const { author } = props
  const { attributes, entries } = author
  console.log('PROPS', props)
  const entryItems = entries.map(entry => (
    <li key={`author-${author.id}-entry-${entry.id}`}>
      <Link to={`/entries/${entry.id}`}>{entry.attributes.headline}</Link>
    </li>
  ))

  return (
    <Page {...props}>
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

AuthorDetails.propTypes = propTypes
AuthorDetails.defaultProps = defaultProps

const mapStateToProps = (state, props) => {
  const { match = {} } = props
  const { params = {} } = match
  const authors = state.get('authors').authors
  const author = authors.data.find(currentAuthor => currentAuthor.id === params.id)
  const entries = state.get('entries').entries
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

export default connect(mapStateToProps, { fetchBlog })(withRouter(AuthorDetails))
