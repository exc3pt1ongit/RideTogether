namespace RideTogether.Orchestrators.Credentials;

public class Credentials
{
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public int? RoleId { get; set; }
    public Role.Role Role { get; set; }
}