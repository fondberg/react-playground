import { createStore, combineReducers } from "redux";

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const initialStates = {
  settings: {
    notifications: false
  }
};

function settings(state = initialStates.settings, action) {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return Object.assign({}, state, { notifications: action.bool });
    default:
      return state;
  }
}

//
const rootReducer = combineReducers({
  counter,
  settings
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render() {
  document.getElementById(
    "value"
  ).innerHTML = store.getState().counter.toString();
}

render();
store.subscribe(render);

document.getElementById("increment").addEventListener("click", function() {
  store.dispatch({ type: "INCREMENT" });
});

document.getElementById("decrement").addEventListener("click", function() {
  store.dispatch({ type: "DECREMENT" });
});

document.getElementById("incrementIfOdd").addEventListener("click", function() {
  if (store.getState().counter % 2 !== 0) {
    store.dispatch({ type: "INCREMENT" });
  }
});

document.getElementById("incrementAsync").addEventListener("click", function() {
  setTimeout(function() {
    store.dispatch({ type: "INCREMENT" });
  }, 1000);
});
