function init() {
	var canvas = document.getElementById("mycanvas");
	W = canvas.width = 1000;
	H = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cell_size = 66;
	score = 5;

	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function() {
			for(var i=this.init_len;i>0;i--) {
				this.cells.push({x:i,y:0});  //Array of objects
			}
		},
		drawSnake:function() {
			for(var i=0;i<this.cells.length;i++) {
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x * cell_size, this.cells[i].y * cell_size, cell_size-2 , cell_size-2);
			}
		},
		updateSnake:function() {
			this.cells.pop();
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			var nextX = headX + 1;
			var nextY = headY;
			this.cells.unshift({x:nextX,y:nextY});
		}
	};

	snake.createSnake();
}
function draw() {
	//erase prev screen
	pen.clearRect(0, 0, W, H); 
	snake.drawSnake();
}
function update() {
	snake.updateSnake();
}
function game_loop() {
	draw();
	update();
}

init();
var f = setInterval(game_loop, 105);