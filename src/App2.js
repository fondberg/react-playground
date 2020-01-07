import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function App2({title, colour}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: 100, border: 'thin solid red' }}>
      <h2 style={{color: colour}}>{title}</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App2;
