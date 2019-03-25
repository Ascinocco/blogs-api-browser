import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Page from '../components/Page'
import DetailView from '../components/DetailView'
import formatBlogData from '../lib/formatBlogData'

import { fetchBlog } from '../actions'

const propTypes = {
  blogData: PropTypes.object,
  fetchBlog: PropTypes.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const defaultProps = {
  blogData: { data: {} }
}

function BlogDetails(props) {
  return (
    <Page {...props}>
      <DetailView {...props.blogData} />
    </Page>
  )
}

BlogDetails.propTypes = propTypes
BlogDetails.defaultProps = defaultProps

const mapStateToProps = (state, props) => ({
  blogData: formatBlogData(state, props)
})

export default connect(mapStateToProps, { fetchBlog })(withRouter(BlogDetails))
