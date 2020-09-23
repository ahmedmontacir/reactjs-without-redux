import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from '../context';
import {Link} from 'react-router-dom';
import './contact.css'
import axios from 'axios'
 class Contact extends Component {
    state = {
        showcontenttoggle: false
    }
    showcontent(message) {
        console.log("detected :", message)

        this.setState({
            showcontenttoggle: !this.state.showcontenttoggle
        })
    }

    deleteclick = async (id,dispatch) => {
        console.log("deleted :");
       /*axios.delete('https://jsonplaceholder.typicode.com/users/'+id)
        .then(res => dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        }) )
        .catch(err => console.error(err));*/
        try {const res = axios.delete('https://jsonplaceholder.typicode.com/users/'+id)
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        })}
        catch(e){
            console.error(e)
        }
       
    }
   

    render() {
        const {id,name,phone,email} = this.props.data;
        return (
           <Consumer>
               {value => {
                const {dispatch} = value;
                return (
                    <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        {name} <i onClick = {this.showcontent.bind(this,name)} className="fa fa-sort-down"></i>
                        <i onClick = {this.deleteclick.bind(this,id,dispatch)} style = {{color:'red', float:'right',cursor:'pointer'}}className="fa fa-times"></i>
                        <Link to= {'/contacts/editcontact/'+id}> 
                        <i style = {{color:'blue', float:'right',cursor:'pointer',marginLeft: '9px'}}className="fa fa-pencil"></i>
                        </Link>
                    </h4>
                    <p className="card-text">
                        { (this.state.showcontenttoggle) ? (<ul className="list-group">
                            <li className="list-group-item">{phone}</li>
                            <li className="list-group-item">{email}</li> 
                        </ul>
                        ) : null}
                        
                    </p>
                </div>
            </div>
             )}}
           </Consumer>
           
        )
    }
}

Contact.defaultProps = {
    name: "anonymous",
    num: "555555",
    gmail: "a@gmail.xom"
}
Contact.propTypes = {
    data: PropTypes.object.isRequired,
    deletecontactfromchild: PropTypes.func.isRequired
}


export default Contact;