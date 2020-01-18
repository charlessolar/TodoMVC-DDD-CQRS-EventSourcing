using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NServiceBus;
using Infrastructure.Responses;
using Infrastructure.Extensions;

namespace Example.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {

        private readonly ILogger<TodoController> _logger;
        private readonly IMessageSession _session;

        public TodoController(ILogger<TodoController> logger, IMessageSession session)
        {
            _logger = logger;
            _session = session;
        }

        [HttpGet]
        public Task<Paged<Todo.Models.TodoResponse>> All()
        {
            return _session.Request<Todo.Queries.AllTodos, Todo.Models.TodoResponse>(new Todo.Queries.AllTodos
            {
            });
        }
        public Task<Paged<Todo.Models.TodoResponse>> Active()
        {
            return _session.Request<Todo.Queries.ActiveTodos, Todo.Models.TodoResponse>(new Todo.Queries.ActiveTodos
            {
            });
        }
        public Task<Paged<Todo.Models.TodoResponse>> Complete()
        {
            return _session.Request<Todo.Queries.CompleteTodos, Todo.Models.TodoResponse>(new Todo.Queries.CompleteTodos
            {
            });
        }

        [HttpPost]
        public Task Add(Guid todoId, string message)
        {
            return _session.CommandToDomain(new Todo.Commands.Add
            {
                TodoId = todoId,
                Message=message
            });
        }
        [HttpPost]
        public Task Remove(Guid todoId)
        {
            return _session.CommandToDomain(new Todo.Commands.Remove
            {
                TodoId = todoId
            });
        }
        [HttpPost]
        public Task Complete(Guid todoId)
        {
            return _session.CommandToDomain(new Todo.Commands.MarkComplete
            {
                TodoId = todoId
            });
        }
        [HttpPost]
        public Task Active(Guid todoId)
        {
            return _session.CommandToDomain(new Todo.Commands.MarkActive
            {
                TodoId = todoId
            });
        }
    }
}
