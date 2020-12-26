import * as actionTypes from './actionTypes';


export const resetState=()=>{
    return{
        type:actionTypes.RESET_STATE
    }
}

export const setCustomerName=(name)=>{
    return{
        type:actionTypes.SET_NAME,
        name:name
    };
};

export const setPhoneNumber=(phone)=>{
    return{
        type:actionTypes.SET_PHONE,
        phone:phone
    };
};


export const setEmail=(email)=>{
    return{
        type:actionTypes.SET_EMAIL,
        email:email
    };
};

export const setCompanyName=(compName)=>{
    return{
        type:actionTypes.SET_COMPANY_NAME,
        compName:compName
    };
};

export const setPickupAddress=(pickupAdd)=>{
    return{
        type:actionTypes.SET_PICKUP_ADDRESS,
        pickupaddress:pickupAdd
    };
};

export const setDestinationAddress=(destAdd)=>{
    return{
        type:actionTypes.SET_DESTINATION_ADDRESS,
        destinationaddress:destAdd
    };
};

export const setDestinationPin=(destPin)=>{
    return{
        type:actionTypes.SET_DESTINATION_PIN,
        destinationpin:destPin
    };
};

export const setPickupPin=(pickupPin)=>{
    return{
        type:actionTypes.SET_PICKUP_PIN,
        pickupPin:pickupPin
    };
};


export const setHeight=(height)=>{
    return{
        type:actionTypes.SET_HEIGHT,
        height:height
    };
};

export const setWidth=(width)=>{
    return{
        type:actionTypes.SET_WIDTH,
        width:width
    };
};

export const setLength=(length)=>{
    return{
        type:actionTypes.SET_LENGTH,
        length:length
    };
};


export const setUnit=(unit)=>{
    return{
        type:actionTypes.SET_UNIT,
        unit:unit
    };
};


export const setNumberOfUnits=(noOfUnits)=>{
    return{
        type:actionTypes.SET_NUMBER_OF_UNITS,
        noOfUnits:noOfUnits
    };
};


export const setWeightPerUnit=(weightPerUnit)=>{
    return{
        type:actionTypes.SET_WEIGHT_PER_UNIT,
        weightPerUnit:weightPerUnit
    };
};

