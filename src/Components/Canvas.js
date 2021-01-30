import React, { Component } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Picker from './Picker'
import axios from 'axios'
import { SliderPicker, SketchPicker, GithubPicker} from 'react-color';
import { HexColorPicker } from "react-colorful";
import saveFile from 'save-as-file';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';


class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paths:[],
			art:'',
			show: true,
			background: '#000',
			color: '#000',
			showorhide:false,
		brushSize: 5,
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
	setShowResults = () => this.setState({showorhide: !this.state.showorhide})

	handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };
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

	newColorChange=(color)=>{
		this.setState(prevState =>({ color: color }));
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
  Picker = () => {
	return (
			<div
			style={{
				width: 30,
				height: 30,
				borderRadius: 20,
				background: "rgba(255,255,255,0.2)",
				border: "1px solid white",
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
				boxSizing: "border-box"
			}}
			/>
		);
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
					{this.state.color}
				<button onClick={() => this.setShowResults()}>
            Click to hide Demo1 component
          </button>
		  <div className="aboveOthers">{this.state.showorhide ? <div>This is one</div> : <div><HexColorPicker className="z-10" color={this.state.originalColor} onChange={() => {
							this.colorChange(this.color);
						}} /></div>}</div>
		  
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
			
				


				<ReactSketchCanvas 
					height="80vh"
					ref={this.canvas}
					strokeWidth={this.state.brushSize}
					strokeColor={this.state.background}
				/>

				
			</div>
		);
	}
}

export default Canvas;
