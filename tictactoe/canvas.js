var generateCanvas = function(tictactoe, oColorV, xColorV) {
    var toColor = function(c) { return "rgb(" + (c >> 16) + "," + ((c >> 8) % 256) + "," + (c % 256) + ")"; };
                                         
    var oColor = toColor(oColorV);
    var xColor = toColor(xColorV);
	var canvas = document.createElement("canvas");
	canvas.width = 300;
	canvas.height = 320;
	
	var displayMark = {
		'p1': function(row, col) {
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(col*100 + 50, row*100 + 50, 40, 0, 2*Math.PI);
			ctx.stroke();
		},
		'p2': function(row, col) {
			var ctx = canvas.getContext('2d');
			ctx.moveTo(col*100+10, row*100+10);
			ctx.lineTo((col+1)*100-10, (row+1)*100-10);
			ctx.stroke();

			ctx.moveTo((col+1)*100-10, row*100+10);
			ctx.lineTo(col*100+10, (row+1)*100-10);
			ctx.stroke();
		}
	};

	function drawBoard() {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "silver";
		ctx.fillRect(0,0,300,300);

		ctx.moveTo(100,0);
		ctx.lineTo(100, 300);
		ctx.stroke();

		ctx.moveTo(200,0);
		ctx.lineTo(200, 300);
		ctx.stroke();

		ctx.moveTo(0,100);
		ctx.lineTo(300, 100);
		ctx.stroke();

		ctx.moveTo(0,200);
		ctx.lineTo(300, 200);
		ctx.stroke();	
	}

	function winMessage (msg, winColor, invert) {
		var ctx = canvas.getContext('2d');
		
		if (invert) {
			ctx.fillStyle = invert;
			ctx.fillRect(210, 302, 80, 20);			
		}

		ctx.fillStyle = winColor;
		ctx.lineWidth = 2;
		ctx.textAlign = "center";
		ctx.font = "16px Arial";
		ctx.fillText(msg, 250,318);

	}
	(function() {
		drawBoard();

		// var id = tictactoe.id;
		// if (id) {
		// 	var ctx = canvas.getContext('2d');
		// 	ctx.fillStyle = "black";
		// 	ctx.font = "16px Arial";
		// 	ctx.fillText("X-id: "+id.Xid, "O-id: "+id.Oid, 10,318);
		// }
		if (oColor && xColor) {
			var ctx = canvas.getContext('2d');
			ctx.fillStyle = "black";
			ctx.font = "16px Arial";
			ctx.fillText("O : ", 10, 318);
			ctx.fillStyle = oColor;
			ctx.fillRect(50, 302, 19, 13);
			ctx.strokeStyle = "black";
			ctx.rect(50, 302, 20, 14);
			ctx.stroke();

			ctx.fillStyle = "black";
			ctx.font = "16px Arial";
			ctx.fillText("X : ", 110, 318);
			ctx.fillStyle = xColor;
			ctx.fillRect(150, 302, 19, 13);
			ctx.strokeStyle = "black";
			ctx.rect(150, 302, 20, 14);
			ctx.stroke();
		}

		var board = tictactoe.board;

		for (var i = 0; i < board.length; i++) {
			var row = board[i];
			for (var j = 0; j < row.length; j++) {
				if (row[j] === tictactoe.EMPTY) {
					continue;
				}

				displayMark['p'+row[j]](i, j);
			}
		};

		var winner = tictactoe.checkWinner();
		if (winner) {
			var player = (winner === 1) ? "O" : "X";
			var color = (winner === 1) ? oColor : xColor;
			var invert;
			if (color === "rgb(255,255,255)") {
				invert = 'black';
			}
			// var invert = (winner === 1) ? invertColor(oColorV) : invertColor(xColorV);
			winMessage("Winner "+ player, color, invert);
		} else if (tictactoe.isFull()) {
			winMessage("Draw", "black");
		}
	}());

	return canvas;
};

