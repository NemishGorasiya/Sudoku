import { useCallback, useState } from "react";
import { initialBoard, validSudoku } from "../utils/constants";
import "./SudokuBoard.scss";

const SudokuBoard = () => {
	const [board, setBoard] = useState(validSudoku);

	const isValidMove = useCallback(
		(number, index) => {
			console.log("number", number);
			console.log("index", index);
			console.log("is valid fn called");
			const rowIndex = index % 9;
			const colIndex = Math.floor(index / 9);
			console.log("rowIndex", rowIndex);
			console.log("colIndex", colIndex);

			for (let i = 0; i < 9; i++) {
				if (rowIndex === i || colIndex === i) {
					continue;
				}
				if (board[rowIndex][i] === number || board[i][colIndex] === number) {
					console.log(board[rowIndex][i], board[i][colIndex]);
					console.log("rowIndex", rowIndex);
					console.log("colIndex", colIndex);
					console.log("i", i);
					console.log("first");
					return false;
				}
			}
			const subBoxStartRowIdx = rowIndex - (rowIndex % 3);
			const subBoxStartColIdx = colIndex - (colIndex % 3);

			console.log("subBoxStartRowIdx", subBoxStartRowIdx);
			console.log("subBoxStartColIdx", subBoxStartColIdx);

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (board[i + subBoxStartRowIdx][j + subBoxStartColIdx] === number) {
						console.log("second");
						return false;
					}
				}
			}
			return true;
		},
		[board]
	);

	const updateBoard = (number, index) => {
		const isValid = isValidMove(number, index);
		console.log("is valid", isValid);
	};

	return (
		<div className="board">
			{board.flat().map((cell, index) => (
				<div
					className="cell"
					onClick={() => {
						updateBoard(cell, index);
					}}
					key={index}
				>
					{cell}
				</div>
			))}
		</div>
	);
};

export default SudokuBoard;
