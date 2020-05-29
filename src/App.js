import React, { useEffect, useState, useRef } from 'react';
// import './App.css';

function App() {

	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.height = window.innerHeight + 'px';
		canvas.style.width = window.width + 'px';

		const context = canvas.getContext('2d')
		context.scale(2, 2);
		context.lineCap = 'round';
		context.lineWidth = 5;
		context.strokeStyle = 'black';
		contextRef.current = context;

	}, [])

	const startDrawing = ({nativeEvent}) => {
		const {offsetX, offsetY} = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	}

	const finishDrawing = () => {
		contextRef.current.closePath();

		setIsDrawing(false);
	}

	const draw = ({nativeEvent}) => {
		if(!isDrawing){ 
			return;
		}

		const {offsetX, offsetY} = nativeEvent;
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
	}

	return (
			<canvas
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				ref={canvasRef}
			/>
	);
}

export default App;
