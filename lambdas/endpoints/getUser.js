const Responses = require('../common/API_Responses')

exports.handler = async event => {
    console.log('event',event);
     
    if(!event.pathParameters ||  !event.pathParameters.ID){
        //failed without an id
        return Responses._400({message: 'missing the ID from the Path'})
    }

    let ID = event.pathParameters.ID;

    if(data[ID]){
        //return data
       return Responses._200(data[ID])
    }

    return Responses._400({ message: 'no ID in data'});
}

const data = {
    1234: {name: 'Anna Jones', age: 25, job: 'journalist'},
    5678: {name: 'chris', age: 52, job:'teacher'}
};