using Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo.Commands
{
    public class Remove : StampedCommand
    {
        public Guid TodoId { get; set; }
    }
}
