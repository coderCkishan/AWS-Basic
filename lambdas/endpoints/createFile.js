const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')

const bucket = process.env.bucketName

exports.handler = async event => {
    console.log('event',event);
     
    if(!event.pathParameters ||  !event.pathParameters.fileName){
        //failed without an id
        return Responses._400({message: 'missing the fileName from the Path'})
    }

    let fileName = event.pathParameters.fileName;
    const data = JSON.parse(event.body);

    const newData = await S3.write(data, fileName, bucket).catch(err => {
        console.log('Error in s3 write', err);
        return null;
    })

    if(!newData){
        return Responses._400({ message: 'failed to write data by by fileName'})

    }

    return Responses._200({ newData });
}