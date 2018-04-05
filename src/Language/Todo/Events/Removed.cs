using Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo.Events
{
    public interface Removed : IStampedEvent
    {
        Guid TodoId { get; set; }
    }
}
