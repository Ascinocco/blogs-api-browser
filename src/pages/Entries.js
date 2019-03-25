import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Page from '../components/Page';
import ListViewTable from '../components/ListViewTable'

const propTypes = {
  entries: PropTypes.object,
  location: PropTypes.object.isRequired,
}

const defaultProps = {
  entries: { data: [] }
}

const headings = [
  'ID',
  'Headline',
  'Modified At',
  'Published At',
]

const rowKeys = [
  'id',
  'headline',
  'modDate',
  'pubDate'
]

const formatEntryData = entry => ({
  id: entry.id,
  ...entry.attributes
})

function Entries(props) {
  const { entries } = props
  const formattedEntries = entries.data.map(entry => formatEntryData(entry))

  return (
    <Page {...props} paginationData={{ links: entries.links, meta: entries.meta }}>
      <h1>Entries</h1>
      <ListViewTable
        headings={headings}
        resourceName={'entries'}
        rows={formattedEntries}
        rowKeys={rowKeys}
      />
    </Page>
  );
}

Entries.propTypes = propTypes

const mapStateToProps = (state) => ({
  entries: state.get('entries').entries
})

export default connect(mapStateToProps, null)(withRouter(Entries))
