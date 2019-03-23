import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React from 'react'
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar'

import NavBar from '../../components/NavBar'
import PaginationBar from '../../components/PaginationBar'

import styles from './Page.module.css'

const propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object,
  paginationData: PropTypes.object
}

const defaultProps = {
  location: { pathname: ''},
  paginationData: {}
}

const renderPaginationBar = (paginationData) => {
  if (isEmpty(paginationData)) return null
  return <PaginationBar {...paginationData} />
}

// @TODO: Anthony - so far, this isn't connected, might need to refactor this into the components folder
function Page(props) {
  const { location, children, paginationData } = props;
  const paginationBar = renderPaginationBar(paginationData)
  return (
    <>
      <NavBar pathname={location.pathname} />
      <LoadingBar className={styles['loading-bar']} showFastActions />
      <div className={styles['page-children-container']}>
        {children}
        {paginationBar}
      </div>
    </>
  )
}

Page.propTypes = propTypes
Page.defaultProps = defaultProps

export default Page
