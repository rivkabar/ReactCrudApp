import React from 'react';
import axios from 'axios';
import './product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingComponent from './LoadingComponent';
import { Link } from 'react-router-dom';
const ProductsAPI = 'http://localhost:4500/products';
const CategoriesAPI = 'http://localhost:4500/categories';
const fixedPrice =2;
class Products extends React.Component {
    constructor(props) {
        debugger
      super(props);
      this.state = {
        data: [],
        isLoading:true,
        categories:[],
        filterList:[],  
        search:'',
        categoty:'',
        sort:''
      }
      this.handleChange = this.handleChange.bind(this);
      this.catagotyChange= this.catagotyChange.bind(this);
      this.sortChange = this.sortChange.bind(this);
      this.Search = this.Search.bind(this);
    }
    
   
    componentDidMount() {
        var config = 
        {
            headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'no-cache',
            'Connection':'close'}
          };
        //calling multiply req
        axios.all([axios.get(ProductsAPI,config),axios.get(CategoriesAPI,config)])
        .then(axios.spread(( productResponse,categoriesResponse)=>{
            console.log(config.headers);
            debugger
            this.setState({
                data:productResponse.data,
                categories:categoriesResponse.data,
                filterList:productResponse.data
            });
        })).catch(function(error){
            console.log('http call failed error: '+error);
        }).finally(()=>
        this.setState({
            isLoading:false
        }));
    }
    
    handleChange(event)
    { 
        debugger
        this.setState({search: event.target.value});
        
    }
    Search(event){
        //if typed search
            var filterName = this.state.search? this.state.search.toLowerCase() :null;
            var filterArray = filterName? this.state.data.filter((p,index)=>
                p.name.toLowerCase().indexOf(filterName)!==-1):this.state.data ; 
                this.setState({filterList:filterArray});
    }

    catagotyChange(event){
        var filterArray;
        var filterCategoty = event.target.value;
        if(filterCategoty!=='All')
        {
            //finding selected  categoryid 
            var categotyid = this.state.categories.find((c,index)=>{
                if(c.name===event.target.value)
                    return true;
                return false;
            }).id;
            
            filterArray= this.state.filterList.filter((p,index)=>
                p.categoryId===categotyid);
            this.setState({
                filterList: filterArray,
            });
        }
        this.setState({category:event.target.value});      
    }
    sortChange(event){

        var filterAray 
        if(event.target.value==='Price')
        {
            filterAray =  this.state.filterList.sort(function (a, b) {
                return a.price - b.price;
            });
        }
        if(event.target.value==='Name')
        {
            filterAray= this.state.filterList.sort(function (a, b) {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; 
            });
        }
        this.setState({
            sort:event.target.value,
            filterList:filterAray
        });

    }
    render() {
        
     return (
            <div>
                <div className='row' >
                    <div className='col-auto mr-auto' >
                        <input type='text' placeholder="Search" className='search'  defaultValue ="" onChange={this.handleChange}/>
                        <button className='btn btn-primary SearchMargin' onClick={this.Search}>
                            Search
                        </button>
                        <span className= 'MarginLeft' >
                            <label className="control-label LabelPadding" >Category</label>
                            <span>
                                {this.state.isLoading ? <LoadingComponent /> : (
                                    <select id="selectCategoryId" name='Categoty' onChange={this.catagotyChange} >
                                        <option hidden selected >Categoty</option>
                                        <option>All</option>
                                        {this.state.categories.map((c, index) => {
                                
                                            return (
                                                <option key={index}>{c.name}</option>
                                            )
                                        })}
                                    </select>
                                )}

                            </span>
                            <label className="control-label PaddingLeft"  >Sort</label>
                            <span>
                                <select id="sortID" name='Sort' onChange={this.sortChange} >
                                    <option hidden selected  >Sort</option>
                                    <option value='Name'>Name</option>
                                    <option value='Price'>Price</option>
                                    <option value='Rate'>Rate</option>
                                </select>
                            </span>
                        </span>
                    </div>
                </div>
                <div >
                    {this.state.isLoading ? <LoadingComponent /> : (
                       
                            <div  className='row' >
                               
                                {this.state.filterList.map((p, index) => {
                                     
                                      var category=  this.state.categories.find(value=>{
                                          
                                        if(value.id === p.categoryId)
                                            return true;
                                        return false
                                        });                   
                                                    return(
                                                        
                                                        <div className='col-md-3'>
                                                            <Product product={p} categortyName={category} refresh= {true}  />
                                                        </div>
                                                    )                                      
                                })}                                                                                                                 
                            </div>
                        
                    )}
                </div>
            </div>)
    }
}
  export default Products;
  
  class Product extends React.Component{
      
      constructor(props){
          debugger
        super(props);
        this.state= {
            id:props.product.id,
            name:props.product.name,
            categoryId:props.product.categoryId,
            price: Number.isInteger(props.product.price)?props.product.price: Number.parseFloat( props.product.price).toFixed(fixedPrice),
            image:props.product.image,
            categoryName:props.categortyName.name,
            refresh:null
        }
      }
     
      //force childe to rerender
      componentWillReceiveProps(props) {
        if (props.refresh )
        {
            this.setState({
                id:props.product.id,
                name:props.product.name,
                categoryId:props.product.categoryId,
                price:Number.isInteger(props.product.price)?props.product.price: Number.parseFloat( props.product.price).toFixed(fixedPrice),
                image:props.product.image,
                categoryName:props.categortyName.name
              });
              
        }
      }
      
      render(){          
          return( 
            <div className ='itemborder'> 
              <img src = {this.state.image}  className='imageStyle' title={this.state.name} alt = {this.state.name}></img>         
              <div className= 'paddingBetweenLines'>{this.state.name}</div>
              <div className= 'paddingBetweenLines'> $ {this.state.price} </div>
              <div className='paddingBetweenLines'>
                    <span>{this.state.categoryName}
                        <Link to={`/products/${this.state.id}`}> 
                            <button className='btn btn-primary EditMargin'>
                                            Edit
                            </button>
                        </Link>
                    </span>
              </div>
                
                
            </div>
          )
      }
    }
   