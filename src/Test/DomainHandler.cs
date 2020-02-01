using Aggregates;
using System;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace Test
{
    public class DomainHandler : TestSubject<Example.Todo.Domain.Handler>
    {
        [Fact]
        public async Task HandleAddTodo()
        {
            var command = new Example.Todo.Commands.Add
            {
                TodoId = Context.Id(),
                Message = "test"
            };

            await Sut.Handle(command, Context).ConfigureAwait(false);

            Context.UoW
                .Check<Example.Todo.Todo>(Context.Id())
                .Raised<Example.Todo.Events.Added>();
        }
        [Fact]
        public async Task HandleEditTodo()
        {
            Context.UoW.Plan<Example.Todo.Todo>(Context.Id())
                .HasEvent<Example.Todo.Events.Added>(x =>
                {
                    x.TodoId = Context.Id();
                    x.Message = "test";
                });

            var command = new Example.Todo.Commands.Edit
            {
                TodoId = Context.Id(),
                Message = "test2"
            };

            await Sut.Handle(command, Context).ConfigureAwait(false);

            Context.UoW
                .Check<Example.Todo.Todo>(Context.Id())
                .Raised<Example.Todo.Events.Edited>();
        }
        [Fact]
        public async Task EditUnknownTodo()
        {

            var command = new Example.Todo.Commands.Edit
            {
                TodoId = Context.Id(),
                Message = "test2"
            };
            var ex = await Record.ExceptionAsync(() => Sut.Handle(command, Context)).ConfigureAwait(false);
            ex.Should().BeOfType<Aggregates.Exceptions.NotFoundException>();
        }
        [Fact]
        public async Task HandleRemote()
        {
            Context.UoW.Plan<Example.Todo.Todo>(Context.Id())
                .HasEvent<Example.Todo.Events.Added>(x =>
                {
                    x.TodoId = Context.Id();
                    x.Message = "test";
                });

            var command = new Example.Todo.Commands.Remove
            {
                TodoId = Context.Id(),
            };

            await Sut.Handle(command, Context).ConfigureAwait(false);

            Context.UoW
                .Check<Example.Todo.Todo>(Context.Id())
                .Raised<Example.Todo.Events.Removed>();
        }
        [Fact]
        public async Task HandleMarkActive()
        {
            Context.UoW.Plan<Example.Todo.Todo>(Context.Id())
                .HasEvent<Example.Todo.Events.Added>(x =>
                {
                    x.TodoId = Context.Id();
                    x.Message = "test";
                })
                .HasEvent<Example.Todo.Events.MarkedComplete>(x =>
                {
                    x.TodoId = Context.Id();
                });

            var command = new Example.Todo.Commands.MarkActive
            {
                TodoId = Context.Id(),
            };

            await Sut.Handle(command, Context).ConfigureAwait(false);

            Context.UoW
                .Check<Example.Todo.Todo>(Context.Id())
                .Raised<Example.Todo.Events.MarkedActive>();
        }
        [Fact]
        public async Task HandleMarkComplete()
        {
            Context.UoW.Plan<Example.Todo.Todo>(Context.Id())
                .HasEvent<Example.Todo.Events.Added>(x =>
                {
                    x.TodoId = Context.Id();
                    x.Message = "test";
                });

            var command = new Example.Todo.Commands.MarkComplete
            {
                TodoId = Context.Id(),
            };

            await Sut.Handle(command, Context).ConfigureAwait(false);

            Context.UoW
                .Check<Example.Todo.Todo>(Context.Id())
                .Raised<Example.Todo.Events.MarkedComplete>();
        }
        [Fact]
        public async Task MarkActiveWhileActive()
        {
            Context.UoW.Plan<Example.Todo.Todo>(Context.Id())
                .HasEvent<Example.Todo.Events.Added>(x =>
                {
                    x.TodoId = Context.Id();
                    x.Message = "test";
                });

            var command = new Example.Todo.Commands.MarkActive
            {
                TodoId = Context.Id(),
            };

            var ex = await Record.ExceptionAsync(() => Sut.Handle(command, Context)).ConfigureAwait(false);
            ex.Should().BeOfType<BusinessException>();
        }
        [Fact]
        public async Task MarkCompleteWhileComplete()
        {
            Context.UoW.Plan<Example.Todo.Todo>(Context.Id())
                .HasEvent<Example.Todo.Events.Added>(x =>
                {
                    x.TodoId = Context.Id();
                    x.Message = "test";
                })
                .HasEvent<Example.Todo.Events.MarkedComplete>(x =>
                {
                    x.TodoId = Context.Id();
                });

            var command = new Example.Todo.Commands.MarkComplete
            {
                TodoId = Context.Id(),
            };

            var ex = await Record.ExceptionAsync(() => Sut.Handle(command, Context)).ConfigureAwait(false);
            ex.Should().BeOfType<BusinessException>();
        }
    }
}
