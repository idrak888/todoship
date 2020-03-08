import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/appReducer';

import MainTodoScreen from './components/MainTodoScreen';

class App extends React.Component {
  reducer = combineReducers({
    appReducer
  });
  store = createStore(this.reducer);

  render () {
    return (
      <Provider store={this.store}>
        <MainTodoScreen/>
      </Provider>
    )
  }
}

export default App;