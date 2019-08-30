import MinesweeperGrid from "../component/MinesweeperGrid";
import React from "react";
import Button from '@material-ui/core/Button';

const getBombsAround = (bombs, c, r, numberOfCols, numberOfRows) => {
    let bombsAround = [];
    for(let i = Math.max(c - 1, 0); i <= Math.min(c + 1, numberOfCols); i++) {
        for(let j = Math.max(r - 1, 0); j<=Math.min(r + 1, numberOfRows); j++) {
            if(isBomb(bombs, i, j)) {
                bombsAround.push([])
            }
        }
    }
    return bombsAround;
};

const isBomb = (bombs, c, r) => {
    const bomb = bombs.filter((bomb) => bomb[0] === c && bomb[1] === r);
    return bomb.length > 0;
};

const getMatrix = (col, row, bombs) => {
    let matrix = [];
    for(let c=0; c<col; c++) {
        matrix[c] = [];
        for(let r=0; r<row; r++) {
            if(isBomb(bombs, c, r)) matrix[c][r] = { value: '💣', isOpen: false, isFlaged: false };
            else {
                const numberOfBombsAround = getBombsAround(bombs, c, r, col, row).length;
                matrix[c][r] = {
                    value: numberOfBombsAround > 0 ? numberOfBombsAround : '',
                    isOpen: false,
                    isFlaged: false
                };
            }
        }
    }
    return matrix;
};

const randomBombsPosition = (total, col, row) => {
    const bombs = [];
    for(let i=0; i<total; i++) {
        const randomCol = Math.floor(Math.random() * (+col));
        const randomRow = Math.floor(Math.random() * (+row));
        bombs[i] = [randomCol, randomRow];
    }
    return bombs;
};

class MinesweeperContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { grid: [] };
    }

    componentDidMount() {
     this.restart();
    }

    openAdjacents(grid, col, row) {
        const { numberOfCols, numberOfRows } = this.props;
        for(let i = Math.max(col - 1, 0); i <= Math.min(col + 1, numberOfCols - 1); i++) {
            for(let j = Math.max(row - 1, 0); j<=Math.min(row + 1, numberOfRows - 1); j++) {
                if(!grid[i][j].isOpen && grid[i][j].value === '') {
                    grid[i][j].isOpen = true;
                    this.openAdjacents(grid, i, j)
                } else {
                    grid[i][j].isOpen = true;
                }
            }
        }
    }

    onClickSquare = (c, r, row) => {
        let grid = [ ...this.state.grid ];
        grid[c][r] = row;

        const { numberOfCols, numberOfRows } = this.props;
        if(row.isOpen && row.value === '') this.openAdjacents(grid, c, r, numberOfCols, numberOfRows);
        if(row.isOpen && row.value === '💣') {
            alert('Game over!');
            grid.map((line) => {
                return line.map((square) => {
                    square.isOpen = true;
                    return square;
                });
            });
        } else {
            const closeSquares = grid.filter((line) => line.find((square) => !square.isOpen && !square.isFlaged));
            if(closeSquares.length === 0) alert('Win!!!');
        }

        this.setState(() => ({ grid }));
    };

    restart = () => {
        const { numberOfBombs, numberOfCols, numberOfRows } = this.props;
        const bombs = randomBombsPosition(numberOfBombs, numberOfCols, numberOfRows);
        const grid = getMatrix(numberOfCols, numberOfRows, bombs);
        this.setState(() => ({
            grid
        }));
    };

    render() {
        return (
            <div>
                <MinesweeperGrid
                    spacing={0}
                    grid={this.state.grid}
                    onClick={this.onClickSquare}
                />
                <Button style={{margin: '1rem'}} variant="contained" color="secondary" onClick={this.restart}>
                    Restart
                </Button>
            </div>
        );
    }
}

export default MinesweeperContainer;
