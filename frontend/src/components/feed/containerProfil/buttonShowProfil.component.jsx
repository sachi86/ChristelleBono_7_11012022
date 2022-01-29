import React from 'react';
import { useHistory } from "react-router-dom";

function ButtonShowProfil() {
  
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/profil`; 
    history.push(path);
  }

  return (               
          <button className="btn" onClick={routeChange}> Login</button>
  );
}
export default ButtonShowProfil;