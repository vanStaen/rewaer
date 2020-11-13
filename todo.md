# PythonBot

Rewaer Back End

## To-dos:

- [ ] Store image data
  - [x] Create AWS S3 bucket
  - [ ] Rest API 'upload'
  - [ ] Save image in s3 bucket
  - [ ] return a link to file to FE
- [ ] Refresh JWT token
- [ ] Restraint/filter result for userID (is auth delivers the user ID)
- [ ] Write tests
- [ ] Run test on deploy
- [ ] Refactor user resolver to use FindOne()
- [ ] give a 7day TTL (time to live) to the refresh token stored in the database 
  - https://github.com/mongoosejs/mongoose-ttl

## Completed ✓

- [x] Set up route for User + database handling
- [x] Whitelist Heroku IP in mongodb Atlas
- [x] Set up the rest of the database
  - [x] Define the other collection (model: Looks)
  - [x] Define the other collection (model: Items)
  - [x] Import old look data from MySQL
  - [x] Import pictures from FTP
- [x] Implement GraphQL
  - [x] First Steps
  - [x] Create all Schemas
  - [x] Create all Resolvers
- [x] Encrypt passwords
- [x] Implement Auth
- [x] Create admin@rewaer.com email
- [x] Clean resolvers
