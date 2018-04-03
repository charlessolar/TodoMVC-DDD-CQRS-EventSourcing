using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/active", "GET")]
    public class ActiveTodos : IReturn<Models.TodoResponse>
    {
    }
}
