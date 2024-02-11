# JKT_Node_test

It is the Node js project which performs the operations like AWS S3 service

# How to run the project locally

1. Create the file name `.env` in the root of the project. Copy the `.env.dev` content in this `.env` file.

2. Replace the env variable `DIRECTORY_PATH` with your local path, because all bucket folders will be created in this directory_path.

3. Replace the database connection url with your database url if needed.

4. Commands to run the project - \
    `npm install` \
    `npm start`


# How to test the proejct

Postman collection

1) POST create bucket API

```
curl --location 'http://localhost:3000/awsS3Service/createBucket' \
--header 'Content-Type: application/json' \
--data '{
   "bucketName": "videos",
   "userName": "Dhoni"
}'
```

2) PUT put object API

    select the file parameter from the local folder. it is the form-data field

```
curl --location --request PUT 'http://localhost:3000/awsS3Service/putObject' \
--form 'bucketName="videos"' \
--form 'file=@"postman-cloud:///1eec8a0f-9ff8-4860-8b70-590e55cbefa2"'
```

3) GET get object API

```
curl --location 'http://localhost:3000/awsS3Service/getObject?id=65c88c65e890f73ded30f47f' \
--data ''
```

4) GET list bucket API

```
curl --location 'http://localhost:3000/awsS3Service/listBuckets?userName=Dhoni' \
--data ''
```

5) GET list object API

```
curl --location 'http://localhost:3000/awsS3Service/listObjects?userName=Dhoni' \
--data ''
```

6) DELETE delete object API

```
curl --location 'http://localhost:3000/awsS3Service/listObjects?userName=Dhoni' \
--data ''
```
