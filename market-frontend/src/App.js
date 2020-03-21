import React from 'react';
import Toolbar from "./components /UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import MainPage from "./containers /MainPage /MainPage";
import Register from "./containers /Register /Register";
import Login from "./containers /Login /Login";
import NewItem from "./containers /NewItem/NewItem";
import ProductInfo from "./containers /ProductInfo/ProductInfo";

const App = () => {
  return (
      <>
        <header>
          <Toolbar/>
        </header>
        <Container className='mt-5'>
          <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/categories/:name' exact component={MainPage}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/newItem' exact component={NewItem}/>
              <Route path='/:id' exact component={ProductInfo}/>
            <Route render={()=> <h1>Not Found</h1>}/>
          </Switch>
        </Container>
      </>
  );
};

export default App;