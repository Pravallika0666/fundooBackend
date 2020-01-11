require('dotenv').config()
const multer = require('multer')
const multers3 = require('multer-s3')
const aws = require('aws-sdk')

const accesskeyId = process.env.ACCESS_KEY_ID
const successkeyId = process.env.SUCCESS_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME

aws.config.update({
    accesskeyId: accesskeyId,
    successkeyId: successkeyId,
    bucketName: bucketName
})

const s3 = new aws.s3()

const upload = multer({
    s3: s3,
    bucketName: bucketName,

})