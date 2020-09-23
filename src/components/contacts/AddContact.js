import React, { Component } from 'react'
import {Consumer} from '../context';
import TextInputGroup from '../helpers/textInputGroup';
import axios from 'axios'
  class AddContact extends Component {
     state = {
          name: '',
          phone: '',
          email: '',
          errors: {}
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

      const newContact = {
        name,
        phone,
        email
          }
      /*axios.post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(res => dispatch({
        type: 'ADD_CONTACT',
        payload: res.data
       }))*/
       try {const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
       dispatch({
        type: 'ADD_CONTACT',
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
                                <h4 class="card-title">Add contact:</h4>
                                <div class="card-text"> 
                                   <TextInputGroup label = "Name" name = "name" type = "text" value = {name} onChange = {this.onChangeInput} error = {errors.name} />
                                   <TextInputGroup label = "num" name = "phone" type = "text" value = {phone} onChange = {this.onChangeInput} error = {errors.phone} />
                                   <TextInputGroup label = "email" name = "email" type = "email" value = {email} onChange = {this.onChangeInput} error = {errors.email} />
                                   <button className="btn btn-block btn-success">Add new contact</button>
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

export default  AddContact;