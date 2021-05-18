# Rewaer

## To-dos:

- [ ] User endpoint should create a User through the Auth Service "Passport"
- [ ] Write tests
- [ ] Run test on deploy
- [ ] give a 7day TTL (time to live) to the refresh token stored in the database
  - https://github.com/mongoosejs/mongoose-ttl
  - https://docs.mongodb.com/manual/tutorial/expire-data/

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
- [x] Store image data
  - [x] Create AWS S3 bucket
  - [x] Rest API 'upload'
  - [x] Save image in s3 bucket
  - [x] return a fileURL to FE
- [x] Refresh JWT token (auth server)
- [x] Restraint/filter result for userID (is_auth delivers the user ID)
- [x] Generate thumbnail
  - [x] create a thumbs endpoint
  - [x] create thumbnail in upload endpoint
  - [x] upload thumbnail to S3
  - [x] return thumbnail Url to front end
  - [x] adapt look and item models for mediaURLthumb/medium
