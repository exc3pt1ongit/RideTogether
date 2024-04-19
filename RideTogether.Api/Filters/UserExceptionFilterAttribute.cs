using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace RideTogether.Api.Filters;

public class UserExceptionFilterAttribute : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext  context)
    {
        var errorResponse = new
        {
            message = "An error occured",
            details = context.Exception.Message
        };
        
        context.Result = new BadRequestObjectResult(errorResponse)
        {
            StatusCode = 500
        };
    }
}