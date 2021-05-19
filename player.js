window.onload = function() {	

var canv = document.createElement('canvas'); // create canvas
canv.id = 'canvas';
canv.height = 300;
canv.width = window.innerWidth - 200; // set canvas width according to screen
document.getElementById("canvas_container").appendChild(canv); 

var canvas = new fabric.Canvas('canvas');
var lines = []; // placeholder to store lines created in canvas
var line_interval_refs = []; // placholder to store refs of setinterval of each line
var isplaying = false; // flag to maintain play/pause state
var current_player_index = 0; // index to maintain current player's position

createRandomData = () => {
	let total_lines = window.innerWidth/20;

	for(let i=0;i < total_lines; i++){
		let rect = new fabric.Rect({
			left: i * 20,
			top: (Math.floor(Math.random() * 50) + 100), // given 100px for showing static tags
			fill: '#ffb2ae',
			width: 5,
			height: (Math.floor(Math.random() * 80) + 70),
			lockMovementX: true,
			lockMovementY: true
		});			
   
        // Render the rectanle in canvas
		canvas.add(rect);
		lines.push(rect)

		rect.on('mousedown', () => handle_audioClick(i));	

		// add static lines
		switch(i){
			case 5: 
				add_static_text(i, 'Introduction', 'lightgreen')
				break;
			case 15:
				add_static_text(i, 'One_six', 'brown')
				break;
			case 25:
				add_static_text(i, 'Rapport-Building', 'blue')
				break;
		}
	}
}

add_static_text = (position, custom_text, color) => {
	let line = new fabric.Line([position*20+2, 50, position*20+2, 150], {
	   	stroke: color,
	   	strokeWidth: 2
	});
	canvas.add(line);

	let circle = new fabric.Circle({
		radius: 6,
		fill: color,
		left: position*20-2,
		top: 150
	});
	canvas.add(circle); 

	let text = new fabric.Text(custom_text, { 
	    left: position*20-40,
	    top: 30, 
	    fill: color,
	    fontSize: 20
	});
	canvas.add(text);			
}

handle_audioClick = (index) => {
	isplaying = true;
	current_player_index = index;
	lines.forEach(item => item.set("fill", '#ffb2ae')); // set lines to default color
	clear_Interval();
	play();
}

handle_playPause = () => {
	isplaying = !isplaying;
	isplaying? play() : clear_Interval();	
}

play = () => {		
	line_interval_refs = [];	
	for(let i=0, j=0; i<lines.length; i++){
		if(i <= current_player_index){
			// color with green
			lines[i].set("fill", 'green');
			canvas.renderAll();
		} else {
			// push to intervals
			j++;
			let interval_reference = setInterval(function(){  		
				lines[i].set("fill", 'green');
				canvas.renderAll();
				current_player_index = i; // this is done to maintain the player's current position when paused
			}, j*500); 			 	
			line_interval_refs.push(interval_reference);		
		}			
	}			
}

clear_Interval = () => line_interval_refs.forEach(item => clearInterval(item));

createRandomData();
}
