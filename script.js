var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('GET','https://sugoku.onrender.com/board?difficulty=easy')
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudoku_solver(board, 0, 0, 9);
};


function isValid(board,i,j,num,n)
{
    //if already filled
    //Row & Col check
    for(let x=0;x<n;x++)
    {
        if(board[x][j]==num || board[i][x]==num)
        {
            return false;
        }
    }
    //submatrix check
    
	let root_n=Math.sqrt(n);
    let starting_val_i=i-i%root_n;
    let starting_val_j=j-j%root_n;
    
	//Num which is to be filled is already there
    for(let x=starting_val_i;x<starting_val_i+root_n;x++)
    {
        for(let y=starting_val_j;y<starting_val_j+root_n;y++){
            if(board[x][y]==num)
                return false;
        }
    }
    return true;
}



function sudoku_solver(board, i, j, n)
{
    if(i==n)
    {
       // Print(board,n);
		FillBoard(board)
        return true;
    }
    // If not inside the board
    if(j==n){
        return sudoku_solver(board,i+1,0,n);
    }
    // if cell is already filled
    if(board[i][j]!=0)
    {
        return sudoku_solver(board,i,j+1,n);
    }
    //try to fill the cell with appropriate num
    for(let num=1;num<=9;num++)
    {
        if(isValid(board,i,j,num,n)){
            board[i][j]=num; 
            let subAns=sudoku_solver(board,i,j+1,n);
            if(subAns)
            {
                return true;
            }
            // Backtracking
            board[i][j]=0;
        }
        
    }
    return false;
}