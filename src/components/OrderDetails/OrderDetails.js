import React from 'react'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/constants';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    Card,
    Button,
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
    },
    formControl: {
        marginTop:'1%'
    }
});
const OrderDetails = (props) => {
    const classes=useStyles();
    return (
        <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Order Details
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Order Date :</th>
                                                <td>30th May 2003</td>
                                            </tr>
                                        </Grid>
                                        
                                        
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.pickupAddress+" : "}</th>
                                                <td>10, KP Road,Patna,804453</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.destinationAddress+" : "}</th>
                                                <td>24, BS Road,Howrah,711208</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.noOfUnits+" : "}</th>
                                                <td>5</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.weightPerUnit+" : "}</th>
                                                <td>20 kg</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.DimensionPerUnit+" : "}</th>
                                                <td>20 x 30 x 40 cm </td>
                                            </tr>
                                        </Grid>

                                    </Grid>
                                </table>
                </CardContent>
            </Card>
                    
    )
}
export default OrderDetails
