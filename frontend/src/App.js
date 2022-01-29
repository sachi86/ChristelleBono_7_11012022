import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import Feed from './pages/feed.page';
import Home from './pages/home.page';
import UpdateProfil from './pages/updateProfil.page';
import Footer from './components/footer/footer.component';

function App() {
  return (
        <div>
          <Header/>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/feed' exact component={Feed} />
                <Route path='/updateprofil' exact component={UpdateProfil} />
                <Redirect to='/' />
            </Switch>
          <Footer/>
        </div>
);
}

export default App;
