namespace RideTogether.Orchestrators.Contracts.User;

public class SignUpRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string PasswordRepeat { get; set; }
    public string Nickname { get; set; }
}