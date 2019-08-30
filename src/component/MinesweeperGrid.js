import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      fontSize: 10,
    },
    paper: {
        height: 12,
        width: 12,
        backgroundColor: '#ffffffb0',
    },
    button: {
        height: 12,
        width: 12,
        borderRadius: 0,
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
}));

const returnOpenedSquare = ({ value, ...props }) => <Paper square {...props}>{value} .</Paper>;
const returnClosedSquare = ({ row, lineIndex, rowIndex, onClick, ...props }) => (
    <Paper
        onClick={() => onClick(lineIndex, rowIndex, { ...row, isOpen: true })}
        onContextMenu={(event) => {
            event.preventDefault();
            onClick(lineIndex, rowIndex, { ...row, isFlaged: !row.isFlaged })
        }}
        variant="contained"
        {...props}
    >
        { row.isFlaged ? '^' : '' }
    </Paper>
);

export default (props) => {
    const { spacing, grid, onClick } = props;
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                {grid.map((line, lineIndex) => (
                    <Grid key={`l-${lineIndex}`} container justify="center" spacing={spacing}>
                        {line.map((row, rowIndex) => (
                            <Grid key={`c-${rowIndex}`} item>
                                {
                                    row.isOpen
                                        ? returnOpenedSquare({className: classes.paper, value: row.value })
                                        : returnClosedSquare({className: classes.button, row, onClick, lineIndex, rowIndex })
                                }
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
