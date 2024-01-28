const AWS = require('aws-sdk');

exports.uploadToS3=async (data,filename)=>{
    const BUCKET_NAME='chatappbucket6306';
    const IAM_USER_KEY=process.env.ACCESS_KEY;
    const IAM_SECRET_KEY=process.env.SECRET_KEY;
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_SECRET_KEY,
    })
    var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3data)=>{
            if(err){
                console.log(err, " something wrong");
                reject(err);
            }
            else{
                resolve(s3data.Location);
            }
        })
    })

    
}