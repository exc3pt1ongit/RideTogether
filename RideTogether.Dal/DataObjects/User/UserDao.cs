using RideTogether.Dal.DataObjects.Credentials;

namespace RideTogether.Dal.DataObjects.User;

public class UserDao : BaseDao
{
    public string Nickname { get; set; }
    public string Email { get; set; }
    public DateTime RegistrationTime { get; set; } = DateTime.Now;
    // public int CredentialsId { get; set; }
    public CredentialsDao Credentials { get; set; }
}