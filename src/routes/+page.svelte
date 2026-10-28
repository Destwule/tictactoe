<script>
    import { checkWinner } from "#lib";

    let board = $state(Array(9).fill(null));
    let turn = $state('X');

    let wins = $state(0);
    let ties = $state(0);
    let loses = $state(0);
    let winner = $state(null);
    let winningCombo = $state(undefined);
    
    function makeMove(index) {
        if (board[index] || winner) return;

        board[index] = turn;
        winningCombo = checkWinner(board);

        if (winningCombo) {
            winner = turn;
            if (winner === 'X') wins++;
            else loses++;
            return;
        }

        if (!board.includes(null)) {
            ties++;
            winner = "Tie";
            return;
        }

        turn = turn === 'X' ? 'O' : 'X';
    }
    
    function clearBoard() {
        board = Array(9).fill(null)
        winningCombo = undefined;
        winner = null;
        turn = 'X';
    }
</script>
<div class="game-container">
    <div class="main">
        <div class="heading">
            <p class="title">
                <span class="is_x">X</span>
                <span class="is_o">O</span>
            </p>
            <p class="turn">
                <span>{turn}</span> TURN
            </p>
            <button onclick={clearBoard} class="redo centered">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                </svg>
            </button>
        </div>

        <div class="board">
            {#each board as cell, i}
                <button
                 class="cell 
                        {cell === 'X' ? 'is_x' : cell === 'O' ? 'is_o' : ''}
                        {winningCombo && winningCombo.includes(i) ? 'winner' : ''}"
                 onclick={() => makeMove(i)}>
                    {cell}
                </button>
            {/each}
        </div>

        <div class="stats">
            <div class="stat wins is_x">
                <p>X(you)</p>
                <h3>{wins}</h3>
            </div>
            <div class="stat ties">
                <p>TIES</p>
                <h3>{ties}</h3>
            </div>
            <div class="stat loses is_o">
                <p>O(opps)</p>
                <h3>{loses}</h3>
            </div>
        </div>
    </div>
</div>

<!-- {#if winner} -->
<div class="modal-overlay {winner === null ? 'hide' : 'show'}">
    <div class="modal-card">
        <h2>
            {#if winner === 'X'}
                🎉 You Won!
            {:else if winner === 'O'}
                😢 You Lost!
            {:else}
                🤝 It's a Tie!
            {/if}
        </h2>

        <div class="modal-buttons">
            <button class="btn-primary" onclick={clearBoard}>New Game</button>
            <button class="btn-secondary" onclick={() => { clearBoard(); wins=0; ties=0; loses=0; }}>Quit / Reset Stats</button>
        </div>
    </div>
</div>
<!-- {/if} -->


<style>
    :root {
        --column-width: 80px;
    }
    button {
        font-family: 'Courier New', Courier, monospace;
    }
    
    .is_x { color: royalblue; }
    .is_o { color: orange; }

    .centered {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hide {
        transform: translateY(-100%);
    }

    .show {
        transition: 1s transform;
        transform: translateY(0%);
    }
        
    .game-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100vh;
        font-family: monospace;
        
        .main {
            display: inherit;
            flex-direction: inherit;
            gap: 0.3rem;
        }
    }

    .heading {
        display: flex;
        width: auto;
        justify-content: space-between;
        align-items: center;
        font-size: 2rem;
        font-weight: bolder;
    
    
        .title {
            display: flex;
        }
    
        .turn {
            font-size: 1rem;
            display: flex;
            color: white;
            background-color: #333;
            border-radius: 10px;
            gap: 0.4rem;
            padding: 0.4rem 0.8rem;
            opacity: 0.6;
            box-shadow: 2px 2px 0;
        }
    
        .redo {
            padding: 0.2rem 0.5rem;
            border-radius: 0.4rem;
            background-color: black;
            color: white;
            font-weight: bolder;
            transition: 0.2s opacity;
            
            &:hover {
                opacity: 0.7;
            }
        }
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, var(--column-width));
        grid-template-rows: repeat(3, 80px);
        gap: 12px;
        
        .cell {
            font-size: 3.5rem;
            font-weight: bolder;
            display: grid;
            place-items: center;
            background-color: #333;
            box-shadow: 5px 5px 0;
            
            &.winner {
                transition: 0.2s color;
                color: rgb(92, 255, 92);
            }
        }
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(3, var(--column-width));
        color: white;
        gap: 12px;
        font-weight: bolder;

        .stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1rem;
            border-radius: 10px;
            padding: 0 0.4rem;
            margin-top: 10px;
        }
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;

        .modal-card {
            background: #1e293b;
            color: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            box-shadow: 8px 8px 0px black;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            min-width: 280px;

            h2 {
                margin: 0;
                font-size: 2rem;
            }

            .modal-buttons {
                display: flex;
                gap: 10px;
                justify-content: center;

                button {
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    border: none;
                    box-shadow: 3px 3px 0 black;
                    transition: transform 0.1s;

                    &:active {
                        transform: translate(2px, 2px);
                        box-shadow: 1px 1px 0 black;
                    }
                }

                .btn-primary {
                    background: #22c55e;
                    color: black;
                }

                .btn-secondary {
                    background: #ef4444;
                    color: white;
                }
            }
        }
    }
</style>