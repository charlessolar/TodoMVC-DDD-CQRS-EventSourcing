using FluentValidation;
using Infrastructure.Commands;

namespace Example.Todo.Validators
{
    public class Edit : AbstractValidator<Commands.Edit>
    {
        public Edit()
        {
            RuleFor(x => x.TodoId).NotEmpty();
            RuleFor(x => x.Message).NotEmpty();
        }
    }
}
