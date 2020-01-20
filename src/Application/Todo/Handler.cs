using Aggregates;
using Infrastructure.Extensions;
using Infrastructure.Queries;
using NServiceBus;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Example.Todo
{
    public class Handler :
        IHandleQueries<Queries.AllTodos>,
        IHandleQueries<Queries.ActiveTodos>,
        IHandleQueries<Queries.CompleteTodos>,
        IHandleMessages<Events.Added>,
        IHandleMessages<Events.Removed>,
        IHandleMessages<Events.MarkedActive>,
        IHandleMessages<Events.MarkedComplete>
    {
        private static ConcurrentDictionary<Guid, Models.TodoResponse> MemoryDB = new ConcurrentDictionary<Guid, Models.TodoResponse>();

        public async Task Handle(Queries.AllTodos query, IMessageHandlerContext ctx)
        {
            var results = MemoryDB.Values;

            await ctx.Result(results, results.Count, 0).ConfigureAwait(false);
        }
        public async Task Handle(Queries.ActiveTodos query, IMessageHandlerContext ctx)
        {
            var results = MemoryDB.Values.Where(x => x.Active);

            await ctx.Result(results, results.Count(), 0).ConfigureAwait(false);
        }
        public async Task Handle(Queries.CompleteTodos query, IMessageHandlerContext ctx)
        {
            var results = MemoryDB.Values.Where(x => !x.Active);

            await ctx.Result(results, results.Count(), 0).ConfigureAwait(false);
        }

        public Task Handle(Events.Added e, IMessageHandlerContext ctx)
        {
            if (!MemoryDB.TryAdd(e.TodoId, new Models.TodoResponse
            {
                Id = e.TodoId,
                Message = e.Message,
                Active = true
            }))
                throw new InvalidOperationException($"Todo {e.TodoId} already exists");
            return Task.CompletedTask;
        }
        public Task Handle(Events.Edited e, IMessageHandlerContext ctx)
        {
            if (!MemoryDB.TryGetValue(e.TodoId, out var existing))
                throw new InvalidOperationException($"Todo {e.TodoId} doesn't exist");


            if (!MemoryDB.TryUpdate(e.TodoId, new Models.TodoResponse
            {
                Id = e.TodoId,
                Message = e.Message,
                Active = existing.Active
            }))
                throw new InvalidOperationException($"Failed to update {e.TodoId}");
            return Task.CompletedTask;
        }
        public Task Handle(Events.Removed e, IMessageHandlerContext ctx)
        {
            if (!MemoryDB.TryRemove(e.TodoId, out var model))
                throw new InvalidOperationException($"Todo {e.TodoId} doesn't exist");
            return Task.CompletedTask;
        }
        public Task Handle(Events.MarkedActive e, IMessageHandlerContext ctx)
        {
            Models.TodoResponse model;
            if (!MemoryDB.TryGetValue(e.TodoId, out model))
                throw new InvalidOperationException($"Todo {e.TodoId} doesn't exist");

            model.Active = true;
            return Task.CompletedTask;
        }
        public Task Handle(Events.MarkedComplete e, IMessageHandlerContext ctx)
        {
            Models.TodoResponse model;
            if (!MemoryDB.TryGetValue(e.TodoId, out model))
                throw new InvalidOperationException($"Todo {e.TodoId} doesn't exist");

            model.Active = false;
            return Task.CompletedTask;
        }
    }
}
