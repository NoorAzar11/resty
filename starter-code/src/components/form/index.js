'use strict'



import React, { useState } from 'react';
import { useReducer } from "react";
import './form.scss';


function Form(props) {


  let [displayTextarea, setdisplayTextarea] = useState(false);
  let [crudMethod, setcrudMethod] = useState("get");
  let [fetchurl, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  let [reqBody, setRequestBody] = useState("");



  const initialState = {
    api: [],
  };

  const [state, dispatch] = useReducer(apiReducer, initialState);

  function getHandlerMethod(e) {
    setcrudMethod(e.target.id);
  }


  function postHandlerMethod(e) {
    setdisplayTextarea(!displayTextarea);
    setcrudMethod(e.target.id);
  }
  function updateHandlerMethod(e) {
    setdisplayTextarea(!displayTextarea);
    setcrudMethod(e.target.id);
  }

  function deleteHandlerMethod(e) {
    setcrudMethod(e.target.id);
  }

  let urlHandlerFetching = async (e) => {
    setUrl(e.target.value);
  };

  function handleRequestBodyMethod(e) {
    setRequestBody(e.target.value);
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.api.value;
    const data = {
      method: crudMethod,
      name: name,
    };
    dispatch(addAction(data));
    e.target.reset();
  }



  function apiReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "ADD_API":
        const api = [...state.api, payload.method, payload.name];
        return { api };
      case "REMOVE_API":
        const peopleWithoutPerson = state.api.filter((api) => api !== payload);
        return { api: peopleWithoutPerson };
      case "EMPTY_API":
        return initialState;
      default:
        return state;
    }
  }


  let addAction = (name) => {
    return {
      type: "ADD_API",
      payload: name,
    };
  };


  let removeAction = (name) => {
    return {
      type: "REMOVE_API",
      payload: name,
    };
  };



  let emptyAction = () => {
    return {
      type: "EMPTY_API",
    };
  };



  return (
    <>
      <h1>History</h1>
      <ul>



        {state.api.map((api, indx) => {


          return (


            <li key={indx} onClick={() => dispatch(removeAction(api))}>
              {api}
            </li>
          );


        })}


      </ul>


      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name="api" type="text" onChange={urlHandlerFetching} required />
          <button type="submit" data-testid="submit">
            GO!
          </button>
          <button onClick={() => dispatch(emptyAction())}>Clear All</button>
        </label>
        <label className="methods">
          <button className="button" type="button" id="get" onClick={getHandlerMethod}>GET</button>
          <button className="button" type="button" id="post" onClick={postHandlerMethod} > POST</button>
          <button  className="button"type="button" id="put" onClick={updateHandlerMethod}>  PUT</button>
          <button className="button" type="button"id="delete" onClick={deleteHandlerMethod}>DELETE </button>
        </label>
        {displayTextarea && (<textarea name="postAndPut"rows="10"cols="35" onChange={handleRequestBodyMethod}/>)}
      </form>
    </>
  );
}


export default Form;
