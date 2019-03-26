import PropTypes from 'prop-types'
import React from 'react'

import { Pagination } from 'react-bootstrap'

const propTypes = {
  links: PropTypes.object,
  pagination: PropTypes.object
}

const defaultProps = {
  links: {},
  pagination: {}
}

const getNonNumberedLinks = (links) => {
  const { prev, next } = links
  // The demo api provided has only null entries for prev and next
  // so I was unable to accurately configure the prev and next actions

  // what I would have done here is passed down a redux action
  // and called it with the url provided as an argument, and then in the action
  // use the url to fetch the appropriate data and update the store
  const prevLink = prev ? <Pagination.Prev /> : <Pagination.Prev disabled />
  const nextLink = next ? <Pagination.Next /> :  <Pagination.Next disabled />

  return {
    prevLink,
    nextLink
  }
}

const getPaginationItems = (pagination) => {
  const { page, pages } = pagination
  const paginationItems = [] 

  for (let i = 0; i < pages; i++) {
    const pageNum = i + 1
    const active = pageNum === page
    // Similarly to above, there was not enough data provided to do pagination.
    // The approach here would be to get the page number, pass that to a redux action
    // which would then make a call to the api and update the store
    const item = (
      <Pagination.Item key={`page-num-${pageNum}`} active={active}>
        {pageNum}
      </Pagination.Item>
    )
    paginationItems.push(item)
  }

  return paginationItems
}

function PaginationBar(props) {
  const { links, pagination } = props
  const nonNumberedLinks = getNonNumberedLinks(links)
  const items = getPaginationItems(pagination)

  return (
    <Pagination>
      {nonNumberedLinks.prevLink}
      {items}
      {nonNumberedLinks.nextLink}
    </Pagination>
  )
}

PaginationBar.propTypes = propTypes
PaginationBar.defaultProps = defaultProps

export default PaginationBar
