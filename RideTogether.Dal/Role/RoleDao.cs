using RideTogether.Dal.Credentials;

namespace RideTogether.Dal.Role;

public class RoleDao : BaseDao
{
    public string RoleName { get; set; }
    public bool BasicRole { get; set; } = false;
    public ICollection<CredentialsDao> Credentials { get; set; }
}