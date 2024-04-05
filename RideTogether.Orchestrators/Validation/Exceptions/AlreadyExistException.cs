namespace RideTogether.Orchestrators.Validation.Exceptions;

public class AlreadyExistException : Exception
{
    public AlreadyExistException(string message) : base(message) { }
}