import React, { useState , useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import constants from '../../Constants/constants';
import axios from 'axios';
import {
    Card,
    Grid,
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
    },
    formControl: {
        marginTop:'1%'
    }
});

const OrderSummary = (props) => {
    const classes = useStyles();    
    const [estimatedMoney,setEstimatedMoney] = useState(-1);
    useEffect(() => {
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
            
        })
        .catch(err=>{
            setEstimatedMoney("Error: Try Later")
            console.log(err);
        })
      },[]);
    return (
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
                            {/* <div
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
                            
                            </div> */}
                                </CardContent>
                            </Card>
    )
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
        setName:(name)=>dispatch(actions.setCustomerName(name)),
        setEmailDispatcher:(email)=>dispatch(actions.setEmail(email)),
        setPhoneDispatcher:(phone)=>dispatch(actions.setPhoneNumber(phone)),
        setCompanyNameDispatcher:(compName)=>dispatch(actions.setCompanyName(compName))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderSummary);
