import * as actionTypes from '../actions/actionTypes';
const initialState={
    name:'',
    pickupAddress:'',
    pickupPin:'',
    destinationAddress:'',
    destinationPin:'',
    height:'',
    width:'',
    length:'',
    noOfUnits:'',
    weightPerUnit:'',
    unit:'',
    phone:'',
    email:'',
    companyName:''
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.RESET_STATE:
            return{
                initialState
            }
        case actionTypes.SET_NAME:
            return {
                ...state,
                name:action.name
            }
        case actionTypes.SET_PICKUP_ADDRESS:
            return{
                ...state,
                pickupAddress:action.pickupaddress
            }
        case actionTypes.SET_PICKUP_PIN:
            return{
                ...state,
                pickupPin:action.pickupPin
            }
        case actionTypes.SET_DESTINATION_ADDRESS:
            return{
                ...state,
                destinationAddress:action.destinationaddress
            }
        case actionTypes.SET_DESTINATION_PIN:
            return{
                ...state,
                destinationPin:action.destinationpin
            }
        case actionTypes.SET_HEIGHT:
            return{
                ...state,
                height:action.height
            }
        
        case actionTypes.SET_WIDTH:
            return{
                ...state,
                width:action.width
            }
        case actionTypes.SET_LENGTH:
                return{
                    ...state,
                    length:action.length
                }
        case actionTypes.SET_UNIT:
            return{
                ...state,
                unit:action.unit
            }
        case actionTypes.SET_NUMBER_OF_UNITS:
                return{
                    ...state,
                    noOfUnits:action.noOfUnits
                }

        case actionTypes.SET_WEIGHT_PER_UNIT:
                return{
                        ...state,
                        weightPerUnit:action.weightPerUnit
                }
        case actionTypes.SET_PHONE:
                    return{
                            ...state,
                            phone:action.phone
                    }
        case actionTypes.SET_EMAIL:
                        return{
                                ...state,
                                email:action.email
                        }
        case actionTypes.SET_COMPANY_NAME:
                            return{
                                    ...state,
                                    companyName:action.compName
                            }
    }

    return state;
};

export default reducer;