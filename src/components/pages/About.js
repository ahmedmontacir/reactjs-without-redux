import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
                <h2>About </h2>
                {this.props.match.params.id} 
                <p>
                    lorem...
                </p>
            </div>
        )
    }
}
