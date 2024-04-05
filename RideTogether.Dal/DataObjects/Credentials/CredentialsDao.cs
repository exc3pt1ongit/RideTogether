using RideTogether.Dal.DataObjects.Role;
using RideTogether.Dal.DataObjects.User;

namespace RideTogether.Dal.DataObjects.Credentials;

public class CredentialsDao : BaseDao
{
    public int UserId { get; set; }
    public int? RoleId { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public UserDao User { get; set; }
    public RoleDao Role { get; set; }
}