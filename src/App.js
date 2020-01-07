import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useFetch = (url, options = {}) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw Error(response.statusText);
        }
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    })();
  }, [url]);
  return { response, error };
};

function App({ title, colour }) {
  const counter = useSelector(state => {
    console.log("State;", state);
    return state.counter;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <hr></hr>
      <h2 style={{color: colour}}>{title}</h2>
      <h4>Counter: {counter}</h4>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <Settings />
      <Dog />
      <Loading />
    </div>
  );
}

const actions = {
  setNotifications: bool => ({ type: "SET_NOTIFICATIONS", bool })
};

function Settings(props) {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  return (
    <div>
      <hr></hr>
      <h2>Settings</h2>
      <h3>{settings.notifications}</h3>
      <button
        onClick={() =>
          dispatch(actions.setNotifications(!settings.notifications))
        }
      >
        +
      </button>
    </div>
  );
}

function Dog() {
  const res = useFetch(`https://dog.ceo/api/breeds/image/random`, {});
  if (!res.response) {
    return null;
  }
  const dogName = res.response.status;
  const imageUrl = res.response.message;

  return (
    <div>
      <hr></hr>
      <h2>{dogName}</h2>
        <div>
          <img width="400" src={imageUrl} alt="avatar" />
        </div>
    </div>
  );
}

function Loading() {
  const { notifications } = useSelector(state => state.settings);
  if (!notifications) {
    return null;
  }
  return (
    <div className="lds-heart">
      <div></div>
    </div>
  );
}
export default App;
