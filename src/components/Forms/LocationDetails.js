import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  InputAdornment
} from '@material-ui/core'
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

const BuyerDetails = (props) => {
  const classes = useStyles();

  //State Variables for form fields
  /*const [pickupadd, setpickupadd] = useState('');
  const [destadd, setdestadd] = useState('');
  const [pickuppin, setpickuppin] = useState(0);
  const [destinationpin, setdestinationpin] = useState(0);*/


  const onPickupChangeController=(event)=>{
      var pickupAddress=event.target.value;
      props.setPickupAddressDispatcher(pickupAddress)
  }

  const onPickupZipChangeController=(event)=>{
      var pickupPinCode=event.target.value;
      props.setPickupPinDispatcher(pickupPinCode);
  }

  const onDestinationChangeController=(event)=>{
      var destinationAddress=event.target.value;
      props.setDestinationAddressDispatcher(destinationAddress);
  }

  const onDestinationZipChangeController=(event)=>{
      var destinationPinCode=event.target.value;
      props.setDestinationPinDispatcher(destinationPinCode);
  }
  

  const buttonHandler=()=>{
    //alert("Data are : " + pickupadd + ", "+ pickuppin+", "+destadd+", "+destinationpin);
  }
  return (
    <CardContent style={{ padding: 0 }}>
      <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
        Location Details
        </Typography>
      <form>
        <Typography className={classes.formHeadings} >Location Preference</Typography>

        <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="pickupaddress"
              name="pickupaddress"
              label="Pick up address"
              fullWidth
              value={props.pickupAddress}
              onChange={(event)=>onPickupChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              type="number"
              id="pickupzip"
              name="pickupzip"
              label="Pickup Zip"
              fullWidth
              value={props.pickupPin}
              onChange={(event)=>onPickupZipChangeController(event)}
              autoComplete="Pickup postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="destinationaddress"
              name="destinationaddress"
              label="Destination address"
              fullWidth
              value={props.destinationAddress}
              onChange={(event)=>onDestinationChangeController(event)}
              autoComplete="shipping address-line2"
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
               value={props.destinationPin}
               onChange={(event)=>onDestinationZipChangeController(event)}
               autoComplete="Destination postal-code"
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

const mapStateToProps=state=>{
  return{
    pickupAddress:state.pickupAddress,
    pickupPin:state.pickupPin,
    destinationAddress:state.destinationAddress,
    destinationPin:state.destinationPin
  }
}

const mapDispatchToProps=dispatch=>{
  return {
      setPickupAddressDispatcher:(pAddress)=>dispatch(actions.setPickupAddress(pAddress)),
      setDestinationAddressDispatcher:(dAddress)=>dispatch(actions.setDestinationAddress(dAddress)),
      setPickupPinDispatcher:(pPin)=>dispatch(actions.setPickupPin(pPin)),
      setDestinationPinDispatcher:(dPin)=>dispatch(actions.setDestinationPin(dPin)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(BuyerDetails);
