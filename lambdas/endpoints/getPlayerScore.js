const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event',event);
     
    if(!event.pathParameters ||  !event.pathParameters.ID){
        //failed without an id
        return Responses._400({message: 'missing the ID from the Path'})
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err => {
          console.log("error in Dynamo Get", err);
          return null
    })

    if(!user){
        return Responses._400({ message: 'failed to get user ID'})

    }

    return Responses._200({ user })
}