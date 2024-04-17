using RideTogether.Dal.Credentials;

namespace RideTogether.Dal.User;

public class UserDao : BaseDao
{
    public string Nickname { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public DateTime RegistrationTime { get; set; } = DateTime.Now;

    // public int CredentialsId { get; set; }
    public CredentialsDao Credentials { get; set; }
}