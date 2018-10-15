import React, { Component } from 'react';
import {Route} from "react-router";
import {BrowserRouter,Switch} from 'react-router-dom';
import Root from './Root';
import EditProduct from './products/EditeProduct';

class App extends Component {
  render() {
   
    return ( 
      <div >    
          <BrowserRouter>
            <Switch>
              <Route  path={"/"} exact render={props => <Root {...props} />} />
              <Route  path={"/products"} exact render={props => <Root {...props} />} />
              <Route  path={"/products/:id"}  exact render={props => <EditProduct {...props} />} />
            </Switch> 
          </BrowserRouter>  
                
    </div>
     );
  }
}

export default App;
