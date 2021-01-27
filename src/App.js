import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Canvas from "./Components/Canvas"
import Picker from "./Components/ColorPicker"
import Navigation from "./Components/Navigation"
import Home from "./Components/Home"
import CanvasListing from "./Components/CanvasListing"
import { Route, Link, Switch, Redirect } from 'react-router-dom';
const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			artId: '',
		};
  }

  setartId = (artId) => {
		this.setState({ artId: artId });
	};
  render() {
  return (
    <div className="App">
    <Navigation></Navigation>
    <Route path="/" exact component={Home} />
    <Route path="/list" exact component={CanvasListing} />
    <Route path="/picker" exact component={Picker} />
    <Route path="/canvas" exact component={Canvas} />
    <Route
					path="/canvas/:id"
					render={(props) => <Canvas setartId={this.artId} {...props} {...this.state} />}
				/>
    </div>
  );
}
}

export default App;
