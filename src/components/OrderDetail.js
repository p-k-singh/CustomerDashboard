import React,{useEffect,useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OrderDetails from './OrderDetails/OrderDetails';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  function Details(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    console.log(props);
    //console.log('addresss'+props.fromAddress);
    return (
      <div className={classes.root}>
        <AppBar style={{ background: '#1e7d3a' }} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Customer details" {...a11yProps(0)} />
            <Tab label="Order details" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Customer Details
        </TabPanel>
        <TabPanel value={value} index={1}>
        <OrderDetails   />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    );
  }


const Home = (props) => {
    const [id,setId] = useState(0);
    const [allDetails,setAllDetails] = useState(null);
    useEffect(()=>{
        const { match: { params } } = props;
        console.log(params.id);
        setId(params.id);
        const url='https://2n3n7swm8f.execute-api.ap-south-1.amazonaws.com/draft0/customerorder/'+params.id;
        console.log(url);
        axios.get(url)
        .then(resp=>{
            console.log(resp.data.Item);
            setAllDetails(resp.data.Item);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    
    return (
        <div>
            {Details(allDetails)}
            
        </div>
    )
}

export default Home
