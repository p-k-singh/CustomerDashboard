import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import Navigation from './components/Navigation'
import Home from './components/Home'
import Form from './components/Forms/Checkout'
import PriceCalculator from './components/PriceCalculator'
import Success from './components/OrderStatus/orderSuccess'
import Failure from './components/OrderStatus/orderFailure'
import MyOrders from './components/MyOrders/MyOrders'
import OrderDetail from './components/OrderDetail'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0,0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      
      <main
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <Switch>
          {/* Home page (DashBoard Content) */}
          <Route exact path="/" component={Home} />
          {/* Order Form */}
          <Route exact path="/orders" component={Form} />
          <Route exact path="/myorders" component={MyOrders} />
          <Route exact path="/orderSuccess" component={Success} />
          <Route exact path="/orderFailure" component={Failure} />
          <Route path='/order/:id' render={(props) => {
                    return ( <OrderDetail {...props } /> )
                }} />
          {/* Price Calculator */}
          <Route exact path="/price-calculator" component={PriceCalculator} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
