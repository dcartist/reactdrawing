import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Navigation extends Component {
    render() {
        return (
            <div className="flex space-x-12 pl-10 text-lg text-white bg-black w-full pb-2 pt-2 font-bold">
                <Link to="/" className="text-white">Home</Link>
                <Link to="/list" className="text-white">ArtWork</Link>
                <Link to="/canvas" className="text-white">Canvas</Link>
            </div>
        );
    }
}

export default Navigation;