function init() {
	var canvas = document.getElementById("mycanvas");
	W = canvas.width = 1000;
	H = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cell_size = 66;
	game_over = false;
	score = 1;

	//Create an image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	//Create an image Object for trophy
	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:1,
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
			// this.cells.pop();
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			var nextX, nextY;

			//if snake eats food get another location for food and increase score
			if(headX==food.x && headY==food.y) {
				console.log("!!!Food eaten!!!");
				food = getRandomFood();
				score++;
			}
			else {
				this.cells.pop();
			}

			if(this.direction=="right") {
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left") {
				nextX = headX - 1;
				nextY = headY;	
			}
			else if(this.direction=="down") {
				nextX = headX;
				nextY = headY + 1;
			}
			else if(this.direction=="up") {
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x:nextX,y:nextY});

			//Write a logic that prevents snake from going out
			var last_x = Math.round(W/cell_size)-1;
			var last_y = Math.round(H/cell_size)-1;

			if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y) {
				game_over = true;
			}
		}
	};

	snake.createSnake();

	//Add a Event Listener on the Document Object
	function keyPressed(e) {
		if(e.key=="ArrowRight") {
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft") {
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown") {
			snake.direction = "down";
		}
		else if(e.key=="ArrowUp") {
			snake.direction = "up";
		}
		console.log(e.key);
	}
	document.addEventListener('keydown',keyPressed);
}
function draw() {
	//erase prev screen
	pen.clearRect(0, 0, W, H); 
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img, food.x * cell_size, food.y * cell_size, cell_size, cell_size);

	pen.drawImage(trophy, W-cell_size*2-5, 20, cell_size*2, cell_size*2);

	pen.fillStyle = "blue";
	pen.font = "40px Roboto";
	pen.fillText(score-snake.init_len,W-cell_size-20,70);
}
function update() {
	snake.updateSnake();
}
function getRandomFood() {
	var foodX = Math.round(Math.random()*(W-cell_size)/cell_size);
	var foodY = Math.round(Math.random()*(H-cell_size)/cell_size);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}
function game_loop() {
	if(game_over) {
		clearInterval(f);
		alert('Game Over')
	}
	draw();
	update();
}

init();
var f = setInterval(game_loop, 105);