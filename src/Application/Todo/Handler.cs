using Aggregates;
using Aggregates.Application;
using Application;
using Infrastructure.Extensions;
using Infrastructure.Queries;
using NServiceBus;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Example.Todo.Application
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

        public async Task Handle(Queries.AllTodos query, IMessageHandlerContext ctx)
        {
            var results = ctx.Uow<UnitOfWork>().GetAll();

            await ctx.Result(results, results.Count(), 0).ConfigureAwait(false);
        }
        public async Task Handle(Queries.ActiveTodos query, IMessageHandlerContext ctx)
        {
            var results = ctx.Uow<UnitOfWork>().GetAll().Where(x => x.Active);

            await ctx.Result(results, results.Count(), 0).ConfigureAwait(false);
        }
        public async Task Handle(Queries.CompleteTodos query, IMessageHandlerContext ctx)
        {
            var results = ctx.Uow<UnitOfWork>().GetAll().Where(x => !x.Active);

            await ctx.Result(results, results.Count(), 0).ConfigureAwait(false);
        }

        public async Task Handle(Events.Added e, IMessageHandlerContext ctx)
        {
            await ctx.Uow().Add(e.TodoId, new Models.TodoResponse
            {
                Id = e.TodoId,
                Message = e.Message,
                Active = true
            });
        }
        public async Task Handle(Events.Edited e, IMessageHandlerContext ctx)
        {
            var existing = await ctx.Uow().Get<Models.TodoResponse>(e.TodoId);

            await ctx.Uow().Update(e.TodoId, new Models.TodoResponse
            {
                Id = e.TodoId,
                Message = e.Message,
                Active = existing.Active
            }).ConfigureAwait(false);
        }
        public async Task Handle(Events.Removed e, IMessageHandlerContext ctx)
        {
            var existing = await ctx.Uow().Get<Models.TodoResponse>(e.TodoId);

            await ctx.Uow().Delete<Models.TodoResponse>(e.TodoId).ConfigureAwait(false);
        }
        public async Task Handle(Events.MarkedActive e, IMessageHandlerContext ctx)
        {
            var existing = await ctx.Uow().Get<Models.TodoResponse>(e.TodoId);

            await ctx.Uow().Update(e.TodoId, new Models.TodoResponse
            {
                Id = e.TodoId,
                Message = existing.Message,
                Active = true
            }).ConfigureAwait(false);
        }

        public async Task Handle(Events.MarkedComplete e, IMessageHandlerContext ctx)
        {
            var existing = await ctx.Uow().Get<Models.TodoResponse>(e.TodoId);

            await ctx.Uow().Update(e.TodoId, new Models.TodoResponse
            {
                Id = e.TodoId,
                Message = existing.Message,
                Active = false
            }).ConfigureAwait(false);
        }
    }
}
