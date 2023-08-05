var drawGraph = function(){

	//number of icons to color in to visualize percent
	var percentNumber = 92;

	//variables for the font family, and some colors
	var fontFamily = "helvetica";
	var twitterFill = "#4D908E";
	var twitterFillActive = "#adf7b6";
	var svgBackgroundColor = '#264653';

	const width = 500;
	const height = 500;

	//create an svg with width and height
	var svg = d3.select('#grid-chart')
		.append('svg')
		.attr("width", width)
		.attr("height", height)
    	.style('background-color', svgBackgroundColor);

    /* 
    	this is the twitter icon path definition that we are using instead of circles.
    	the path data can be copied and pasted from an SVG icon file.
    */

	var twitter = svg.append("defs")
		.append("g")
		.attr("id","twitterIcon");

	twitter
		.append("path")
		.attr("d","M106.3,36.6c-2.8,1.3-6,2.1-9,2.6c1.5-0.2,3.6-2.9,4.5-3.9c1.3-1.6,2.4-3.5,3-5.5 c0.1-0.2,0.1-0.4,0-0.5c-0.2-0.1-0.3,0-0.5,0c-3.4,1.8-6.9,3.2-10.7,4.1c-0.3,0.1-0.5,0-0.7-0.2c-0.3-0.4-0.6-0.7-0.9-1 c-1.6-1.3-3.3-2.4-5.2-3.2c-2.5-1-5.3-1.5-8-1.3c-2.6,0.2-5.2,0.9-7.5,2.1c-2.3,1.2-4.4,2.9-6.1,5c-1.7,2.1-3,4.6-3.6,7.3 c-0.6,2.6-0.6,5.1-0.2,7.7c0.1,0.4,0,0.5-0.4,0.4C46.2,48.1,34,42.9,24.1,31.6c-0.4-0.5-0.7-0.5-1,0c-4.3,6.5-2.2,16.9,3.2,22.1 c0.7,0.7,1.5,1.4,2.3,2c-0.3,0.1-3.9-0.3-7.1-2c-0.4-0.3-0.6-0.1-0.7,0.4c0,0.7,0,1.3,0.1,2.1c0.8,6.6,5.4,12.7,11.6,15 c0.7,0.3,1.6,0.6,2.4,0.7c-1.4,0.3-2.9,0.5-7,0.2c-0.5-0.1-0.7,0.2-0.5,0.6C30.4,81.1,37,83.6,42,85c0.7,0.1,1.3,0.1,2,0.3 c0,0.1-0.1,0.1-0.1,0.1c-1.6,2.5-7.3,4.4-10,5.3c-4.8,1.7-10.1,2.4-15.2,1.9c-0.8-0.1-1-0.1-1.2,0c-0.2,0.1,0,0.3,0.2,0.5 c1,0.7,2.1,1.3,3.2,1.9c3.2,1.7,6.6,3.1,10.1,4.1c18.2,5,38.8,1.3,52.5-12.3C94.2,76.2,98,61.5,98,46.7c0-0.6,0.7-0.9,1.1-1.2 c2.8-2.1,5-4.6,7.1-7.4c0.5-0.6,0.4-1.2,0.4-1.4c0,0,0-0.1,0-0.1C106.6,36.4,106.7,36.4,106.3,36.6z")
		.attr("transform", "translate(0,0) scale(.3)");

	twitter
		.append("path")
		.attr("d","M43.9 101C51.4 101 44.2 101 43.9 101 44.9 101 43.8 101 43.9 101zM43.9 101C43.8 101 42.4 101 43.9 101 43.9 101 43.6 101 43.9 101zM46.9 101.1C46.9 100.9 48.5 101.1 46.9 101.1 46.9 101 47.1 101.1 46.9 101.1zM78.5 27.9c-.1.1-.2.1-.4 0C78.2 27.9 78.4 27.9 78.5 27.9z")
		.attr("transform", "translate(0,0) scale(.3)");

	//end twitter path definition

	//10 rows and 10 columns 
	var numRows = 10;
	var numCols = 10;

	//x and y axis scales
	var y = d3.scaleBand()
		.range([0,250])
		.domain(d3.range(numRows));

	var x = d3.scaleBand()
		.range([0, 250])
		.domain(d3.range(numCols));

	//the data is just an array of numbers for each cell in the grid
	data = d3.range(numCols*numRows);

	//container to hold the grid
	var container = svg.append("g")
		.attr("transform", "translate(120,120)");
	
	container.selectAll("use")
			.data(data)
			.enter().append("use")
			.attr("xlink:href", "#twitterIcon")
			.attr("id", function(d){return "id"+d;})
			.attr('x', function(d){return x(d%numCols);})
			.attr('y', function(d){return y(Math.floor(d/numCols));})
			.attr('fill', function(d){return d < percentNumber ? twitterFillActive : twitterFill;})
			.style('stroke', 'black');

}
