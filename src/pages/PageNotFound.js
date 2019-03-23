import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../connected-components/Page';

const propTypes = {
  location: PropTypes.object.isRequired,
}

function PageNotFound() {
  return (
    <Page>
      <h1>Page Not Found</h1>
    </Page>
  );
}

PageNotFound.propTypes = propTypes

export default withRouter(PageNotFound)
