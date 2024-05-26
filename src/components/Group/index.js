import { Component } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import {AiFillDelete} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

class Group extends Component{
    state={
        dataList:[],
        status:"loading"
    }

    componentDidMount(){
        this.getdata()
    }

    getdata=async()=>{
        this.setState({status:"loading"})
        const data=await fetch("https://todoupdatedcode.onrender.com/usersGroup")
        const dataResponse=await data.json()
        console.log(dataResponse)
        if(data.ok){
            if(dataResponse.length===0){
               return this.setState({status:'empty'})
            }
            return this.setState({status:'success',dataList:dataResponse.map(item=>({
                id:item.id,
                firstName:item.first_name,
                lastName:item.last_name,
                avatar:item.avatar,
                gender:item.gender,
                domain:item.domain,
                available:item.available,
                email:item.email
            }))})
        }return this.setState({status:'failure'})        
    }

    failureView=()=><div className='align-center'>
        <h2>Something went wrong, Please try again</h2>
        <button type='button' onClick={this.getData} className='pagination-buttons'>Retry</button>
    </div>

    emptyView=()=><div className='align-center'>
    <img src='https://res.cloudinary.com/dkredoejm/image/upload/v1699463696/empty_dpwv00.png' alt='empty' className='empty'/>
    <h2 style={{color:'white'}}>It's empty, Nothing to display here</h2>
    </div>

    loadingView=()=><div className='align-center'>
        <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
    </div>

    deleteCard=async (id)=>{
     const url=`https://todoupdatedcode.onrender.com/removeUser/${id}`
     await fetch(url,{method:'DELETE'})
     this.getdata()
    }

    displayCard=(item)=>{
        const {id,firstName,lastName,avatar,gender,email,domain,available}=item
        const text=available?'Available':"Not-Available"
        return <div class='row p-5'>
             <li className='card col-12 col-md-6 col-lg-4 p-3'>
            <div className="text-center">
            <img src={avatar} alt={firstName} className='image-profile'/>
            </div>
            <h3 className='text-primary'>{`${firstName} ${lastName}`}</h3>
            <p><b>gender: </b>{gender}</p>
            <p><b>Email: </b>{email}</p>
            <p><b>Domain: </b>{domain}</p>
            <p><b>Status: </b>{text}</p>
        <button type='button' onClick={()=>this.deleteCard(id)} className='functions'><AiFillDelete size={50} color='red'/></button>
        </li>          
        </div>
    }

    success=()=>{
        const {dataList}=this.state
        console.log(dataList)
        return <ul>
            {dataList.map(item=>this.displayCard(item))}
        </ul>
    }

    getResult=()=>{
     const {status}=this.state
     switch(status){
        case 'loading':
            return this.loadingView()
        case 'success':
            return this.success()
        case 'failure':
            return this.failureView()
        case 'empty':
            return this.emptyView()     
        default:
            return null           
     }
    }

    render(){
        return <div className='background' style={{padding:"10px"}}>
            <h1 style={{color:'white'}}>Group Members</h1>
            {this.getResult()}
            <div style={{textAlign:'right'}}>
                <Link to='/'>
                    <button type="button" className='butt'>Back</button>
                </Link>
            </div>
        </div>
    }
}

export default Group