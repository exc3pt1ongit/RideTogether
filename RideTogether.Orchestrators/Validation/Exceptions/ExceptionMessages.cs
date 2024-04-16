namespace RideTogether.Orchestrators.Validation.Exceptions;

public static class ExceptionMessages
{
    public static string EmailUsed = "The email {0} is already used.";

    public static string TripAlreadyCreated = "The trip by {0} (from {1} to {2}) is already created.";
    
    public static string NicknameTaken = "The nickname {0} is already taken.";
    
    public static string NotFound = "The object of type {0} with property {1} = {2} is not found. ";
    
    public static string WrongPassword = "The provided password is incorrect.";
    
    public static string DifferenceEmail = "The email {0} is different from the user's. User id: {1}. ";
    
    public static string ProhibitedOperation = "The operation {0} is prohibited with the object of type {1} with property {2} = {3}. ";
    public static string AlreadyExists = "The object of type {0} with property {1} = {2} is already exist.";
}