import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Provider } from 'react-redux'

import configureStore, { history } from './configureStore'
import routes from './routes'

import App from './components/App'

import './index.css'
import * as serviceWorker from './serviceWorker'

const initialState = Immutable.Map()
const store = configureStore(initialState)

const app = (
  <ConnectedRouter history={history}>
    { routes }
  </ConnectedRouter>
);

const render = () => {
  ReactDOM.render((
    <>
      <AppContainer>
        <Provider store={store}>
          <App>
            {app}
          </App>
        </Provider>
      </AppContainer>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </>
  ), document.getElementById('root'))
}

render();

if (module.hot) {
  module.hot.accept(app, () => {
    render()
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
