import Immutable from 'immutable'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import configureStore, { history } from './configureStore'
import routes from './routes'

import { initializeStoreFromApi } from './actions'

import './index.css'
import * as serviceWorker from './serviceWorker'

const initialState = Immutable.Map()
const store = configureStore(initialState)

class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <AppContainer>
          <ConnectedRouter history={history}>
            { routes }
          </ConnectedRouter>
        </AppContainer>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        </Provider>
    )
  }
}

const ConnectedApp = connect(null, { initializeStoreFromApi })(App)

const render = () => {
  ReactDOM.render(<ConnectedApp />, document.getElementById('root'))
}

render();

if (module.hot) {
  module.hot.accept(<ConnectedApp />, () => {
    render()
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
