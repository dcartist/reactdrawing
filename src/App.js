import logo from './logo.svg';
import './App.css';
import { ReactSketchCanvas } from "react-sketch-canvas";
import Canvas from "./Components/Canvas"
import Home from "./Components/Home"
import CanvasListing from "./Components/CanvasListing"
import { Route, Link, Switch, Redirect } from 'react-router-dom';
const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

function App() {
  return (
    <div className="App">
    <Route path="/" exact component={Home} />
    <Route path="/list" exact component={CanvasListing} />
    <Route path="/canvas" exact component={Canvas} />
    </div>
  );
}

export default App;
