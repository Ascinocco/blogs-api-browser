import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Page from '../components/Page';
import ListViewTable from '../components/ListViewTable'

const propTypes = {
  authors: PropTypes.object,
  location: PropTypes.object.isRequired,
}

const defaultProps = {
  authors: { data: [] }
}

const headings = [
  'ID',
  'Name',
  'Email',
]

const rowKeys = [
  'id',
  'name',
  'email',
]

const formatAuthorData = author => ({
  id: author.id,
  ...author.attributes
})

function Authors(props) {
  const { authors } = props
  const formattedAuthors = authors.data.map(entry => formatAuthorData(entry))

  return (
    <Page {...props} paginationData={{ links: authors.links, meta: authors.meta }}>
      <h1>Authors</h1>
      <ListViewTable
        headings={headings}
        resourceName={'authors'}
        rows={formattedAuthors}
        rowKeys={rowKeys}
      />
    </Page>
  );
}

Authors.propTypes = propTypes
Authors.defaultProps = defaultProps

const mapStateToProps = state => ({
  authors: state.get('authors').authors
})

export default connect(mapStateToProps, null)(withRouter(Authors))
