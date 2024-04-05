using AutoMapper;
using RideTogether.Dal.DataObjects.Credentials;
using RideTogether.Dal.DataObjects.Role;
using RideTogether.Dal.DataObjects.User;
using RideTogether.Models.CredentialsModel;
using RideTogether.Models.RoleModel;
using RideTogether.Models.UserModel;
using RideTogether.Orchestrators.Contracts.User;

namespace RideTogether.Orchestrators.MappingProfiles;

public class UserOrchestratorMappingProfile : Profile
{
    public UserOrchestratorMappingProfile()
    {
        CreateMap<UserDao, Models.UserModel.User>().ReverseMap();
        CreateMap<CredentialsDao, Credentials>().ReverseMap();
        CreateMap<RoleDao, Role>().ReverseMap();

        CreateMap<SignUpModel, SignUpRequest>().ReverseMap();
    }
}