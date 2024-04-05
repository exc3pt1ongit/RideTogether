using RideTogether.Models.CredentialsModel;
using RideTogether.Models.RoleModel;

namespace RideTogether.Models.UserModel;

public class User : BaseModel
{
    public string Nickname { get; set; }
    public string Email { get; set; }
    public DateTime RegistrationTime { get; set; }
    public Role Role { get; set; }
    public Credentials Credentials { get; set; }
}