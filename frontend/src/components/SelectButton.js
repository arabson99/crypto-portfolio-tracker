import { makeStyles } from '@mui/material';


const SelectButton = ({ children, selected, onClick }) => {
    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingRight: 20,
            paddingLeft: 20,
            fontFamily: "Montserrat",
            color: selected ? "black" : 500,
            backgroundColor: selected ? "gold" : "",
            cursor: "pointer",

        },
    });

    const classes = useStyles();

  return (
    <span onclick={onclick} className={classes.selectbutton}>

    </span>
  );
};

export default SelectButton
