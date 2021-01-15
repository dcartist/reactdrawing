import React, { Component } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import saveFile from 'save-as-file';

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem"
};
 
  
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state={
          brushSize: 50,
        }
        this.canvas = React.createRef();
      }
  brushSizeChange(number){
    this.setState({brushSize:parseInt(number)})

  }
    render() {
        return (
          <div>
            <button onClick={() =>this.brushSizeChange(100)} className="p-2">100</button>
            <button onClick={() =>this.brushSizeChange(50)} className="p-2">50</button>
            <button onClick={() =>this.brushSizeChange(10)} className="p-2">10</button>
            <ReactSketchCanvas
            height="90vh" 
              ref={this.canvas}
              strokeWidth={this.state.brushSize}
              strokeColor="black"
            />
            <button
              onClick={() => {
                this.canvas.current
                  .exportSvg("svg")
                  .then(data => {
                    console.log(data);
                    console.log(typeof(data));
                    let file = new File([data], {type: 'image/svg+xml'});
saveFile(file, 'drawing.svg');

                  })
                  .catch(e => {
                    console.log(e);
                  });
              }}
            >
              Get SVG
            </button>
            {/* <button className="p-2"
              onClick={() => {
                this.canvas.current
                  .exportImage("png")
                  .then(data => {
                    console.log(data);
                    console.log(typeof(data));
                    let file = new File(data, {type: 'image/png'});
saveFile(file, 'drawing.png');

                  })
                  .catch(e => {
                    console.log(e);
                  });
              }}
            >
              Get Png
            </button> */}
          </div>
        );
      }

    
}

export default Canvas;