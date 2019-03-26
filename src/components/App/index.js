import { Component } from 'react'

import { connect } from 'react-redux'

import { initializeStoreFromApi } from '../../actions'

class App extends Component {
  componentDidMount() {
    console.log('running...')
    this.props.initializeStoreFromApi()
  }

  render() {
    return this.props.children
  }
}

export default connect(null, { initializeStoreFromApi })(App)
