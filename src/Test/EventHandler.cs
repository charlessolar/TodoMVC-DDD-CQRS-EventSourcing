using Aggregates;
using System;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace Test
{
    public class EventHandler : TestSubject<Example.Todo.Application.Handler>
    {
        [Fact]
        public async Task CreateTodo()
        {
            var @event = Context.Create<Example.Todo.Events.Added>(x =>
            {
                x.TodoId = Context.Id();
                x.Message = "test";
            });

            await Sut.Handle(@event, Context).ConfigureAwait(false);

            Context.App.Check<Example.Todo.Models.TodoResponse>(Context.Id()).Added();
        }
        [Fact]
        public async Task EditTodo()
        {
            Context.App.Plan<Example.Todo.Models.TodoResponse>(Context.Id()).Exists();

            var @event = Context.Create<Example.Todo.Events.Edited>(x =>
            {
                x.TodoId = Context.Id();
                x.Message = "test2";
            });

            await Sut.Handle(@event, Context).ConfigureAwait(false);

            Context.App.Check<Example.Todo.Models.TodoResponse>(Context.Id()).Updated();
        }
        [Fact]
        public async Task RemoveTodo()
        {
            Context.App.Plan<Example.Todo.Models.TodoResponse>(Context.Id()).Exists();

            var @event = Context.Create<Example.Todo.Events.Removed>(x =>
            {
                x.TodoId = Context.Id();
            });

            await Sut.Handle(@event, Context).ConfigureAwait(false);

            Context.App.Check<Example.Todo.Models.TodoResponse>(Context.Id()).Deleted();
        }
    }
}
