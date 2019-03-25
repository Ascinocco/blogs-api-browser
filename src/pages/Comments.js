import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Page from '../components/Page';
import ListViewTable from '../components/ListViewTable'

const propTypes = {
  comments: PropTypes.object,
  location: PropTypes.object.isRequired,
}

const defaultProps = {
  comments: { data: [] }
}

const headings = [
  'ID',
  'Body'
]

const rowKeys = [
  'id',
  'body'
]

const formatCommentData = comment => ({
  id: comment.id,
  ...comment.attributes
})

function Comments(props) {
  const { comments } = props

  console.log('props', props)
  const formattedComments = comments.data.map(comment => formatCommentData(comment))
  return (
    <Page {...props} paginationData={{ links: comments.links, meta: comments.meta }}>
      <h1>Comments</h1>
      <ListViewTable
        headings={headings}
        resourceName={'comments'}
        rows={formattedComments}
        rowKeys={rowKeys}
      />
    </Page>
  );
}

Comments.propTypes = propTypes
Comments.defaultProps = defaultProps

const mapStateToProps = state => ({
  comments: state.get('comments').comments
})

export default connect(mapStateToProps, null)(withRouter(Comments))
