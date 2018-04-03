using Infrastructure.Extensions;
using NServiceBus;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Example
{
    public class Service : ServiceStack.Service
    {
        private readonly IMessageSession _bus;

        public Service(IMessageSession bus)
        {
            _bus = bus;
        }

        public Task<Todo.Models.TodoResponse> Any(Todo.AllTodos request)
        {
            return _bus.Request<Todo.Models.TodoResponse>(new Todo.Queries.AllTodos
            {
            });
        }
        public Task<Todo.Models.TodoResponse> Any(Todo.ActiveTodos request)
        {
            return _bus.Request<Todo.Models.TodoResponse>(new Todo.Queries.ActiveTodos
            {
            });
        }
        public Task<Todo.Models.TodoResponse> Any(Todo.CompleteTodos request)
        {
            return _bus.Request<Todo.Models.TodoResponse>(new Todo.Queries.CompleteTodos
            {
            });
        }

        public Task Post(Todo.AddTodo request)
        {
            return _bus.CommandToDomain(new Todo.Commands.Add
            {
                TodoId = request.TodoId,
                Message = request.Message
            });
        }
        public Task Post(Todo.RemoveTodo request)
        {
            return _bus.CommandToDomain(new Todo.Commands.Remove
            {
                TodoId = request.TodoId
            });
        }
        public Task Post(Todo.MarkTodoActive request)
        {
            return _bus.CommandToDomain(new Todo.Commands.MarkActive
            {
                TodoId = request.TodoId
            });
        }
        public Task Post(Todo.MarkTodoComplete request)
        {
            return _bus.CommandToDomain(new Todo.Commands.MarkComplete
            {
                TodoId = request.TodoId
            });
        }
    }
}
