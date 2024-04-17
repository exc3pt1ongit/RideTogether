namespace RideTogether.Orchestrators.User.Model;

public class User
{
    public int Id { get; set; }
    public string Nickname { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public DateTime RegistrationTime { get; set; }
    public Role.Role Role { get; set; }
    public Credentials.Credentials Credentials { get; set; }
}