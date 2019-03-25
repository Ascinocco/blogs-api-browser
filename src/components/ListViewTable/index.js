import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const propTypes = {
  headings: PropTypes.array,
  rowKeys: PropTypes.array,
  resourceName: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  })),
}

const defaultProps = {
  headings: [],
  rowKeys: [],
  rows: [],
}

const validLinkKeys = [
  'name',
  'headline'
]

const isTag = key => key === 'tags'
const isLink = key => validLinkKeys.find(linkKey => key === linkKey)

const renderRow = (rowData, rowKeys, resourceName) => rowKeys.map((key) => {
  const value = rowData[key]
  let finalValue = value

  if (isTag(key)) {
    finalValue = value.data.join(', ')
  }

  if (isLink(key, rowData)) {
    finalValue = (
      <Link to={`${resourceName}/${rowData.id}`}>
        {value}
      </Link>
    )
  }

  return (
    <td key={`row-value-${key}`}>
      {finalValue}
    </td>
  )
})

function ListViewTable(props) {
  const { headings, resourceName, rows, rowKeys } = props

  const mappedHeadings = headings.map(heading => <th key={`heading-${heading}`}>{heading}</th>)
  const mappedRows = rows.map((rowData) => {
    const row = renderRow(rowData, rowKeys, resourceName)
    return <tr key={`row-${rowData.id}`}>{row}</tr>
  })

  return (
    <Table responsive striped hover>
      <thead>
        <tr>{mappedHeadings}</tr>
      </thead>
      <tbody>
        {mappedRows}
      </tbody>
    </Table>
  )
}

ListViewTable.propTypes = propTypes
ListViewTable.defaultProps = defaultProps

export default ListViewTable
