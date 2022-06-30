# Instructions

**Start**

```
docker compose build
docker compose up
```

# Source Code!

Being this project has such a small domain context there are only a couple source files which contain real logic.  Other files are helpers, extensions, or setup.  

### Important backend files:

* [Domain Command Handler](src/Domain/Todo/Handler.cs)
* [Domain Todo Aggregate](src/Domain/Todo/Todo.cs)
* [Read Model Projector](src/Application/Todo/Handler.cs)
* [Web Request Handler](src/Web/Controllers/TodoController.cs)
* [Domain Handler Tests](src/Test/DomainHandler.cs)
* [Event Handler Tests](src/Test/EventHandler.cs)

Web frontend from [TodoMVC-React](https://github.com/blacksonic/todomvc-react)

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
