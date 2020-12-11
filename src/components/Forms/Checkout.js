import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
    Card,
    Button,
} from '@material-ui/core';
import LocationDetails from './LocationDetails';
import ProductDetails from './ProductDetails';
import CustomerDetails from './CustomerDetails';
import {connect} from 'react-redux';
import SelectInput from '@material-ui/core/Select/SelectInput';
import {Redirect} from 'react-router'
import { DesktopWindows } from '@material-ui/icons';
import * as actions from '../../store/actions/index';

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
 
const steps = 3;

function getStepContent(step) {
    switch (step) {
        case 0:
            return <LocationDetails />;
        case 1:
             return <ProductDetails/>
        case 2:
             return <CustomerDetails/>
        default:
            throw new Error('Unknown step');
    }
}

function SimpleCard(props) {
    const classes = useStyles();
    //Handle Page Change
    const [activeStep, setactiveStep] = useState(0)
    const [clicked,setClicked]=useState(false)

    const handleNextClick = () => {
        setactiveStep(activeStep + 1);
    }
    const handleBackClick = () => {
        setactiveStep(activeStep - 1);
    }

    const handleOrderClick=()=>{
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
            //console.log(data);
            props.onresetState();
            setClicked(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    let redirect=null;
    if(clicked==true)
    {
        redirect=<Redirect to="/"></Redirect>;
    }
    return (
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
                {activeStep !== 2 && (
                    
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextClick}
                >
                    Next
              </Button>
                )}
                {/* TODO add Orderhandler */}
                {activeStep === 2&&(
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOrderClick}
                    >
                        Order
                    </Button>
                )}
            </div>
        </Card>
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