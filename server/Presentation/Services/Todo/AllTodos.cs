using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/all", "GET")]
    public class AllTodos : IReturn<Models.TodoResponse>
    {
    }
}
