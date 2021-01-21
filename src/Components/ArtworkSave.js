import React, { Component } from 'react';
import axios from 'axios'
class ArtworkSave extends Component {
    constructor(){
        super()
        this.state={
            artwork:''
        }
    }
  
    componentDidMount(){
    //     axios.post(`http://localhost:8080/`, { artwork:this.state.artwork })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
  }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ArtworkSave;