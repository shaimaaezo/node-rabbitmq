# node-rabbitmq
- this is microservices_nodejs using Rabbitmq
- I use 2 project nodejs and connect each ather using Rabbitmq
- I use sende folder in (post Api) as signup to enter user data and send it in queue of rabbitmq
- In reciver folder I recieve data from queue and save it in moongodb
- We can get all users using get api but first we must be authenticate using login api.
- Login api create jwt to authenticate user.
