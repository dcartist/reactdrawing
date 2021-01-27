import React, { Component } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from 'axios'
import { SliderPicker, SketchPicker } from 'react-color';
import Fade from 'react-reveal/Fade';

import saveFile from 'save-as-file';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
const styles = {
	border: '0.0625rem solid #9c9c9c',
	borderRadius: '0.25rem',
};

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paths:[],
			art:'',
			show: true,
		brushSize: 50,
      color: 'gray',
      originalColor:'gray',
			red: [
				{ color: '700', val: 'rgba(153, 27, 27)' },
				{ color: '600', val: 'rgba(220, 38, 38)'},
				{ color: '400', val: 'rgba(248, 113, 113)'},
				{ color: '200', val: 'rgba(254, 202, 202)'},
			],
			blue: [
				{ color: '700', val: 'blue' },
				{ color: '600', val: 'rgba(37, 99, 235)'},
				{ color: '400', val: 'rgba(96, 165, 250)'},
				{ color: '200', val: 'rgba(191, 219, 254)'},
			],
			yellow: [
				{ color: '500', val: '#F59E0B' },
				{ color: '400', val: '#FBBF24' },
				{ color: '300', val: 'rgba(252, 211, 77)' },
				{ color: '200', val: 'rgba(253, 230, 138)' },
				{ color: '100', val: 'rgba(254, 243, 199)' },
			],
			black: [
				{ color: '900', val: 'black' },
				{ color: '700', val: 'rgba(55, 65, 81)' },
				{ color: '500', val: 'rgba(107, 114, 128)' },
				{ color: '300', val: 'rgba(209, 213, 219)' },
			],
			gray: [
				{ color: '900', val: 'black' },
				{ color: '700', val: 'rgba(55, 65, 81)' },
				{ color: '500', val: 'rgba(107, 114, 128)' },
				{ color: '300', val: 'rgba(209, 213, 219)' },
			],
			white: [
				{ color: 'white', val: 'white' },
				{ color: '50', val: 'rgba(249, 250, 251)' },
				{ color: '100', val: 'rgba(243, 244, 246)' },
				{ color: '200', val: 'rgba(229, 231, 235)' },
			],
			tints: [
				{ color: '900', val: 'black' },
				{ color: '700', val: 'rgba(55, 65, 81)' },
				{ color: '500', val: 'rgba(107, 114, 128)' },
				{ color: '300', val: 'rgba(209, 213, 219)' },
			],
		};
		this.canvas = React.createRef();
	}
	brushSizeChange(number) {
		this.canvas.current.eraseMode(false);
		this.setState({ brushSize: parseInt(number) });
	}

	posttingArtwork (art, paths){
		// console.log(art)
		axios.post(`${process.env.REACT_APP_API_POST}`, { art: art, paths:paths })
		  .then(res => {
			  console.log("")
		  }).catch(err=>console.log(err))
	}
	colorChange(name) {
	this.setState({ show: false });
    this.canvas.current.eraseMode(false);
    switch(name){
      case "blue":
        this.setState({tints: this.state.blue})
		this.setState({ color: name, originalColor:name });
		this.setState({ show: true });
        break
      case "red":
        this.setState({tints: this.state.red})
        this.setState({ color: name, originalColor:name });
		this.setState({ show: true });
        break
      case "yellow":
        this.setState({tints: this.state.yellow})
        this.setState({ color: '#FCD34D', originalColor:name });
		this.setState({ show: true });
        break
      case "white":
        this.setState({tints: this.state.white})
        this.setState({ color: 'white', originalColor:'gray' });
		this.setState({ show: true });
        break
      case "gray":
        this.setState({tints: this.state.gray})
        this.setState({ color: 'gray', originalColor:'gray' });
		this.setState({ show: true });
        break
      case "black":
        this.setState({tints: this.state.black})
        this.setState({ color: 'black', originalColor:'gray' });
		this.setState({ show: true });
        break
      default:
      this.setState({ color: name });
	  this.setState({ show: true });
	}  
  }
  tintChange(name){
    this.canvas.current.eraseMode(false);
    this.setState({ color: name });
  }
  componentDidMount(){
	  if (this.props.match.params.id){
		  console.log("something there")
		  axios.get(`${process.env.REACT_APP_API_POST_ID}${this.props.match.params.id}`)
		  .then(res => {
		    console.log(res);
			console.log(res.data);
			this.canvas.current.loadPaths(res.data.paths)
		  }).catch(err=>console.log(err))
	  } else {
		  console.log("nope")
	  }
  }
	render() {
		return (
			<div>
				<div>
					<button
						className="mr-2 disable-select"
						onClick={() => {
							this.canvas.current.resetCanvas();
						}}
					>
						New Canvas
					</button>
					<button
						className="mr-2 disable-select"
						onClick={() => {
							this.canvas.current.clearCanvas();
						}}
					>
						CLEAR!
					</button>

					<button
						className="mr-4 disable-select"
						onClick={() => {
							this.canvas.current.undo();
						}}
					>
						<Icon name="undo" />
					</button>
					<button
						className="mr-4 disable-select"
						onClick={() => {
							this.canvas.current.redo();
						}}
					>
						<Icon name="redo" />
					</button>
					<button
						className="mr-4 disable-select"
						onClick={() => {
							this.canvas.current.eraseMode(true);
						}}
					>
						<Icon name="eraser" size="large" />
					</button>
					<button
						className="mr-4 disable-select"
						onClick={() => {
							this.canvas.current.eraseMode(false);
						}}
					>
						<Icon name="pencil" size="large" />
					</button>

					<button
						onClick={() => this.brushSizeChange(100)}
						className="p-2 border-2 border-gray-400 disable-select"
					>
						100
					</button>
					<button
						onClick={() => this.brushSizeChange(50)}
						className="p-2 border-2 border-gray-400 disable-select"
					>
						50
					</button>
					<button
						onClick={() => this.brushSizeChange(10)}
						className="p-2 border-2 border-gray-400 disable-select"
					>
						10
					</button>
					<button
						onClick={() => this.brushSizeChange(5)}
						className="p-2 border-2 border-gray-400 disable-select"
					>
						5
					</button>
					<button
						onClick={() => this.brushSizeChange(1)}
						className="p-2 border-2 border-gray-400 disable-select"
					>
						1
					</button>

					<button
						className="ml-4 disable-select border p-2 border-black"
						onClick={() => {
							this.canvas.current
								.exportSvg('svg')
								.then((data) => {
									// console.log(data);
									// console.log(typeof data);
									let file = new File([data], { type: 'image/svg+xml' });
									let stringedSVG = JSON.stringify(data)
									// console.log(stringedSVG)
									// this.posttingArtwork(stringedSVG)
									saveFile(file, 'drawing.svg');
								})
								.catch((e) => {
									console.log(e);
								});
								
						}}
					>
						<Icon name="download"></Icon>
					</button>

					
					<button
						className="ml-4 disable-select border p-2 border-black"
						onClick={() => {
							let paths = []
							let art = ''
							this.canvas.current
								.exportPaths()
								.then((data) => {
									console.log(data);
									console.log(typeof data);
									paths = data
								}).then(
									this.canvas.current.exportSvg('svg').then(
										(data) => {
											let stringedSVG = JSON.stringify(data)
											art = stringedSVG
										}
									)
								).then((data)=>{
									this.posttingArtwork(art,paths)
								})
								.catch((e) => {
									console.log(e);
								});

						}}
					>
							<Icon name="save"></Icon>
					</button>
				</div>
				<div className="p-5"><SliderPicker/> <SketchPicker /></div>
				


				<section className="grid grid-cols-2">
					<div>
						<div>
							<button
								className="bg-black p-5 m-1 rounded-full border-black border"
								onClick={() => this.colorChange('black')}
							/>
							<button
								className="bg-red-600 p-5 m-1 rounded-full border-black border"
								onClick={() => this.colorChange('red')}
							/>
							<button
								className="bg-yellow-400 p-5 m-1 rounded-full border-black border"
								onClick={() => this.colorChange('yellow')}
							/>
							<button
								className="bg-white p-5 m-1 rounded-full border-black border"
								onClick={() => this.colorChange('white')}
							/>
							<button
								className="bg-blue-700 p-5 m-1 rounded-full border-black border"
								onClick={() => this.colorChange('blue')}
							/>
						</div>
					</div>
          
					<div className="flex"> <Fade opposite cascade when={this.state.show}>{this.state.tints.map((color, index) => {
            let newclassname = ''
            let divClassname = ''
            if (color.color === 'white')  
            {newclassname = `bg-white p-5 rounded-full border-black border`
            divClassname = `bg-white m-1`
          } else {
              newclassname = `bg-${this.state.originalColor}-${color.color} p-5 rounded-full border-black border`
            }
            return  <div className="m-1 fading rounded-full" key={index} style={{backgroundColor: color.val}}><button className={newclassname}
            onClick={() => this.tintChange(color.val)}
          /></div>
          })}
		  </Fade>
		  </div>
				</section>

				<ReactSketchCanvas 
					height="80vh"
					ref={this.canvas}
					strokeWidth={this.state.brushSize}
					strokeColor={this.state.color}
				/>

				
			</div>
		);
	}
}

export default Canvas;
