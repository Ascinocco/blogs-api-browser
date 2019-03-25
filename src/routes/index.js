import React from 'react'
import {
  Route,
  Switch
} from 'react-router'

import Authors from '../pages/Authors'
import Blogs from '../pages/Blogs'
import BlogDetails from '../pages/BlogDetails';
import Comments from '../pages/Comments'
import Entries from '../pages/Entries'
import PageNotFound from '../pages/PageNotFound'

const routes = (
  <Switch>
    <Route path="/authors" component={Authors} />
    <Route exact path="/" component={Blogs} />
    <Route path="/comments" component={Comments} />
    <Route path="/entries" component={Entries} />
    <Route path="/blogs/:id" component={BlogDetails} />
    <Route component={PageNotFound} />
  </Switch>
)

export default routes
