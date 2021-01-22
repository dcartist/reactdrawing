import React, { Component } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from 'axios'
import ArtworkSave from './ArtworkSave'
import FadeIn from 'react-fade-in';
import saveFile from 'save-as-file';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Transition } from 'semantic-ui-react';
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
				{ color: '400', val: 'yellow' },
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
		    console.log(res);
		    console.log(res.data);
		  }).catch(err=>console.log(err))
	}
	colorChange(name) {
    this.canvas.current.eraseMode(false);
    switch(name){
      case "blue":
        this.setState({tints: this.state.blue})
        this.setState({ color: name, originalColor:name });
        break
      case "red":
        this.setState({tints: this.state.red})
        this.setState({ color: name, originalColor:name });
        break
      case "yellow":
        this.setState({tints: this.state.yellow})
        this.setState({ color: name, originalColor:name });
        break
      case "white":
        this.setState({tints: this.state.white})
        this.setState({ color: 'white', originalColor:'gray' });
        break
      case "gray":
        this.setState({tints: this.state.gray})
        this.setState({ color: 'gray', originalColor:'gray' });
        break
      case "black":
        this.setState({tints: this.state.black})
        this.setState({ color: 'black', originalColor:'gray' });
        break
      default:
      this.setState({ color: name });
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
						className="ml-4 disable-select"
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
									// saveFile(file, 'drawing.svg');
								})
								.catch((e) => {
									console.log(e);
								});
								
						}}
					>
						Save to SVG
					</button>

					<button
						className="ml-4 disable-select"
						onClick={() => {
							this.canvas.current
							.loadPaths([{"drawMode":true,"strokeColor":"#000000","strokeWidth":4,"paths":[{"x":383.5390625,"y":381.33984375},{"x":383.5390625,"y":378.76953125},{"x":385.6875,"y":374.23046875},{"x":392.93359375,"y":357.8203125},{"x":400.9921875,"y":314.828125},{"x":402.2265625,"y":297.453125},{"x":400.9296875,"y":280.953125},{"x":389.2421875,"y":274.34375},{"x":351.98828125,"y":269.3828125},{"x":303.703125,"y":268.48046875},{"x":267.2578125,"y":268.48046875},{"x":237.91015625,"y":268.48046875},{"x":195.48828125,"y":268.48046875},{"x":186.07421875,"y":268.48046875},{"x":169.0703125,"y":270.05859375},{"x":163.8984375,"y":270.42578125},{"x":163.0625,"y":270.68359375},{"x":163.0625,"y":270.94140625},{"x":163.6328125,"y":271.87890625},{"x":176.50390625,"y":307.91796875},{"x":190.140625,"y":326.4375},{"x":196.671875,"y":331.12890625},{"x":214.2890625,"y":343.078125},{"x":238.37109375,"y":351.5078125},{"x":257.81640625,"y":356.6875},{"x":298.90234375,"y":368.5703125},{"x":325.67578125,"y":378.2421875},{"x":340.78125,"y":385.5234375},{"x":350.8046875,"y":390.984375},{"x":354.5234375,"y":392.66015625},{"x":355.6640625,"y":392.9453125},{"x":373.8984375,"y":356.9609375},{"x":380.609375,"y":331.3828125},{"x":384.61328125,"y":317.1953125},{"x":386.671875,"y":306.8984375},{"x":387.01171875,"y":302.796875},{"x":387.01171875,"y":300.9140625},{"x":384.1328125,"y":296.55859375},{"x":380.0625,"y":292.48828125},{"x":373.8046875,"y":288.05078125},{"x":366.671875,"y":284.71875},{"x":363.9375,"y":283.69140625},{"x":359.3203125,"y":282.34765625},{"x":358.578125,"y":280.5},{"x":355.65625,"y":275.02734375},{"x":350.90625,"y":264.48828125},{"x":342.41796875,"y":242.38671875},{"x":334.96875,"y":213.453125},{"x":331.2421875,"y":197.84765625},{"x":328.98046875,"y":184.2421875},{"x":327.27734375,"y":175.79296875},{"x":326.9609375,"y":174.27734375},{"x":326.9609375,"y":173.44140625},{"x":326.9609375,"y":173.1796875},{"x":330.6875,"y":217.90625},{"x":329.74609375,"y":217.90625},{"x":320.33203125,"y":218.89453125},{"x":304.703125,"y":218.89453125},{"x":275.46484375,"y":216.21484375},{"x":225.12109375,"y":206.14453125},{"x":208.39453125,"y":204.25},{"x":174.51953125,"y":202.33203125},{"x":163.53125,"y":202.33203125},{"x":152.6015625,"y":201.87890625},{"x":147.4296875,"y":200.109375},{"x":145.0078125,"y":198.37109375},{"x":143.828125,"y":196.28125},{"x":143.51171875,"y":192.125},{"x":146.36328125,"y":184.65234375},{"x":155.484375,"y":172.3046875},{"x":169.75,"y":160.203125},{"x":177.7734375,"y":157.8125},{"x":179.390625,"y":162.796875},{"x":178.7421875,"y":186.98828125},{"x":156.40625,"y":280.65625},{"x":149.80859375,"y":320.21875},{"x":146.53515625,"y":339.3046875},{"x":143.5703125,"y":360.68359375},{"x":141.5859375,"y":373.87890625},{"x":141.2421875,"y":377.0859375},{"x":141.2421875,"y":378.171875},{"x":142.60546875,"y":378.171875},{"x":147.953125,"y":373.21484375},{"x":159.77734375,"y":359.12109375},{"x":171.65625,"y":342.234375},{"x":182.97265625,"y":327.18359375},{"x":188.69140625,"y":321.3984375},{"x":191.76171875,"y":318.31640625},{"x":193.16015625,"y":317.19140625},{"x":194.55859375,"y":316.61328125},{"x":196.63671875,"y":315.12109375}],"startTimestamp":1611272517541,"endTimestamp":1611272520341}])
								
								
						}}
					>
						LOAD 
					</button>
					<button
						className="ml-4 disable-select"
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
						Check path
					</button>
				</div>
				<section className="grid grid-cols-2">
					<div>
						<div>
              Colors: 
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
          
					<div className="flex"> Tints: {this.state.tints.map((color, index) => {
            let newclassname = ''
            let divClassname = ''
            if (color.color === 'white')  
            {newclassname = `bg-white p-6 border-black border`
            divClassname = `bg-white m-1`
          } else {
              newclassname = `bg-${this.state.originalColor}-${color.color} p-6 border-black border`
            }
            return  <FadeIn delay={100}><div className="m-1 fading" key={index} style={{backgroundColor: color.val}}><button className={newclassname}
            onClick={() => this.tintChange(color.val)}
          /></div></FadeIn>
          })}</div>
				</section>

				<ReactSketchCanvas
					height="85vh"
					ref={this.canvas}
					strokeWidth={this.state.brushSize}
					strokeColor={this.state.color}
				/>

				
			</div>
		);
	}
}

export default Canvas;
