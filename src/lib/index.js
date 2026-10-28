// place files you want to import through the `#lib` alias in this folder.

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

export function checkWinner(board) {
    const match = winningCombos.find(([a, b, c]) => {
        return board[a] && (board[a] === board[b]) && (board[a] === board[c])
    })

    return match;
}