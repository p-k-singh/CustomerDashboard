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
    const [priceLoading,setPriceLoading]=useState(false);
    const [estimatedMoney,setEstimatedMoney]=useState(1);
    const [modalOpen,setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(true);
        //alert(modalOpen);
      };
    
      const handleClose = () => {
        setModalOpen(false);
      };


    const handleNextClick = () => {
        setactiveStep(activeStep + 1);
    }
    const handleBackClick = () => {
        setactiveStep(activeStep - 1);
    }

    const handleReviewClick = () => {
        setModalOpen(false);
    }
    const handlePlaceOrderClick=()=>{
        setModalOpen(false);
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

    const handleOrderClick=()=>{
        handleOpen();
        setPriceLoading(true);
        const url='https://2n3n7swm8f.execute-api.ap-south-1.amazonaws.com/draft0/pricing'
        axios.get(url,{
            params:{
                lenght:props.length,
                breadth:props.height,
                width:props.width,
                toPin:props.destinationPin,
                fromPin:props.pickupPin
            }
        })
        .then(resp=>{
            console.log(resp.data);
            setEstimatedMoney(resp.data.estimatedPrice);
            setPriceLoading(false);
        })
        .catch(err=>{
            setEstimatedMoney("Error: Try Later")
            setPriceLoading(false);
            console.log(err);
        })
    }


    let body = (
        <Card className={classes.paper}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Order Summary
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Order Date :</th>
                                                <td>{(new Date()).toLocaleDateString()}</td>
                                            </tr>
                                        </Grid>
                                        
                                        
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.pickupAddress+": "}</th>
                                                <td>{props.pickupAddress}-{props.pickupPin}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.destinationAddress+": "}</th>
                                                <td>{props.destinationAddress}-{props.destinationPin}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.noOfUnits+": "}</th>
                                                <td>{props.noOfUnits}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.weightPerUnit+": "}</th>
                                                <td>{props.weightPerUnit}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.DimensionPerUnit+": "}</th>
                                                <td>{props.height}x{props.length}x{props.width+" "}{props.unit} </td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.customerName+": "}</th>
                                                <td>{props.name}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.customerEmail+": "}</th>
                                                <td>{props.email}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.customerPhoneNumber+": "}</th>
                                                <td>{props.phone}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.estimatedCost+": "}</th>
                                                <td>Rs {estimatedMoney}</td>
                                            </tr>
                                        </Grid>

                                    </Grid>
                                </table>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    margin: 20
                                }}
                            >
                                
                                    
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReviewClick}
                                    style={{marginRight:'5px'}}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePlaceOrderClick}
                                >
                                    Confirm Order
                                </Button>
                            
                            </div>
                                </CardContent>
                            </Card>
                    
    );
      
    if(priceLoading==true)
    {
        body=(
            <Card className={classes.paper}>
                    <CardContent style={{ padding: 0,marginTop:10 }}>
                        <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Order Summary
                        </Typography>
                        <p style={{textAlign:'center',fontWeight:'bold',fontSize:"20px"}}>Loading order summary</p>
                        <Spinner/>
                    </CardContent>
            </Card>

            );
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
            <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
             {body}
            </Modal>
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