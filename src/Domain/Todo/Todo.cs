using Aggregates;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    public class Todo : Aggregates.Entity<Todo, State>
    {
        private Todo() { }

        public void Add(string message)
        {
            Apply<Events.Added>(x =>
            {
                x.TodoId = Id;
                x.Message = message;
            });
        }
        public void Edit(string message)
        {
            Apply<Events.Edited>(x =>
            {
                x.TodoId = Id;
                x.Message = message;
            });
        }
        public void Remove()
        {
            Apply<Events.Removed>(x =>
            {
                x.TodoId = Id;
            });
        }
        public void MarkActive()
        {
            Rule("Not Active", x => x.Active);

            Apply<Events.MarkedActive>(x =>
            {
                x.TodoId = Id;
            });
        }
        public void MarkComplete()
        {
            Rule("Active", x => !x.Active);

            Apply<Events.MarkedComplete>(x =>
            {
                x.TodoId = Id;
            });
        }
    }
}
