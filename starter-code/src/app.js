import React,{useState,useEffect} from 'react';

import './app.scss';




// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import axios from 'axios';


function App(props){
  const [state,setState]=useState({data:'',requestParams:{}});
  const [Effects,setEffects]=useState([]);

  
  async function callApi(requestParams){

    setState({requestParams})
    setEffects([...Effects,requestParams.url,requestParams.method])

    try{
      const fetchUrl=await axios.get(requestParams.url);
     
        // mock output
        const data = {
          // count: 2,
          headers:[fetchUrl.headers],
          results: [fetchUrl.data.results],
          //   {name: 'fake thing 1', url: 'http://fakethings.com/1'},
          //   {name: 'fake thing 2', url: 'http://fakethings.com/2'},
          // ],
        };
        setState({data, requestParams});

    }
    catch(err){
      console.log('try again');
    }
    }


    useEffect(()=> {
      console.log("%c I RUN ON EVERY RE-RENDER", 'background:#ccc; color:red');
  });


  // This will run only when the name changes
  useEffect(()=> {
      console.log(`%c I RUN ON HISTORY CHANGE: ${Effects}` , 'background:#000; color:purple');
  }, [Effects]);


  
  // when name or people are changed 
  useEffect(()=> {
      console.log("I RUN ON STATE, HISTORY CHANGE: ", state);
  }, [state, Effects]);


  
  // run once on initial rendering 
  // can be a good case to do a GET request form an API
  useEffect(()=> {
      console.log("Initial loading ", state);
  }, []);


  
  //UNMOUNT
  useEffect(()=> {
      return (()=> {
          console.log("%c Component unmounted !!", "background:yellow; color:black")
      })
  });



    return (




      <React.Fragment>
        <Header />
        {




                Effects.map((item, idx)=> {
                   return <div key={idx}>{item}</div>
                })
                
            }
        {/* <div>Request Method: {state.requestParams.method}</div>
        <div>URL: {state.requestParams.url}</div> */}
        <Form handleApiCall={callApi} />
        <Results data={state.data} />

        
        <Footer />
      </React.Fragment>
    );
  }

  





















export default App;
