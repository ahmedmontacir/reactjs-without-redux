import React, { Component } from 'react'
import axios from 'axios'
const Context = React.createContext();
const reducer = (state,action) => {
    switch (action.type) {
        case  "DELETE_CONTACT":
            
            return {
                contacts: state.contacts.filter((contact) => contact.id !== action.payload)
            };

            case  "ADD_CONTACT":
            
                return {
                   contacts: [action.payload, ...state.contacts]
                };

            case  "EDIT_CONTACT":
        
                return {
                    contacts: state.contacts.map(contact => contact.id === action.payload.id ? contact = action.payload : contact)
                };
    
        default:
            return state;
    }
}
export  class Provider extends Component {
    state = {
        contacts: [
            
                {id:1, name: "ahmed", phone: "5438595", email:"ahmed@gmail.com"},
                {id:2, name: "montacir", phone: "3435", email:"ah@gmail.com"},
                {id:3, name: "mohamed", phone: "76989", email:"med@gmail.com"},
            
        ],
        dispatch: action => this.setState(state => reducer(state,action))
    }

    async componentDidMount() {
       /*axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => this.setState({contacts: res.data}))
        .catch(err => console.error(err));*/
        try {const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.setState({contacts: res.data})}
        catch(e){
            console.error(e);
        }
    }

    render() {
        return (
            <Context.Provider value ={this.state} >
                {this.props.children}
            </Context.Provider>
        )
    }
}
export const Consumer = Context.Consumer;