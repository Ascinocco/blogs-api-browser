import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../components/Page';

const propTypes = {
  location: PropTypes.object.isRequired,
}

function Comments(props) {
  return (
    <Page {...props} >
      <h1>Comments</h1>
    </Page>
  );
}

Comments.propTypes = propTypes

export default withRouter(Comments)
