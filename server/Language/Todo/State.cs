using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    public class State : Aggregates.State<State>
    {
        public bool Active { get; private set; }
        public string Message { get; private set; }

        private void Handle(Events.Added e)
        {
            this.Active = true;
            this.Message = e.Message;
        }
        private void Handle(Events.MarkedActive e)
        {
            this.Active = true;
        }
        private void Handle(Events.MarkedComplete e)
        {
            this.Active = false;
        }
    }
}
