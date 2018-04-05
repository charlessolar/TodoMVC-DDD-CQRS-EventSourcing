using Infrastructure.Responses;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo
{
    [Api("Todo")]
    [Route("/todo/complete", "GET")]
    public class CompleteTodos : IReturn<Paged<Models.TodoResponse>>
    {
    }
}
