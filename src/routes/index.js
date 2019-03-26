import React from 'react'
import {
  Route,
  Switch
} from 'react-router'

import Authors from '../pages/Authors'
import AuthorDetails from '../pages/AuthorDetails'
import Blogs from '../pages/Blogs'
import BlogDetails from '../pages/BlogDetails';
import Comments from '../pages/Comments'
import CommentDetails from '../pages/CommentDetails'
import Entries from '../pages/Entries'
import EntryDetails from '../pages/EntryDetails'
import PageNotFound from '../pages/PageNotFound'

const routes = (
  <Switch>
    <Route path="/authors/:id" component={AuthorDetails} />
    <Route path="/authors" component={Authors} />
    <Route exact path="/" component={Blogs} />
    <Route path="/comments/:id" component={CommentDetails} />
    <Route path="/comments" component={Comments} />
    <Route path="/entries/:id" component={EntryDetails} />
    <Route path="/entries" component={Entries} />
    <Route path="/blogs/:id" component={BlogDetails} />
    <Route component={PageNotFound} />
  </Switch>
)

export default routes
