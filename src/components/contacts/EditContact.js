import React, { Component } from 'react'
import {Consumer} from '../context';
import TextInputGroup from '../helpers/textInputGroup';
import axios from 'axios'
  class  EditContact extends Component {
     state = {
          name: '',
          phone: '',
          email: '',
          errors: {}
      }

      async componentDidMount(){
         try{const id = this.props.match.params.id
         const res = await axios.get('https://jsonplaceholder.typicode.com/users/'+id)
         this.setState({
             name: res.data.name,
             phone: res.data.phone,
             email: res.data.email
         })}
         catch(e){
             console.error(e);
         }
      }
      onChangeInput = (e) => {
          this.setState({ [e.target.name]: e.target.value})
      }
      submit = async (dispatch,size, e) => 
      {
       e.preventDefault();
       const {name,phone,email,errors} = this.state

      if(name == ""){
          this.setState({errors: {name:"name is required"}})
          return;
      }
      if(phone == ""){
        this.setState({errors: {num: "num is required"}})
        return;
      }
     if(email == ""){
        this.setState({errors: {gmail: "email is required"}})
        return;
      }

      const updateContact = {
        name,
        phone,
        email
          }
      
      /*axios.post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(res => dispatch({
        type: 'ADD_CONTACT',
        payload: res.data
       }))*/
       const id = this.props.match.params.id
       try {const res = await axios.put('https://jsonplaceholder.typicode.com/users/'+id, updateContact)
       dispatch({
        type: 'EDIT_CONTACT',
        payload: res.data
       })}
       catch(e){
           console.error(e)
       }

      this.setState({
        name: '',
        phone: '',
        email: '',
        errors: {}
      })

      this.props.history.push('/');

     }

       render() {
        const {name,phone,email,errors} = this.state
        return (
            <Consumer>
            {value => {
                const {dispatch} = value;
                return (
                    <div>
                        <form onSubmit ={this.submit.bind(this, dispatch,value.contacts.length)} action="">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Update contact:</h4>
                                <div class="card-text"> 
                                   <TextInputGroup label = "Name" name = "name" type = "text" value = {name} onChange = {this.onChangeInput} error = {errors.name} />
                                   <TextInputGroup label = "num" name = "phone" type = "text" value = {phone} onChange = {this.onChangeInput} error = {errors.phone} />
                                   <TextInputGroup label = "email" name = "email" type = "email" value = {email} onChange = {this.onChangeInput} error = {errors.email} />
                                   <button className="btn btn-block btn-primary">Update contact</button>
                                </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                )
            }
            }
            </Consumer>
        )
        return 
    }
}

export default  EditContact;