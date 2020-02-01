# Instructions

**Linux Only**

One docker image we require to run (eventstore) doesn't have a windows container - so run `docker-compose` on linux only for now!

**Start**

```
docker-compose build
docker-compose up
```

**Note**
The web frontend is configured to talk to the api server via `http://localhost:8080` in `docker-compose.override.yml`
If you are running `docker-compose up` on another machine you need to change that address to the remote machines ip.
Example: 
```
frontend:
    build:
      args:
        API_SERVER: http://10.0.0.200:8080
```

# Source Code!

Being this project has such a small domain context there are only a couple source files which contain real logic.  Other files are helpers, extensions, or setup.  

### Important backend files:

* [Domain Command Handler](src/Domain/Todo/Handler.cs)
* [Domain Todo Aggregate](src/Domain/Todo/Todo.cs)
* [Read Model Projector](src/Application/Todo/Handler.cs)
* [Web Request Handler](src/Presentation/Controllers/TodoController.cs)

* [Domain Handler Tests](src/Test/DomainHandler.cs)
* [Event Handler Tests](src/Test/EventHandler.cs)

### Outstanding issues

* The first todo added won't show up right away.  Refreshing the page or adding another todo fixes it.  

The first message sent through the whole system takes longer than all the others as NSB builds caches and does things in the background.  In a true system this is what is known as "eventually consistent."  The web app could fake adding the todo instead of submitting a new request to the web api to counter this.

* Additional todo features like marking complete and deleting don't work

Its a problem with the web api which I am unfamilar with.  DELETE just returns "unsupported media type" and google doesn't have an immediate solution.  After debugging DI containers for 2 days I lack the motivation to dive into this issue deeply at this moment.

* TodoMVC's css sheets are not perfectly integrated 

Mainly because I use material-ui and am used to a more "react" way of styling - they are mostly correct

* Web App is a separate container instead of being included in the presentation container

If the web app was returned via a GET from the asp net core endpoint we wouldn't have to worry about CORS or specifying the ip address of the host.  I debated setting it up that way but integrating a typescript build pipeline with webpack into the C# build process is not my favorite thing to do.  But it *could* happen and may be more ideal

### What is EventSourcing?

EventSourcing is a process of representing domain objects (Orders, Invoices, Accounts, etc) as a series of separate events.

Your application ends up being 1 long audit log which records every state-changing event that occurs.  The advantage of this approach is other processes can read this event log and generate models that contain only the information the process cares about.  There is also additional information available that other services perhaps don't record themselves.

Imagine a shoppign cart which fills with items to buy.  The warehouse only cares about the final order of the stuff the customer actually agreed to purchase -

<img src="img/eventsourcing.png" height="400px">

but the marketing team might care more about the items the customer removed from their cart **without** buying.  

Using eventsourcing correctly you can generate models which contain both sets of information to satisfy both departments with only 1 set of data.

### What is CQRS

CQRS stands for **Command and Query Responsibility Segregation**

<img src="img/cqrs-logical.svg" height="400px">

In a nut shell - commands are everything that want to change the application state.  Queries are anything that want to read application state.  **There is no overlap**

Commands do not return any data other than if they were *Accepted* or *Rejected*. Accepted meaning the change was saved and read models will be updated.  Rejected meaning the command failed validation or was not valid to be run at this time.  (One example would be trying to invoice a sales order which has already been invoiced)

## Architecture Overview

<img src="img/overview.png" height="400px">

## Commands Processing

<img src="img/commands.png" height="400px">

### Good reads

* [Microsoft's CQRS architecture guide](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/cqrs)
* [Microsoft's eventsourcing architecture guide](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)

### EventStore Management

{host}:2113

### RabbitMq Management

{host}:15672
