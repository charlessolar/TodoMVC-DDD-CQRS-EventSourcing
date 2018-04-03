using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo", "POST")]
    public class AddTodo : IReturnVoid
    {
        public Guid TodoId { get; set; }
        public string Message { get; set; }
    }
}
