# Instructions

* Linux Only *

One docker image we require to run (eventstore) doesn't have a windows container - so run `docker-compose` on linux only for now!

* Start 

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml build
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```


# EventStore Management

{host}:2113

# RabbitMq Management

{host}:15672
