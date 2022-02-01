import React from 'react';
import { useHistory } from "react-router-dom";

function ButtonUpdateProfil() {
  
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/updateprofil`; 
    history.push(path);
  }

  return (               
          <button className="btn" onClick={routeChange}> Modifier profil</button>
  );
}
export default ButtonUpdateProfil;