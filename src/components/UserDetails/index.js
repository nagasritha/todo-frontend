import {Component} from 'react'
import {AiFillDelete,AiFillEdit,AiOutlinePlus} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import './index.css'

class UserDetails extends Component{
   state={
    id:0,
    firstName:'',
    lastName:'',
    email:'',
    gender:'',
    avatar:'',
    domain:'',
    available:'',
    result:''
   }
    
   componentDidMount(){
    const {itemDetails}=this.props
    const {id,firstName,lastName,gender,email,avatar,domain,available}=itemDetails
    this.setState({
        id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        gender:gender,
        avatar:avatar,
        domain:domain,
        available:available})
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

   updateGender=(event)=>{
    this.setState({gender:event.target.value})
   }

   updateDomain=(event)=>{
    this.setState({domain:event.target.value})
   }

   updateAvailable=(event)=>{
    console.log(event.target.checked)
    const bool= event.target.checked
    let value=null
    if (bool){
        value=1
    }   
    else{
        value=0   
    }
    this.setState({available:value})
   }

   save=async (event)=>{
    event.preventDefault()
    const {id,firstName,lastName,email,domain,available,gender,avatar}=this.state
    const userDetails={
        first_name:firstName,last_name:lastName,avatar,email,gender,domain,available}
    console.log(userDetails)
    const url=`https://todoupdatedcode.onrender.com/users/${id}`
    
   const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      if(response.ok){
        this.updateResult("updated successfully");
      }else{
        this.updateResult("Failed to update please check your inputs");
      }

    
    }

    updateResult=(message)=>{
        this.setState({result : message})
    }

    addData=async ()=>{
        const {firstName,lastName,gender,email,avatar,domain,available}=this.state
        const user={
            "first_name":firstName,
            "last_name":lastName,
            "gender":gender,
            "email":email,
            "avatar":avatar,
            "domain":domain,
            "available":available
        }
        const url="https://todoupdatedcode.onrender.com/usersGroup"
        const options={
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(user)
        }
        const details=await fetch(url,options)
        const responseData=await details.json()
        console.log(responseData)
    }
   
    render() {
        const {itemDetails,deleteUser}=this.props
        const {id}=itemDetails
        const {firstName,lastName,gender,email,avatar,domain,available,result}=this.state
        console.log(result);
        const text=available===1?'Available':'Not-Available'
        const deleteCard=()=>deleteUser(id)
        return (
           <div className='col-12 col-md-6 mt-3'>
             <li className='card p-3'>
                <div className='text-center'>
                <img src={avatar} alt={firstName} className='image-profile'/>
                </div>
                <h3 style={{color:"#050838",fontFamily:"Bahnschrift Condensed"}}>{`${firstName} ${lastName}`}</h3>
                <p><b>gender: </b>{gender}</p>
                <p><b>Email: </b>{email}</p>
                <p><b>Domain: </b>{domain}</p>
                <p><b>Status: </b>{text}</p>
                <div className='search'>
                    <div className='functionss'>
                    <Popup trigger={
                        <button type='button' className='functions'><AiFillEdit size={50} color='blue'/></button>
                    } modal>
                       {close=>{
                        return <div class='container'>
                            <form onSubmit={this.save} id='UserDataSection' className='row add-user-form'>
                            <div className='col-12 col-md-6'>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='avatar' className='d-flex align-items-center'>
                                    <img src={avatar} alt={firstName} className='profile'/>
                                    <p>Avatar</p></label>
                                    <input id='avatar' type='text' value={avatar} onChange={this.updateAvatar}/>
                                </div>
                            </div>        
                            <div className="col-12 col-md-6">
                                <div className='d-flex flex-column'>
                                    <label htmlFor='frn'>First Name </label>
                                    <input id='frn' type='text' value={firstName} onChange={this.updateFirstName}/>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='lsn'>Last Name</label>
                                    <input id='lsn' value={lastName} type='text' onChange={this.updateLastName}/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className='d-flex flex-column'>
                                    <label htmlFor='email'>Email</label>
                                    <input id='email' value={email} type='text' onChange={this.updateEmail}/>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='d-flex flex-column'>
                                    <label htmlFor='gender'>Gender</label>
                                    <div>
                                        <input name='gender' id='Male' type='radio' value='Male' onChange={this.updateGender}/>
                                        <label htmlFor='Male'>Male</label>
                                        <input name='gender' id='Female' type='radio' value='Female' onChange={this.updateGender}/>
                                        <label htmlFor='Female'>Female</label>
                                        <input name='gender' id='Agender' type='radio' value='Agender' onChange={this.updateGender}/>
                                        <label htmlFor='Agender'>Agender</label>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className="d-flex flex-column">
                                    <label htmlFor='domain'>Domain</label>
                                    <input id='domain' value={domain} type='text' onChange={this.updateDomain}/>
                                </div>
                            </div>
                        <div>
                            <input type='checkbox' id='available' onChange={this.updateAvailable} checked={available===1?true:false}/>
                            <label htmlFor='available'>Availability</label>
                        </div>
                        <div style={{textAlign:'right'}}>
                        <button type='submit'  className='btn btn-primary m-2'>Save</button>
                        <button onClick={()=>close()} type='button' className='btn btn-danger'>Close</button>
                        </div>
                        <p className={result==="updated successfully" ? "text-success":"text-warning"}><b>{result}</b></p>
                        </form>

                        </div>
                       }}
                    </Popup>
</div>
                    <button type='button' onClick={deleteCard} className='functions'><AiFillDelete size={50} color='red'/></button>
                </div>
            </li>
           </div>
        )
        }


    
}

export default UserDetails