using RideTogether.Models.RoleModel;

namespace RideTogether.Models.CredentialsModel;

public class Credentials
{
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public int? RoleId { get; set; }
    public Role Role { get; set; }
}