# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API EndpointsS
#### Products
- Index :'Products/' [GET]
- Show :'Products/id' [GET]
- Create [token required] : 'Products/id' [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) : 'Products/:category' [GET]

#### Users
- Index [token required]: 'Users/' [GET]
- Show [token required] : 'Users/:id' [GET]
- Create N[token created] : 'Users/' [POST]

#### Orders
-Index : '/order' [GET]
-Current Order by user (args: user id)[token required] : '/order/id' [GET]
-get_Order_details (args : order id)  : '/order/products/id' [GET]
- Create Order :'/order' [POST]
-Add product to order (args: order id , product id ,quantity) : '/order/products' :[POST]

## Data Shapes
#### Product
-  id :  SERIAL PRIMARY KEY
- name :VARCHAR (50) 
- price : decimal(15,4)
- [OPTIONAL] category : VARCHAR(30)

#### User
- id :  SERIAL PRIMARY KEY
- firstName : VARCHAR(50)
- lastName : VARCHAR(50)
- password :  VARCHAR(100) encrypted using bcrypt

#### Orders
- id : SERIAL PRIMARY KEY
- user_id : BIGINT
- status of order (active or complete):VARCHAR(50)
### orders
- id:  SERIAL PRIMARY KEY
- id of each product : BIGINT REFERENCES product(id)
- order id : BIGINT REFERENCES orders(id)
- quantity of each product in the order : INTEGER