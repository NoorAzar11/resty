'use strict';

import React,{useState} from 'react';

import './form.scss';

function Form (props) {

 const [state,setState]=useState({restymethodState:''});
  function handleSubmit (e) {
    e.preventDefault();
    const formData = {
      method:state.restymethodState,
      url: 'https://pokeapi.co/api/v2/pokemon',
    };
    props.handleApiCall(formData);
  }
function data(e,value){
  e.preventDefault();
  setState({restymethodState:value})
}
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' />
            <button type="submit">GO!</button>
          </label>
          <label className="methods">
            <button  id="get"onClick={(e)=>data(e,'GET')}>GET</button>
            <button  id="post" onClick={(e)=>data(e,'POST')}>POST</button >
            <button  id="put"onClick={(e)=>data(e,'PUT')}>PUT</button >
            <button  id="delete" onClick={(e)=>data(e,'DELETE')}>DELETE</button >
          </label>
        </form>
      </>
    );
  }

export default Form;
