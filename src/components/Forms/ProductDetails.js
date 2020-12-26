import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


import {
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    Divider,
    InputAdornment,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        // minWidth: 275,
    },
    title: {
        fontSize: 20,
        height: 50,
        padding: 10,
        paddingLeft: 55,
        color: 'white'
    },
    form: {
        paddingLeft: '10%',
        paddingRight: '10%',
        [theme.breakpoints.down('sm')]: {
            padding:'0%',
        },
    
    },
    radioButton: {
        marginTop: '5%',
        [theme.breakpoints.down('sm')]: {
            margin: '10%',
        },
    },
    
    formHeadings: {
        margin: 20,
        marginBottom: 0
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ProductDimensions = (props) => {
    const classes = useStyles();

    //State Variables for form fields
    /*const [numberOfUnits, setNumberOfUnits]=useState(0);
    const [weightPerUnit, setWeightPerUnit]=useState(0);
    const [unit, setUnit]=useState('');
    const [height, setHeight]=useState(0);
    const [width, setWidth]=useState(0);
    const [length, setLength]=useState(0);*/
    
    const onNumberOfUnitsChangeController=(event)=>{
        var noOfUnits=event.target.value;
        props.setNoOfUnitsDispatcher(noOfUnits);
    }

    const onWeightPerUnitChangeController=(event)=>{
        var perUnitWeight=event.target.value;
        props.setWeightPerUnitDispatcher(perUnitWeight);
    }

    const onHeightChangeController=(event)=>{
        var heightOfProduct=event.target.value;
        props.setHeightDispatcher(heightOfProduct);
    }

    const onWidthChangeController=(event)=>{
        var widthOfProduct=event.target.value;
        props.setWidthDispatcher(widthOfProduct);
    }
    const onLengthChangeController=(event)=>{
        var lengthOfProduct=event.target.value;
        props.setLengthDispatcher(lengthOfProduct);
    }

    const unitChangeController=(event)=>{
        var unitOfProduct=event.target.value;
        props.setUnitDispatcher(unitOfProduct);
    }

    const buttonHandler=()=>{
        //alert("Data is: "+ numberOfUnits+ ", "+weightPerUnit+ ", "+ length+", "+width+", "+height+", "+unit );
    }
    return (
        <CardContent style={{ padding: 0 }}>
            <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                Product Details
        </Typography>
            <form className={classes.form}>
                <Typography className={classes.formHeadings}>Product Weight and Unit</Typography>
                <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            id="units"
                            name="units"
                            label="No of Units"
                            fullWidth
                            value={props.noOfUnits}
                            autoComplete="units"
                            onChange={(event)=>onNumberOfUnitsChangeController(event)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            id="weight"
                            name="weight"
                            label="Weight per unit"
                            fullWidth
                            value={props.weightPerUnit}
                            autoComplete="Weight"
                            onChange={(event)=>onWeightPerUnitChangeController(event)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}

                        />
                    </Grid>
                    
                </Grid>
                <Typography className={classes.formHeadings}>Dimensions per unit</Typography>
                <Grid container spacing={3} style={{ padding: 50, paddingTop:10 }}>
                    <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Unit</InputLabel>
                                <Select
                                    native
                                    //value="inches"
                                    onChange={unitChangeController}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={"inches"}>Inches</option>
                                    <option value={"centimeters"}>Centimeters</option>
                                </Select>
                            </FormControl>
                        </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            id="height"
                            name="height"
                            label="Height"
                            fullWidth
                            value={props.height}
                            autoComplete="Height"
                            onChange={(event)=>onHeightChangeController(event)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            id="width"
                            name="width"
                            label="Width"
                            fullWidth
                            value={props.width}
                            autoComplete="width"
                            onChange={(event)=>onWidthChangeController(event)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            id="length"
                            name="length"
                            label="Length"
                            value={props.length}
                            fullWidth
                            onChange={(event)=>onLengthChangeController(event)}
                            autoComplete="Length"
                        />
                    </Grid>
                </Grid>
                
            </form>
        </CardContent>
    )
}

const mapStateToProps=state=>{
    return{
        height:state.height,
        width:state.width,
        length:state.length,
        unit:state.unit,
        noOfUnits:state.noOfUnits,
        weightPerUnit:state.weightPerUnit
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
        setHeightDispatcher:(h)=>dispatch(actions.setHeight(h)),
        setWidthDispatcher:(w)=>dispatch(actions.setWidth(w)),
        setLengthDispatcher:(l)=>dispatch(actions.setLength(l)),
        setUnitDispatcher:(unitOfMeasurement)=>dispatch(actions.setUnit(unitOfMeasurement)),
        setNoOfUnitsDispatcher:(numberUnits)=>dispatch(actions.setNumberOfUnits(numberUnits)),
        setWeightPerUnitDispatcher:(weightUnit)=>dispatch(actions.setWeightPerUnit(weightUnit)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(ProductDimensions);
