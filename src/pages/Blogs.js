import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Page from '../components/Page';
import ListViewTable from '../components/ListViewTable'

import { listBlogs } from '../actions'

const propTypes = {
  blogData: PropTypes.shape({
    data: PropTypes.array,
    links: PropTypes.object,
    meta: PropTypes.object
  }),
  listBlogs: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

const defaultProps = {
  blogData: {
    data: [],
    links: {},
    meta: {}
  }
}

const headings = [
  'ID',
  'Name',
  'Tagline',
  'Tags'
]

const rowKeys = [
  'id',
  'name',
  'tagline',
  'tags'
]

const formatBlogData = (blogData) => {
  const { links = { self: '' } } = blogData
  const { name = '', tagline = ''} = blogData.attributes
  return {
    id: blogData.id,
    name,
    selfLink: links.self,
    tagline,
    tags: blogData.relationships.tags,
  }
}

function Blogs(props) {
  const [blogData, setBlogData] = useState(props.blogData)

  useEffect(() => {
    props.listBlogs()
    setBlogData(props.blogData)
  }, [props.blogData.data.length])

  const formattedBlogs = blogData.data.map(blog => formatBlogData(blog))

  return (
    <Page {...props} paginationData={{ links: blogData.links, meta: blogData.meta }}>
      <h1>Blogs</h1>
      <ListViewTable
        headings={headings}
        resourceName={'blogs'}
        rows={formattedBlogs}
        rowKeys={rowKeys}
      />
    </Page>
  );
}

Blogs.propTypes = propTypes
Blogs.defaultProps = defaultProps

const mapStateToProps = state => ({
  blogData: state.get('blogs').blogs
})

export default connect(mapStateToProps, { listBlogs })(withRouter(Blogs))
