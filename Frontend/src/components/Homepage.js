import React from 'react'
import { AppContext } from '../context/CreateAppContext';

function Homepage({ events }) {
  
  let result;

  if (events) {
    const resultList = events.map(event => {
      return (
        <li>
            {event.title}
        </li>
      )
    })
    result = <ul>{resultList}</ul>
  } else { result = <p>Loading</p>}
  
  console.log(result)
  
  return(
    <div className='homepage'>
      <h1>1 ROPS Booster Club</h1>
      {result}
    </div>
  );
}

export default Homepage;