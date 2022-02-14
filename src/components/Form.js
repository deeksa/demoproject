import React,{Component} from 'react'
import UserDataElement from './UserDataElement'
import {v4  as uuidv4} from 'uuid' ;
import axios from 'axios'
import './Form.css' 
class Form extends Component{
    constructor(props){
        super(props)
    this.state={
        List1:[],
        id:uuidv4(),
        firstname:"",
        lastname:"",
        mail:"",
        dateofbirth:""
        //toggle:true
    }
    this.deletedata.bind(this);
}
componentDidMount(){
    axios.get('http://localhost:8080/name')
    .then(response=>{
        console.log(response)
        this.setState({List1:response.data})
    })
    .catch(error=>{
        console.log(error)
    })
}
    onClickFirstName=event=>{
        this.setState({firstname:event.target.value})
    }
    onClickLastName=event=>{
        this.setState({lastname:event.target.value})
    }
    onClickEmailName=event=>{
        this.setState({mail:event.target.value})
    }
    onClickDateOfBirth=event=>{
        this.setState({dateofbirth:event.target.value})
    }
    onSubmitClick=event=>{
        event.preventDefault()
        
       

        //const {Firstname,Lastname,Emailid,Dateofbirth}=this.state 
       // this.setState({Firstname:""})
        
       const {firstname,lastname,mail,dateofbirth}=this.state 
       const newData={
           id:uuidv4(),
           //id:id,
           firstname:firstname,
           lastname:lastname,
           mail: mail,
           dateofbirth:dateofbirth
           
           

       }
       //console.log(newData)
       
       
       this.setState(prevstate=>({
           List1:[...prevstate.List1,newData],
           firstname:"",
           lastname:"",
           mail:"",
           dateofbirth:""
           
           
       }))
       
       axios.post('http://localhost:8080/set',newData)
      
    .then(response=>{
        console.log(response)
        //this.setState({List1:response.data})
    })
    .catch(error=>{
        console.log(error)
    }) 

     //  this.setState(prevstate=>({
          // id:prevstate.id+1
       //}))
       //console.log(newData)
       
      
    
    }
    deletedata=(id)=>{
        
        this.setState(precState =>({
              List1:precState.List1.filter(each=>
                id!==each.id)
       }))
       // }))
        //const {data1}=this.state
       // alert(id);
        console.log(id)

       axios.delete(`http://localhost:8080/delete/${id}`)
       
      /*  axios.get('http://localhost:8080/name')
    .then(response=>{
        console.log(response)
        this.setState({List1:response.data})
    })
    .catch(error=>{
        console.log(error)
    })  */

    
    }
    
    editdata=(id)=>{
      const {firstname,lastname,mail,dateofbirth}=this.state 
      const {newData}=this.state
      const {List1}=this.state 
      const userList=List1.map(each=>{
        if(id===each.id){

       this.setState({firstname:each.firstname,
                        lastname:each.lastname,
                        mail:each.mail,
                        dateofbirth:each.dateofbirth

        
        }) 
        
      }
    })
    axios.delete(`http://localhost:8080/delete/${id}`)
        //this.setState({
         //   List1:userList
            
            //Firstname:List1.Firstname
       // })
   
       /*axios.post(`http://localhost:8080/updatename/${id}`)
    .then(response=>{
       // console.log(response)
        this.setState({List1:response.data})
    })
   .catch(error=>{
        console.log(error)
    }) */
   
   
   
    }

    

    render(){
        const {List1,firstname,lastname,mail,dateofbirth}=this.state
        
        
        return(
            <div>
            <form>
            <button type="submit" className='but2' onClick={this.onSubmitClick}>save</button>
            <div className='div1'>
                <div className='div2'>
                    <div className='space1'>
                    <lable>First Name</lable>
                    <input type="Text" onChange={this.onClickFirstName} value={firstname}/>
                </div>
                
                <div className='space1'>
                    <lable>Last Name</lable>
                    <input type="Text" onChange={this.onClickLastName} value={lastname}/>
                </div>
                </div>
                <div className='div2'>
                <div className='space1'>
                    <lable>Email Id</lable>
                    <input type="Text" onChange={this.onClickEmailName} value={mail}/>
                </div>
                <div className='space1'>
                    <lable>Date Of Birth</lable>
                    <input type="Date" onChange={this.onClickDateOfBirth} value={dateofbirth}/>
                </div>
                </div>
                </div>
            </form>
            <p>User List</p>
            <hr/>
            <table>
                  <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>EmailId</th>
                  <th>DateOfBirth</th>
                  <th>Action</th>

                </tr>
                {List1.map(each=>(
                    <UserDataElement key={each.id} Details={each} deletedata={this.deletedata} editdata={this.editdata}/>
                ))}
                

            </table>
            </div>
            
            
            
  
        )
    }
}
export default Form