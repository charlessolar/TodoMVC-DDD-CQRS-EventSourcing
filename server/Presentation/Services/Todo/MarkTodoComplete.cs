using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/{TodoId}/complete", "POST")]
    public class MarkTodoComplete : IReturnVoid
    {
        public Guid TodoId { get; set; }
    }
}
