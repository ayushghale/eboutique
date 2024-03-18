-- user table

admin 
id: int
name : String
email : String
password : String
timestamp : Date



user
id: int
name : String
address : String
PhoneNumber : String
image : String
email : String
password : String
timestamp : Date

catrgory
id: int
name : String
timestamp : Date

product
id: int
name : String
price : int
image : String
description : String
category_id : int foreign key category(id)
timestamp : Date


Review
id: int
product_id : int foreign key product(id)
user_id : int foreign key user(id)
rating : int
review : String
timestamp : Date

designe
id: int
name : String
image : String
timestamp : Date

border
id: int
name : String
image : String
timestamp : Date

custome designe
id: int
border_id : int foreign key border(id)
designe_id : int foreign key designe(id)
color : String
name : String
image : String
timestamp : Date

cart
id: int
custome_designe_id : int foreign key custome_designe(id)
product_id : int foreign key product(id)
user_id : int foreign key user(id)
quantity : int
timestamp : Date



orderDetails
id: int
custome_designe_id : int foreign key custome_designe(id)
order_id : int foreign key order(id)
product_id : int foreign key product(id)
quantity : int
t_code : String
timestamp  : Date

order
id: int
user_id : int foreign key user(id)
totalPrice : int
t_code : String
timestamp  : Date

payment
id: int
order_id : int foreign key order(id)
user_id : int foreign key user(id)
total_price : int
paymentStatus : int defult 0
payment_method : String
online_t_code : String
t_code : String
timestamp  : Date

```





