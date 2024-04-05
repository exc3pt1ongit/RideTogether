using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace RideTogether.Orchestrators.Auth.Options;

public class JwtOptions
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string Secret { get; set; } 
    public int TokenLifeTime { get; set; }

    public SymmetricSecurityKey GetSymmetricSecurityKey()
    {
        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));
    }
    
    private static string GenerateRandomSecret(int length)
    {
        const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        using (var rng = new RNGCryptoServiceProvider())
        {
            var bytes = new byte[length];
            rng.GetBytes(bytes);
            var sb = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                sb.Append(validChars[bytes[i] % validChars.Length]);
            }
            return sb.ToString();
        }
    }
}