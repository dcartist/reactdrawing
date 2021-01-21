import React, { Component } from 'react';
import axios from 'axios'
import parse from 'html-react-parser';

class CanvasListing extends Component {
    constructor(){
        super()
        this.state={
            data:[],
        }
    }
    componentDidMount(){
        console.log(`${process.env.REACT_APP_API_POST}`)
		axios.get(`${process.env.REACT_APP_API_POST}`)
		  .then(res => {
		    console.log(res);
            console.log(res.data);
            this.setState({data: res.data})
            let newString = JSON.parse(res.data[0].art);
            console.log(newString)
		  }).catch(err=>console.log(err))
    }
    render() {
        return (
            <div>
<section className="flex flex-wrap flex-row">
{this.state.data.map((artwork, index) => (
        <div key={index} className="h-70 border border-black m-4 w-52">{parse(JSON.parse(artwork.art))}</div>
    ))}</section>

                
            </div>
        );
    }
}

export default CanvasListing;