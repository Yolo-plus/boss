import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
  reducers,
  // 支持异步操作
  composeWithDevTools(applyMiddleware(thunk))
)