using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/{TodoId}", "DELETE")]
    public class RemoveTodo : IReturnVoid
    {
        public Guid TodoId { get; set; }
    }
}
