using AutoMapper;
using RideTogether.Dal.Credentials;
using RideTogether.Dal.Role;
using RideTogether.Dal.User;

namespace RideTogether.Orchestrators.User;

public class UserOrchestratorMappingProfile : Profile
{
    public UserOrchestratorMappingProfile()
    {
        CreateMap<RoleDao, Role.Role>().ReverseMap();
        CreateMap<UserDao, Model.User>().ReverseMap();
        CreateMap<CredentialsDao, Credentials.Credentials>().ReverseMap();
    }
}