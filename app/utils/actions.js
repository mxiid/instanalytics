'use server'

import {S3, PutObjectCommand} from '@aws-sdk/client-s3';
export async function handleFormSubmit(currentState, formData){
    const file = formData.get('dropzone-file');
    const fileName=file?.name
    const fileType = file?.type

    const binaryFile = await file.arrayBuffer();
    const fileBuffer = Buffer.from(binaryFile);

    const s3client = new S3({
        region: 'ap-southeast-1',
        credentials: {
            accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY,
            secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY
        }
    });

    const params ={
        Bucket: 'instanalytics',
        Key: fileName,
        Body: fileBuffer,
        ContentType: fileType
    }

    try{
        const upload = await s3client.send(new PutObjectCommand(params));
        return {
            status: 'success',
            message: `File ${fileName} uploaded successfully`,
            fileName: fileName
        }
    } catch(error){
        console.log(error.message);
        return{
            status: 'error',
            message: error.message
        }
    }
}

