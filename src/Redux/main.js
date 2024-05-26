// Counter.js
import React from 'react';
import { Provider,useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './Redux/counterSlice.js';
import store from './Redux/store.js';
import Test from './Redux/check.js';

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

const App = () => (
    <Provider store={store}>
      <Counter />
      <Test/>
    </Provider>
  );
  
  export default App;