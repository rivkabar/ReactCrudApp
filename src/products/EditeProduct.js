import React from 'react';
import axios from 'axios';
import './product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './EditProduct.css';
import LoadingComponent from './LoadingComponent';
const ProductsAPI = 'http://localhost:4500/products/';
const CategoriesAPI = 'http://localhost:4500/categories/';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
          debugger
        this.state = {
          data:[],
          categoryId: '',
          isLoading:'',
          categories:[],
          name:'',
          price:'',
          productPriceError:'',
          ProductNameError:'',
          isTodisable:'',
        }
    }
    change =  e=>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
     

    validate= ()=>
        {
      
            const Maxname = 50;
            let isError =false;
            const errors = {
                ProductNameError:'',
                productPriceError:''
            };

            if(this.state.name===''|| this.state.name===null)
            {
                isError =true;
                errors.productNameError = "product name is required!"
            }
            if(this.state.price===''|| this.state.price===null)
            {
                isError =true;
                errors.productPriceError = "product price is required!"
            }
            if(this.state.name.length ===1 || this.state.name.length > Maxname )
            {
                isError = true;
                errors.productNameError = "product name must be at least higher than one char and smaller than " +Maxname.toString();
            }
            if(this.state.price <= 0 ||this.state.price.toString().startsWith('0')===true)
            {
                isError =true;
                errors.productPriceError = "product price must be higher than zero!"
            }
            if(isError)
            {
                this.setState(
                    {
                        productNameError:errors.productNameError,
                        productPriceError:errors.productPriceError,
                        isTodisable:true
                    }
                );
            }
            else{
                this.setState(
                    {
                        productNameError:errors.productNameError,
                        productPriceError:errors.productPriceError,
                        isTodisable:false
                    }
                );
            }
            return isError
        }
        Onblure= e =>{
            this.validate();
        }
        catagotyChange = (e)=>{
            debugger
            let categotySelected =this.state.categories.find(c=>{
                return (c.name === e.target.value);
            });
            this.setState({categoryId:categotySelected.id});
        }
        onDelete= (e)=>{
            const err = this.validate();
            var url = ProductsAPI +this.state.data.id;
            if(!err)
            {
                axios.delete(url,{"Content-Type":'text/plain'})
                .then(res=>res)
                .catch(error=>{
                    console.log("delet http req error: "+error);
                    alert("Delete product has failed!")
                });               
               //return to products
                this.props.history.push('/products');
            }
        }

        
        onSubmit= (e)=>{
            e.preventDefault();
            
            //submit and 
            //goback to products
            const err = this.validate();
            if(!err)
            {
                  debugger
                  var url = ProductsAPI +this.state.data.id;
                axios.put(url,
                    {
                        price:this.state.price,
                        name:this.state.name,
                        image: this.state.data.image,
                        categoryId:this.state.categoryId
                    })
                .then(res =>
                    {
                       console.log( res);
                    }
                ).catch(error=>{
                    console.log("post/put http req error: "+error.message);
                    alert("Update product has failed!")
                });               
                this.props.history.push('/products');
                
            }
        }
    render(){
        return(
            <div>
                {this.state.isLoading ? <LoadingComponent /> : (
                    <div className="panel">
                        <div className="panel-heading PanelHeaderBackGround">
                            {this.state.name}
                        </div>

                        <div className="panel-body">
                            <form className="form-horizontal"
                                noValidate
                            >
                                <fieldset>
                                    <div className="form-group" >
                                        <label className=" LableTextAlign col-md-2" >Product Name</label>
                                        <div className="col-md-8">
                                            <input className="form-control"
                                                id="nameId"
                                                type="text"
                                                value={this.state.name}
                                                name="name" 
                                                onChange ={e => this.change(e)} 
                                                onBlur = {e=>this.Onblure(e)}                                          
                                            />
                                            <span className="help-block" >
                                               {this.state.productNameError}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group" >
                                        <label className="LableTextAlign col-md-2" >category</label>
                                        <div className="col-md-8">
                                            <select id="selectCategoryId" name='Categoty' onChange={e=>this.catagotyChange(e)} className='SelectCategoryEdit' >                                                                                        
                                                {this.state.categories.map((c, index) => {
                                                    let object = this;
                                                      let  isSelected = (c.id===object.state.categoryId)?true:false;
                                                    return (
                                                        <option selected ={isSelected}  key={index}>{c.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="LableTextAlign col-md-2">Price</label>
                                        <div className="col-md-2">
                                            <input className='PricewithInEdit'
                                                id="productPriceId"
                                                type="text"
                                                value =  {this.state.price}
                                                name = "price"
                                                onChange ={e => this.change(e)}
                                                onBlur = {e=>this.Onblure(e)}
                                            />
                                            <span> $</span>
                                            <span className="help-block" >   
                                               {this.state.productPriceError}       
                                            </span>                                                                                                         
                                        </div>
                                    </div>

                                    <div className="form-group">
                                    <div className='row'>
                                    <div className="col-md-4">
                                                <span>
                                                    <button className="btn btn-primary DeleteButtonMargin "
                                                        style={{ width: "80px" }}
                                                        onClick={e => this.onDelete(e)}>
                                                        Delete
                                                </button>
                                                </span>
                                            </div>
                                        <div className="col-md-4">           
                                            <span>
                                                <Link to = {`/products`} >
                                                    <button className="btn btn-primary CancelButtonMargin" >                                                  
                                                        Cancel
                                                    </button>
                                                </Link >
                                            </span>
                                        </div>   
                                            <div className="col-md-4">
                                                <span>
                                                    <button className="btn btn-primary SaveButtonMargin"

                                                        type="button"
                                                        disabled={this.state.isTodisable}
                                                        onClick={e => this.onSubmit(e)}>
                                                        Update
                                            </button>
                                                </span>
                                            </div>
                                        </div>       
                                    </div>
                                </fieldset>
                            </form>
                            <div className='has-error'></div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    
    componentDidMount() {
        debugger
        const { match: { params } } = this.props;
        
        axios.all([axios.get(ProductsAPI+params.id,{
            "Content-Type":'text/plain',
            'Cache-Control': 'no-cache'}),axios.get(CategoriesAPI)])
        .then(axios.spread(( productResponse,categoriesResponse)=>{
            debugger
            this.setState({
                data:productResponse.data,
                categories:categoriesResponse.data,
                name:productResponse.data.name,
                price:productResponse.data.price,
                isTodisable:false,
                categoryId:productResponse.data.categoryId,
                isLoading:true,
            });
        })).catch(function(error){
            console.log('http call failed error:'+error);
        }).finally(()=>
        this.setState({   
            isLoading:false
        }));
    }

 }

export default EditProduct;