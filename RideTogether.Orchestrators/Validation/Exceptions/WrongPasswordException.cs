namespace RideTogether.Orchestrators.Validation.Exceptions;

public class WrongPasswordException : Exception
{
    public WrongPasswordException(string message) : base(message) { }
}