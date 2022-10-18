# Voucker Platform
  Voucker is a voucher-selling platform. To build a platform to help local business owners to expand their market to more people by posting their service vouchers.


## User Type
- Admin User
- Vendor User
- Customer User

## Run Application Locally

### Run backend
`cd BE`</br>
`npm i`</br>
`docker-compose up --build`

### Run frontend
`cd FE`</br>
`npm i`</br>
`npm run dev`

## Backend Services (Microservice - Nest.js)
- InventoryService
- CategoryService
- LocationService
- OrderService
- StoreService
- TransactionService
- VoucherService

## Frontend Application
- Voucker-platform (Next.js)
- Admin (React.js)

## Packages (Backend)

```
--- Mogodb ORM---
npm i mogoose
npm i @nestjs/mogoose
--- PostgreSql----
npm i pg
--- TypeOrm-------
npm i @nestjs/typeorm
npm i typeorm
--- Configration and vaildation ----
npm i @nestjs/config
npm i joi
npm i class-validator
npm i class-transformer
---- Microservices ----
npm i @nestjs/microservices
npm i amqplib amqp-connection-manager
---- Auth JWT-----
npm i jwks-rsa 
npm i express-jwt
----- swagger -------
npm i @nest/swagger
npm i swagger-ui-express
```




