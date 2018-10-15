import React from 'react';
import './styles.css';
class LoadingComponent extends React.Component{
    render(){

        return(
             <span className='glyphicon-refresh glyphicon-spin spinner'></span>
            //<div>Loading...</div>
        )
    }
}
export default LoadingComponent;