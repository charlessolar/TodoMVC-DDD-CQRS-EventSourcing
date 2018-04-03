using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/{TodoId}/active", "POST")]
    public class MarkTodoActive : IReturnVoid
    {
        public Guid TodoId { get; set; }
    }
}
