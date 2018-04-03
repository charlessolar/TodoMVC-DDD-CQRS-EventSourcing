using Aggregates;
using NServiceBus;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Example.Todo
{
    public class Handler :
        IHandleMessages<Commands.Add>,
        IHandleMessages<Commands.Remove>,
        IHandleMessages<Commands.MarkActive>,
        IHandleMessages<Commands.MarkComplete>
    {
        public async Task Handle(Commands.Add command, IMessageHandlerContext ctx)
        {
            var task = await ctx.For<Todo>().New(command.TodoId).ConfigureAwait(false);
            task.Add(command.Message);
        }
        public async Task Handle(Commands.Remove command, IMessageHandlerContext ctx)
        {
            var task = await ctx.For<Todo>().Get(command.TodoId).ConfigureAwait(false);
            task.Remove();
        }
        public async Task Handle(Commands.MarkActive command, IMessageHandlerContext ctx)
        {
            var task = await ctx.For<Todo>().Get(command.TodoId).ConfigureAwait(false);
            task.MarkActive();
        }
        public async Task Handle(Commands.MarkComplete command, IMessageHandlerContext ctx)
        {
            var task = await ctx.For<Todo>().Get(command.TodoId).ConfigureAwait(false);
            task.MarkComplete();
        }
    }
}
