namespace RideTogether.Orchestrators.User.Model;

public class UpdateRequest
{
    public string Nickname { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public Credentials.Credentials Credentials { get; set; }
}