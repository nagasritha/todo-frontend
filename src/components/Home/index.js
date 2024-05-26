import {Component} from 'react'
import {Link} from 'react-router-dom'
import {CirclesWithBar} from 'react-loader-spinner'
import {TbFilterCheck} from 'react-icons/tb'
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import Popup from 'reactjs-popup'
import UserDetails from '../UserDetails'
import './index.css'

class Home extends Component{
    state={
        offset:0,
        dataList:[],
        searchText:'',
        status:'loading',
        domain:[],
        gender:[],
        available:'',
        firstName:'',
    lastName:'',
    email:'',
    genderValue:'',
    avatar:'',
    domainValue:'',
    availableValue:0,
    }

    componentDidMount(){
        this.getData()
    }

    getData= async()=>{
        const {offset,searchText,domain,gender,available}=this.state
        let domainValues=null
        let genderValues=null
        if(domain.length===0){
          domainValues=['"Sales"',
          '"Finance"',
          '"Marketing"',
          '"IT"',
          '"Management"',
          '"UI Designing"',
          '"Business Development"',]
        }else{
            domainValues=domain
        }if(gender.length===0){
            genderValues=['"Male"','"Female"','"Agender"']
        }else{
            genderValues=gender
        }
        this.setState({status:'loading'})
        let url=null
        if (searchText!==''){
         url=`https://todoupdatedcode.onrender.com/user/${searchText}`
        }else{
        url=`https://todoupdatedcode.onrender.com/users/?domain=${domainValues.join(',')}&gender=${genderValues.join(",")}&available=${available}&limit=20&offset=${offset}` 
        }
        const fetchData=await fetch(url)
        if(fetchData.ok){
            const data=await fetchData.json()
            let updatedData=null
            if (data.length!==0){
                 updatedData=data.map(item=>({
                    id:item.id,
                    firstName:item.first_name,
                    lastName:item.last_name,
                    email:item.email,
                    avatar:item.avatar,
                    gender:item.gender,
                    domain:item.domain,
                    available:item.available
                }))
                this.setState({dataList : updatedData,status:'success'})
            }
              else{
                this.setState({status:'empty'})
              }
        }else{
        this.setState({status:'failure'})
    }
    }

    updateSearch=(event)=>{
        this.setState({searchText:event.target.value})
    }

    updateDomins=async (event)=>{
      const addremVal=`"${event.target.value}"`  
      if(event.target.checked){
        await this.setState(prevState=>({domain:[...prevState.domain,addremVal]}))
    }
    else{
     await this.setState(prevState=>({domain:prevState.domain.filter(item=>item!==addremVal)}))
    }
    this.getData()
    }

   updateGender=async (event)=>{
    const value=`"${event.target.value}"`
    if (event.target.checked){
       
        await this.setState(prevState=>({gender:[...prevState.gender,value]}))
    }
    else{
        await this.setState(prevState=>({gender:prevState.gender.filter(item=>item!==value)}))
    }
    this.getData()
   }

    fetch=async (offset)=>{
        const url=`https://todoupdatedcode.onrender.com/users/?limit=20&offset=${offset}`
        const response=await fetch(url);
        const data=await (response.json())
        console.log(data.length)
        if(data.length===0){
          return false
        }
        return true 
  
      }
  
    next=async ()=>{
          let {offset}=this.state
          console.log('I am called')
          offset+=20
          const result=await this.fetch(offset)
          console.log(result)
          if (result){
            await this.setState(prevState=>({offset:prevState.offset+20}))
            this.getData()
          }
      }
  
    prev=async ()=>{
          const {offset}=this.state
          if(offset!==0){
              await this.setState(prevState=>({offset:prevState.offset-20}))
          }
          this.getData()
      }

