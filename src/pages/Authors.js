import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../components/Page';

const propTypes = {
  location: PropTypes.object.isRequired,
}

function Authors(props) {
  return (
    <Page {...props} >
      <h1>Authors</h1>
    </Page>
  );
}

Authors.propTypes = propTypes

export default withRouter(Authors)
