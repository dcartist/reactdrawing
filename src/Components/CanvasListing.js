import React, { Component } from 'react';
import DeleteArtwork from './DeleteArtwork'
import SavingArtwork from './Saving'
import Loader from "../Image/831.gif"
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
		  .then(res => {
            this.setState({data: res.data})
            let newString = JSON.parse(res.data[0].art);
		  }).catch(err=>console.log(err))
    }
    render() {
        if(this.state.data.length == 0){
return(
    <div className="flex justify-center items-center h-screen flex-wrap flex-col">
<p><img src={Loader}/></p>
<p className="text-5xl font-thin">Loading... </p>
    </div>
)
        } else{
            return (
                <div>
    <section className="flex flex-wrap flex-row">
    
    {this.state.data.map((artwork, index) => (
            <div key={index} className="h-70 border border-gray-700 m-10 w-52 shadow-lg"><Link to={"/new/"+artwork._id}>{parse(JSON.parse(artwork.art))}</Link>
            {/* <div key={index} className="h-70 border border-gray-700 m-10 w-52 shadow-lg"><Link to={"/canvas/"+artwork._id}>{parse(JSON.parse(artwork.art))}</Link> */}
            <SavingArtwork {...artwork}></SavingArtwork>
            <DeleteArtwork id={artwork._id}></DeleteArtwork>
            
            </div>
        ))}
    </section>
    
                    
                </div>
            );
        }
       
    }
}

export default CanvasListing;