import logo from './logo.svg';
import './App.css';
import { ReactSketchCanvas } from "react-sketch-canvas";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

function App() {
  return (
    <div className="App">
      <ReactSketchCanvas
      style={styles}
      width="600"
      height="400"
      strokeWidth={4}
      strokeColor="red"
    />
    </div>
  );
}

export default App;
