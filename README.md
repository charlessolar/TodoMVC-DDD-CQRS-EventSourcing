# Instructions

**Linux Only**

One docker image we require to run (eventstore) doesn't have a windows container - so run `docker-compose` on linux only for now!

**Start**

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml build
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

# Source Code!

Being this project has such a small domain context there are only a couple source files which contain real logic.  Other files are helpers, extensions, or setup.  

### Important backend files:

[Domain Command Handler](src/Domain/Todo/Handler.cs)
[Domain Todo Aggregate](src/Domain/Todo/Todo.cs)
[Read Model Projector](src/Application/Todo/Handler.cs)
[Web Request Handler](src/Presentation/Service.cs)

### Important frontend files:



### EventStore Management

{host}:2113

### RabbitMq Management

{host}:15672
