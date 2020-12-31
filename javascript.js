var board = document.getElementById('board');

var squares = document.createElement('div');
squares.className = "squares";
board.appendChild(squares);

var files = ['a','b','c','d','e','f','g','h'];
var f = document.createElement('div');
f.className = "f";
board.appendChild(f);

var ranks = [8,7,6,5,4,3,2,1];
var r = document.createElement('div');
r.className = "r";
board.appendChild(r);

var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var content = fentoboard(fen);
var count = 0;

var startsquare;

for(i=0; i<8; i++)
{
	for(j=0; j<8; j++)
	{
		var square = document.createElement('div');
		square.className = "square";
		square.id = files[j].concat(ranks[i]);
		squares.appendChild(square);
		square.addEventListener("dragover", dragOver);
		square.addEventListener("drop", dragDrop);
        if((i%2==0 ^ j%2==0))
		{			
			document.getElementById(square.id).style.backgroundColor = "rgb(181,136,99)";
		}
		if(content[count] != 'n')
		{
			var piece = document.createElement('div');
			var pieceimage = document.createElement('img');
			pieceimage.src = "Images\\"+content[count]+".png";
			piece.appendChild(pieceimage);
			square.appendChild(piece);
			piece.addEventListener("dragstart", dragStart);
		}
        count++;		
	}
}

function fentoboard(fen)
{
	var board=[];
	res = fen.split(" ");
	for(i=0; i < res[0].length; i++)
	{
		if(res[0][i]=='r') { board.push('bR'); }
		if(res[0][i]=='n') { board.push('bN'); }
		if(res[0][i]=='b') { board.push('bB'); }
		if(res[0][i]=='q') { board.push('bQ'); }
		if(res[0][i]=='k') { board.push('bK'); }
		if(res[0][i]=='p') { board.push('bP'); }
		if(res[0][i]=='R') { board.push('wR'); }
		if(res[0][i]=='N') { board.push('wN'); }
		if(res[0][i]=='B') { board.push('wB'); }
		if(res[0][i]=='Q') { board.push('wQ'); }
		if(res[0][i]=='K') { board.push('wK'); }
		if(res[0][i]=='P') { board.push('wP'); }
        if(res[0][i]>'0' && res[0][i]<'9') { for(j=0; j<res[0][i];j++) { board.push('n'); } }		
	}
	return board;
}


var target;
function dragStart(e) {
  target = this;
  setTimeout(() => (this.style.display = 'none'), 0);
  [pieceplacement, activecolor, castling, enpassant, halfmoveclock, fullmove] = document.querySelector('.FEN').innerText.split(" ");
  console.log(activecolor);
}

function dragOver(e) {
  e.preventDefault();
  e.dropEffect = 'none';
}

function dragDrop(e) {
  e.preventDefault();
  target.style.display = "block";
  if(this.children.length != 0)
  {
	  this.removeChild(this.childNodes[0]);
  }
  this.appendChild(target); 
}