using Infrastructure.Commands;
using System;

namespace Example.Todo.Commands
{
    public class Edit : StampedCommand
    {
        public Guid TodoId { get; set; }
        public string Message { get; set; }
    }
}
