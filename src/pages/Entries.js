import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../connected-components/Page';

const propTypes = {
  location: PropTypes.object.isRequired,
}

function Entries(props) {
  return (
    <Page {...props} >
      <h1>Entries</h1>
    </Page>
  );
}

Entries.propTypes = propTypes

export default withRouter(Entries)
