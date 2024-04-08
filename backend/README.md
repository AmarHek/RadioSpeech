Backend Working Structure:

- server.ts sets up Server on Port 8000 and is the file that has to be executed
- app.ts connects to MongoDB, sets CORSE Headers and defines basic API Path
- MongoDB must be installed locally, port and database names can be set in config/db.config.ts

Folder config:
- secret key in auth.config.ts
- cors origins in cors.config.ts
- mongo config in db.config.ts

Folder models:

- template.schema.ts defines how a template looks like in the database (a template and its name), 
have in mind that an id is automatically added as well
- template.model.ts defines how a template and its substructures look like in json / from excel
- doctor-report.schema.ts defines the db structure for saving doctor reports
- doctor-report.model.ts provides the necessary interfaces for typescript
- role.model.ts are the allowed user roles
- user.schema.ts describes database entries for user management

Folder controllers:
- all functions for HTTP requests are defined here
- auth, user material and template allow such requests

Folder Routes:
- defines proper routing for all HTTP requests
- implements multer for material images and template excels/jsons

Folder middleware:
- contains middleware functions for verifying signUp, signIn, tokens, usernames etc.
- also contains excelParser middleware for parsing xlsx files into jsons

Public folders:
- dist for angular output
- data for excels, images and jsons
