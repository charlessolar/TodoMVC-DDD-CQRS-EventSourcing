using FluentValidation;
using Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace Example.Todo.Validators
{
    public class Remove : AbstractValidator<Commands.Remove>
    {
        public Remove()
        {
            RuleFor(x => x.TodoId).NotEmpty();
        }
    }
}
