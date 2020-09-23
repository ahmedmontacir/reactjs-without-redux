import React from 'react'
import classnames from 'classnames';

export default function TextInputGroup(props) {
    return (
        <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input name = {props.name} type= {props.type} value = {props.value} onChange = {props.onChange}   className= {classnames('form-control',{'is-invalid': props.error})}/>
        <div className="invalid-feedback">{props.error}</div>
       </div>
       
    )
}
