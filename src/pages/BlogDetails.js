import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Page from '../components/Page'
import BlogDetailView from '../components/BlogDetailView'
import formatBlogData from '../lib/formatBlogData'

import {
  startLoading,
  stopLoading
} from '../actions'

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
    console.log('blogData', blogData)
    if (isEmpty(blogData)) {
      return <div />
    }

    return (
      <Page {...this.props}>
        <BlogDetailView {...blogData} />
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
