import isEmpty from 'lodash.isempty'

const getAuthor = (state, entryId) => {
  const authors = state.get('authors').authors
  if (isEmpty(authors)) return {}

  return authors.data.find((author) => {
    const authorsEntries = author.relationships.entries
    if (isEmpty(authorsEntries)) return false
    return authorsEntries.data.find(aEntry => aEntry.id === entryId)
  })
}

const getComments = (state, entryId) => {
  const comments = state.get('comments').comments
  if (isEmpty(comments)) return {}

  const relatedComments = comments.data.filter(comment => comment.relationships.entry.data.id === entryId)
  return relatedComments.map((entryComment) => {
    const entryCommentWriter = entryComment.relationships.writer.data
    const commentWriterId = entryCommentWriter ? entryCommentWriter.id : null
    const authors = state.get('authors').authors
    const commentWriter =
      isEmpty(authors) && commentWriterId ?
        {} :
        authors.data.find(author => author.id === commentWriterId)

    return {
      ...entryComment,
      commentWriter
    }
  })
}

const getEntries = (state, blogId) => {
  const entries = state.get('entries').entries
  if (isEmpty(entries)) return {}
  
  const relatedEntries = entries.data.filter(entry => entry.relationships.blog.data.id === blogId)
  return relatedEntries.map((entry) => {
    const author = getAuthor(state, entry.id)
    const comments = getComments(state, entry.id)
    return {
      ...entry,
      author,
      comments
    }
  })

}

const formatBlogData = (state = {}, props) => {
  const blogs = state.get('blogs').blogs
  if (isEmpty(blogs)) return {}

  const { match = {} } = props
  const { params = {} } = match
  const blog = blogs.data.find(currentBlog => currentBlog.id === params.id)
  const entries = getEntries(state, blog.id)

  return {
    ...blog,
    entries
  }
}

export default formatBlogData
