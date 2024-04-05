namespace RideTogether.Orchestrators.Validation.Exceptions;

public class InvalidRegistrationException : Exception
{
    public InvalidRegistrationException(string message) : base(message) { }
}