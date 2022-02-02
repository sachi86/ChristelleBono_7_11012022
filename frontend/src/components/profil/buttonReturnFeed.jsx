import React from 'react';
import { useHistory } from "react-router-dom";

function ButtonReturnFeed() {
  
  const history = useHistory();
  
  const returnFeed = () =>{ 
    let path = `/feed`; 
    history.push(path);
  }

  return (               
          <button className="btn buttonReturn" onClick={returnFeed}> Retour</button>
  );
}
export default ButtonReturnFeed;