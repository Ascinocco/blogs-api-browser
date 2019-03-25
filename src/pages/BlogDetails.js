import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Page from '../components/Page'
import DetailView from '../components/DetailView'

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
  const { match = {} } = props
  const { params = {} } = match
  const [blog, setBlog] = useState(props.blogData.data)
  console.log('PROPS', props)
  useEffect(() => {
    props.fetchBlog(params.id)
    setBlog(props.blogData.data)
  }, [Object.keys(props.blogData.data || {}).length])

  return (
    <div>
      <h1>Detail View!</h1>
    </div>
  )
}

BlogDetails.propTypes = propTypes
BlogDetails.defaultProps = defaultProps

const mapStateToProps = state => ({
  blogData: state.get('blogs').blog
})

export default connect(mapStateToProps, { fetchBlog })(withRouter(BlogDetails))
