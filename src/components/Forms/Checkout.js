import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
    Card,
    Button,
} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LocationDetails from './LocationDetails';
import ProductDetails from './ProductDetails';
import CustomerDetails from './CustomerDetails';
import OrderSummary from './OrderSummary';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner';
import Modal from '@material-ui/core/Modal';
import {Grid} from '@material-ui/core';
import constants from '../../Constants/constants';
const useStyles = makeStyles((theme) => ({
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
    },
    paper: {
        position: 'absolute',
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
         padding: theme.spacing(2, 4, 3),
      },
      formControl: {
        marginTop:'1%'
    }
}));
function getStepContent(step) {
    switch (step) {
        case 0:
            return <LocationDetails />;
        case 1:
             return <ProductDetails/>
        case 2:
             return <CustomerDetails/>
        case 3: 
             return <OrderSummary/>
        default:
            throw new Error('Unknown step');
    }
}

function SimpleCard(props) {
    const classes = useStyles();
    //Handle Page Change
    const [activeStep, setactiveStep] = useState(0)
    const [success,setSuccess]=useState(false);
    const [failure,setFailure] = useState(false);
    const [loading,setLoading]=useState(false);

    const handleNextClick = () => {
        setactiveStep(activeStep + 1);
    }
    const handleBackClick = () => {
        setactiveStep(activeStep - 1);
    }

    
    const handlePlaceOrderClick=()=>{
        setLoading(true);
        const url='https://2n3n7swm8f.execute-api.ap-south-1.amazonaws.com/draft0/customerorder'
        const data={
            customerOrders:[
                {   
                    toAddress:props.destinationAddress,
                    fromAddress:props.pickupAddress,
                    toPin:props.destinationPin,
                    fromPin:props.pickupPin,
                    customerEmail:props.email,
                    noOfUnits:parseInt(props.noOfUnits),
                    weightPerUnit:parseFloat(props.weightPerUnit),
                    height:parseFloat(props.height),
                    width:parseFloat(props.width),
                    breadth:parseFloat(props.length),
                    unit:props.unit
                }]
        }
        axios.post(url,data)
        .then(resp=>{
            console.log(resp.data);
            setLoading(false);
            setSuccess(true);
            props.onresetState();
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
            setFailure(true);
        })
    }

    let redirect=null;
    if(success==true)
    {
        redirect=<Redirect to="/orderSuccess"></Redirect>;
    }
    else if(failure==true)
    {
        redirect=<Redirect to="/orderFailure"></Redirect>;
    }
    let content=
    <Card className={classes.root}>
            {redirect}
            {getStepContent(activeStep)}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    margin: 20
                }}
            >
                {activeStep !== 0 && (
                    
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBackClick}
                    style={{marginRight:'5px'}}
                >
                    Back
                </Button>
                )}
                {activeStep < 2  && (
                    
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextClick}
                >
                    Next
            </Button>
                )}
                {/* Button for confirm page */}
                {activeStep === 2&&(
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextClick}
                    >
                        Order
                    </Button>
                )}
                {/* Button for placing order */}
                {activeStep === 3&&(
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrderClick}
                    >
                        Confirm Order
                    </Button>
                )}
            </div>
        </Card>;

        if(loading==true)
        {
            content=
            <div class="jumbotron text-center">
                <h1 class="display-4">Thank You!</h1>
                <p class="lead"><strong>For Placing  Your Order</strong> </p>
                <Spinner/>
            </div>
        }
    return (
        <div>
        {content}
        </div>
    );
}

const mapStateToProps=state=>{
    return{
        name:state.name,
        pickupAddress:state.pickupAddress,
        pickupPin:state.pickupPin,
        destinationAddress:state.destinationAddress,
        destinationPin:state.destinationPin,
        height:state.height,
        width:state.width,
        length:state.length,
        noOfUnits:state.noOfUnits,
        weightPerUnit:state.weightPerUnit,
        unit:state.unit,
        phone:state.phone,
        email:state.email,
        companyName:state.companyName
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onresetState:()=>dispatch(actions.resetState()),
        
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(SimpleCard);