    successView=()=>{
        const {dataList}=this.state
        if(dataList.length!==undefined){
        return  <div className='container'><ul className='row'>
        {dataList.map(item=><UserDetails key={item.id} deleteUser={this.deleteUser} updateCard={this.updateCard} itemDetails={item}/>)}
      </ul></div>
        }
        return <UserDetails itemDetails={dataList}/>
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

    output=()=>{
        const {status}=this.state
        switch(status){
            case 'success':
                return this.successView()
            case 'failure':
                return this.failureView()
            case 'empty':
                return this.emptyView()    
            case 'loading':
                return this.loadingView()
            default:
                return null    
        }
    }

    deleteUser=async (id)=>{
        const url=`https://todoupdatedcode.onrender.com/delete/${id}`
        const data=await fetch(url, {
            method: 'DELETE',
        })
        console.log(data)
        this.getData()
       
    }

    
   updateAvatar=(event)=>{
    this.setState({avatar:event.target.value})
   }

   updateFirstName=(event)=>{
    this.setState({firstName:event.target.value})
   }

   updateLastName=(event)=>{
    this.setState({lastName:event.target.value})
   }

   updateEmail=(event)=>{
    this.setState({email:event.target.value})
   }

   updateGenderValue=(event)=>{
    this.setState({genderValue:event.target.value})
   }

   updateDomainValue=(event)=>{
    this.setState({domainValue:event.target.value})
   }

   updateAvailableValue=(event)=>{
    console.log(event.target.checked)
    const bool= event.target.checked
    let value=null
    if (bool){
        value=1
    }   
    else{
        value=0   
    }
    this.setState({availableValue:value})
   }


updateAvailable=async (event)=>{
    const value=event.target.checked
    console.log(value)
    await this.setState({available:value?1:0})
    this.getData()
}

    check=(value)=>{
        const {domain}=this.state
        const obtainList=domain.filter(item=>item===value)
        return (obtainList.length===0)
    }

    addUser=async (event)=>{
        event.preventDefault()
        const {firstName,lastName,email,genderValue,domainValue,availableValue,avatar}=this.state
        console.log(firstName==="" || lastName==="" )
        if(firstName==="" || lastName==="" || genderValue==="" || email==="" || domainValue==="" || avatar==='' ) {
            this.setState({error:'*Required'})
        }else{
            const userDetails={
                first_name:firstName,
                last_name:lastName,
                email:email,
                gender:genderValue,
                domain:domainValue,
                available:availableValue,
                avatar:avatar,
            }
            const url='https://todoupdatedcode.onrender.com/todoUsers'
            const response=await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
              });
            console.log(response)
            this.getData()
        }
    }
   
    render(){
        const {searchText,firstName,
        lastName,
        email,
        avatar,
        domainValue,error,genderValue
        }=this.state
        
        return <div className='background fluid-container'>
            <nav className='navbar' style={{'position':'fixed'}}>  
                <img src='https://res.cloudinary.com/dkredoejm/image/upload/v1716704994/Employee_logo_a6alnd.png' alt='logo' className='logo'/>
                <div className='group'>
                   <Link to='/group'><MdGroups size={45} color="#FB8C00"/></Link>
                   <Popup trigger={
                        <button type='button' className='functions'><MdOutlineGroupAdd size={40} color='#FB8C00'/></button>
                    } modal>
                       {close=>{
                        return <div className='container d-flex flex-row justify-content-center' >
                            <form onSubmit={this.save} id='User' className='row add-user-form'>
                                <h1>Add New User</h1>
                                <div className='col-12 col-md-6'>
                                    <div className='d-flex flex-column'>
                                        <label htmlFor='avatar'>Avatar</label>
                                        <input id='avatar' placeholder='url-formate' type='text' value={avatar} onChange={this.updateAvatar} list='avatarOptions'/>
                                        <datalist id='avatarOptions'>
                                        <option value="https://robohash.org/sintessequaerat.png?size=50x50&set=set1">https://robohash.org/sintessequaerat.png?size=50x50&set=set1</option>
                                        </datalist>
                                        <p style={{color:'red',display:avatar===''?'flex':'none'}}>{error}</p> 
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='d-flex flex-column'>
                                    <label htmlFor='frn'>First Name </label>
                                    <input id='frn' type='text' value={firstName} onChange={this.updateFirstName}/>
                                    {firstName===''&&<p style={{color:'red'}}>{error}</p>}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className="d-flex flex-column">
                                        <label htmlFor='lsn'>Last Name</label>
                                        <input id='lsn' value={lastName} type='text' onChange={this.updateLastName}/>
                                        {lastName===''&&<p style={{color:'red'}}>{error}</p>}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='d-flex flex-column'>
                                        <label htmlFor='email'>Email</label>
                                        <input id='email' value={email} type='text' onChange={this.updateEmail}/>
                                        {email===''&&<p style={{color:'red'}}>{error}</p>}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div class='d-flex flex-column'>
                                        <label htmlFor='gender'>Gender</label>
                                        <div>
                                            <input name='gender' id='male' type='radio' value='Male' onChange={this.updateGenderValue}/>
                                            <label htmlFor='male'>Male</label>
                                            <input name='gender' id='female' type='radio' value='Female' onChange={this.updateGenderValue}/>
                                            <label htmlFor='female'>Female</label>
                                            <input name='gender' id='agender' type='radio' value='Agender' onChange={this.updateGenderValue}/>
                                            <label htmlFor='agender'>Agender</label>
                                        </div>
                                        {genderValue===''&&<p style={{color:'red'}}>{error}</p>}
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='d-flex flex-column'>
                                        <label htmlFor='domain'>Domain</label>
                                        <input id='domain' value={domainValue} type='text' onChange={this.updateDomainValue}/>
                                        {domainValue===''&&<p style={{color:'red'}}>{error}</p>}
                                    </div>
                                </div>
                        
                        
                        


                        <div>
                            <input type='checkbox' id='available' onChange={this.updateAvailableValue} />
                            <label htmlFor='available'>Availability</label>
                        </div>
                        <div style={{textAlign:'right'}}>
                        <button type='submit'  className='btn btn-primary m-2' onClick={this.addUser}>Add</button>
                        <button onClick={()=>close()} type='button' className='btn btn-danger'>Close</button>
                        </div>
                        </form>
                        </div>
                       }}
                    </Popup>
                </div>
            </nav>
           <div className='body-section row'>
           <div className='filterBoard filter-boarder-form col-12 col-md-4 col-lg-3'>
            <form id='filterSection' className='filterForm'>     
                <h1><TbFilterCheck size={30}/>Filters</h1>
                    <div className='col-12 col-sm-6 col-md-12'>
                    <h1>Category</h1> 
                    <div>
                    <input type='checkbox' id='Sales' value="Sales" onChange={this.updateDomins}/>
                    
                    <label htmlFor='Sales'>Sales</label>
                    </div>
                    <div>
                    <input type='checkbox' id='Finance' value="Finance" onChange={this.updateDomins}/>
                    <label htmlFor='Finance'>Finance</label>
                    </div>
                    <div>
                    <input type='checkbox' id='it' value="IT" onChange={this.updateDomins}/>
                    <label htmlFor='it'>IT</label>
                    </div>
                    <div>
                    <input type='checkbox' id='Management' value="Management" onChange={this.updateDomins}/>
                    <label htmlFor='Management'>Management</label>
                    </div>
                    <div>
                    <input type='checkbox' id='ui' value="UI Designing" onChange={this.updateDomins} selected/>
                    <label htmlFor='ui'>UI Designing</label>
                    </div>
                    <div>
                    <input type='checkbox' id='business' value="Business Development" onChange={this.updateDomins} />
                    <label htmlFor='business'>Business Development</label>
                    </div>
                   
                    </div>
                    <div className='col-12 col-sm-6 col-md-12'>
                    <h1>Gender</h1>
                    <div>
                    <input type='checkbox' id='Male' value="Male" onChange={this.updateGender}/>
                    <label htmlFor='Male'>Male</label>
                    </div>
                    <div>
                    <input type='checkbox' id='Female' value="Female" onChange={this.updateGender} selected/>
                    <label htmlFor='Female'>Female</label>
                    </div>
                    <div>
                    <input type='checkbox' id='Agender' value="Agender" onChange={this.updateGender} />
                    <label htmlFor='Agender'>Agender</label>
                    </div>
                    <div style={{paddingTop:'30px'}}>
                    <input type='checkbox' id='yes'  onChange={this.updateAvailable}/>
                    <label htmlFor='yes' style={{fontSize:'20px'}}>Available</label>
                    </div>
                    </div>
                
            </form>
           </div>
           <div className='p-3 col-12 col-md-8 col-lg-9'>
           <div className='d-flex flex-row justify-content-center'>
           <div className='flex-justify-content-center bg-light search mt-3 rounded text-center w-75'>
            <input type='search' onChange={this.updateSearch} value={searchText} placeholder='search specific user' className="search-input w-100"/>
            <button onClick={this.getData} className='btn btn-primary' style={{padding:'5px'}}>Search</button>
          </div>
           </div>
           <div>
            {this.output()}
           </div>
            <div className='flex-align-center'>
                <button type='button' onClick={this.prev} className='btn btn-primary text-white'>&lt;</button>
                <button type='button' onClick={this.next} className='btn btn-primary text-white'>&gt;</button> 
            </div>
           </div>
           </div>
        </div>
    }
}

export default Home