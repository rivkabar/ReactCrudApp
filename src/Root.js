import React, { Component } from 'react';
import Products from './products/products';

class Root extends Component {
  render() {
    var containerStyle = {
      width: 'inherit'
    }

    debugger
    return (
      < div className="panel panel-primary" >
        <div className="panel-heading">
          Products List
        </div>
        <div className="panel-body"  >
          <div className='container-fluid' style={containerStyle}>
            <div>
              <Products numberOfColumns={Array(4).fill(0)} />
            </div>
          </div >
        </ div>
      </ div>
    );
  }
}

export default Root;
