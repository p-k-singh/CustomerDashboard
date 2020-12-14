import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import WaveLoader from './UI/WaveLoader';
import axios from 'axios';
import {
  TextField,
  Grid,
  Card,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  InputAdornment
} from '@material-ui/core'
import Axios from 'axios';
const useStyles = makeStyles({
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
  formHeadings: {
    margin: 20,
    marginBottom: 0
  }
});

const PriceCalculator = (props) => {
  const classes = useStyles();

  //State Variables for form fields
  const [height,setHeight]=useState(0);
  const [width,setWidth]=useState(0);
  const [breadth,setBreadth]=useState(0);
  const [pickuppin, setpickuppin] = useState(0);
  const [destinationpin, setdestinationpin] = useState(0);
  const [loader,setLoader]=useState(false);
  const [estimatedPrice,setEstimatedPrice]=useState(0);
  const [showPrice,setShowPrice]=useState(false);
  /*const [dis,setDis]=useState(true);
  const [validatePickupPin,setValidatePickUpPin]=useState(false);
  const [validateDestinationPin,setValidateDestinationPin]=useState(false);
  const [validateHeight,setValidateHeight]=useState(false);
  const [validateBreadth,setValidateBreadth]=useState(false);
  const [validateWidth,setValidateWidth]=useState(false);*/


/*
  function validatePIN (pin) {
    return /^(\d{4}|\d{6})$/.test(pin);
    }

  function validateDimensions(dimension)
  {
      return /^\d+(\.\d{1,2})?$/.test(dimension);
  }*/
  const onPickupZipChangeController=(event)=>{
      var pickupPinCode=event.target.value;
      setpickuppin(pickupPinCode);
  }

  

  const onDestinationZipChangeController=(event)=>{
      var destinationPinCode=event.target.value;
      setdestinationpin(destinationPinCode);
  }
  
  const onHeightChangeController=(event)=>{
        var heightOfProduct=event.target.value;
        setHeight(heightOfProduct);
    }

    const onWidthChangeController=(event)=>{
        var widthOfProduct=event.target.value;
        setWidth(widthOfProduct);
    }
    const onBreadthChangeController=(event)=>{
        var breadthOfProduct=event.target.value;
        setBreadth(breadthOfProduct);
    }

  const handleCalculateClick=()=>{
        setLoader(true);
        const url='https://2n3n7swm8f.execute-api.ap-south-1.amazonaws.com/draft0/pricing'
        axios.get(url,{
            params:{
                height:height,
                width:width,
                breadth:breadth,
                toPin:destinationpin,
                fromPin:pickuppin
            }
        })
        .then(resp=>{
            console.log(resp.data);
            setShowPrice(true);
            setEstimatedPrice(resp.data.estimatedPrice);
            setLoader(false);
        })
        .catch(err=>{
            console.log(err);
        })
  }
    var content= <Card className={classes.root}>
                    <CardContent style={{ padding: 0 }}>
                        <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Price Calculator
                        </Typography>
                        <form>
                                    <Typography className={classes.formHeadings} >Product Details</Typography>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop:10 }}>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        required
                                                        type="number"
                                                        id="height"
                                                        name="height"
                                                        label="Height"
                                                        fullWidth
                                                        value={height}
                                                        autoComplete="Height"
                                                        onChange={(event)=>onHeightChangeController(event)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        type="number"
                                                        id="width"
                                                        name="width"
                                                        label="Width"
                                                        fullWidth
                                                        value={width}
                                                        autoComplete="width"
                                                        onChange={(event)=>onWidthChangeController(event)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        required
                                                        type="number"
                                                        id="breadth"
                                                        name="breadth"
                                                        label="Breadth"
                                                        fullWidth
                                                        value={breadth}
                                                        onChange={(event)=>onBreadthChangeController(event)}
                                                        autoComplete="Breadth"
                                                    />
                                                </Grid>
                                            </Grid>
                                        
                                        <Typography className={classes.formHeadings} >Location Details</Typography>
                                        <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>
                                            <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                type="number"
                                                id="pickupzip"
                                                name="pickupzip"
                                                label="Pickup Zip"
                                                fullWidth
                                                value={pickuppin}
                                                onChange={(event)=>onPickupZipChangeController(event)}
                                                autoComplete="Pickup postal-code"
                                                />
                                            </Grid>
                                    

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                required
                                                type="number"
                                                id="destinationzip"
                                                name="destinationzip"
                                                label="Destination Zip"
                                                fullWidth
                                                value={destinationpin}
                                                onChange={(event)=>onDestinationZipChangeController(event)}
                                                autoComplete="Destination postal-code"
                                                />
                                            </Grid>
                                        </Grid>
                                </form>
                    </CardContent>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            margin: 20
                        }}>
                            <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCalculateClick}
                                >
                                    Calculate
                                </Button>
                    </div>

                </Card>;
                
                if(loader==true)
                content=<WaveLoader/>;

                var priceContent=null;
                if(showPrice==true)
                {
                    priceContent=
                    <Card className={classes.root}>    
                        <div style={{textAlign:'center',fontSize:'18px',padding:'20px'}}>Estimated price is : {estimatedPrice}</div>
                    </Card>
                }

  return (
    <div>
        {content}
        {priceContent}
    </div>   
  )
}

export default PriceCalculator;
