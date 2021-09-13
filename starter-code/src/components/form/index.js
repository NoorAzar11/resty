'use strict'



import React, { useState } from 'react';
import './form.scss';



function Form(props) {

  let [displaytextArea, setdisplaytextArea] = useState(false);
  let [statemethod, setstatemethod] = useState('get');
  let [fetchUrl, setfetchUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  let [getreqbody, setgetreqbody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const fetchformData = {
      method: statemethod,
      url: fetchUrl
    };
    props.handleApiCall(fetchformData, getreqbody);
  }



  function textArea(e) {

    setdisplaytextArea(!displaytextArea);
    setstatemethod(e.target.id);

  }



  function createMethod(e) {

    setstatemethod(e.target.id);

  }

  function fetchUrlg(e) {

    setfetchUrl(e.target.value);

  }

  function fetchreqbody(e) {

    setgetreqbody(e.target.value);
  }

  return (


    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' onChange={fetchUrlg}/>
          <button type="submit" data-testid="submit">GO!</button>
        </label>
        <label className="methods">
        <button className='button' type='button' id="get" onClick={createMethod}>GET</button>
       <button className='button' type='button' id="post" onClick={textArea}>POST</button>
       <button className='button' type='button' id="put" onClick={textArea}>PUT</button>
       <button className='button' type='button' id="delete" onClick={createMethod}>DELETE</button>
     </label>
      </form>
      {displaytextArea && <textarea name="postAndPutTextArea" rows="10" cols="35" onChange={fetchreqbody}/>}
    </>
  );
}

export default Form;
