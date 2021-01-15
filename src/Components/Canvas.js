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
     
        this.canvas = React.createRef();
      }
    render() {
        return (
          <div>
            <ReactSketchCanvas
            height="90vh" 
              ref={this.canvas}
              strokeWidth={5}
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
              Get Image
            </button>
          </div>
        );
      }

    
}

export default Canvas;