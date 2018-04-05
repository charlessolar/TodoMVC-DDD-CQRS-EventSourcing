using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;
using Infrastructure.Responses;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/active", "GET")]
    public class ActiveTodos : IReturn<Paged<Models.TodoResponse>>
    {
    }
}
