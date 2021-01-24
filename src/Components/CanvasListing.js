import React, { Component } from 'react';
import DeleteArtwork from './DeleteArtwork'
import axios from 'axios'
import parse from 'html-react-parser';
import {Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
class CanvasListing extends Component {
    constructor(){
        super()
        this.state={
            data:[],
        }
    }
    componentDidMount(){
		axios.get(`https://thawing-thicket-87572.herokuapp.com/api/artwork/`)
		// axios.get(`${process.env.REACT_APP_API_POST}`)
		  .then(res => {
		    // console.log(res);
            // console.log(res.data);
            this.setState({data: res.data})
            let newString = JSON.parse(res.data[0].art);
            // console.log(newString)
		  }).catch(err=>console.log(err))
    }
    render() {
        return (
            <div>
<section className="flex flex-wrap flex-row">

{this.state.data.map((artwork, index) => (
        <div key={index} className="h-70 border border-gray-700 m-10 w-52 shadow-lg"><Link to={"/canvas/"+artwork._id}>{parse(JSON.parse(artwork.art))}</Link>
        <button className="border-black m-2 border p-2"> <Icon name="download"></Icon></button>
        <DeleteArtwork id={artwork._id}></DeleteArtwork>
        
        </div>
    ))}
</section>

                
            </div>
        );
    }
}

export default CanvasListing;