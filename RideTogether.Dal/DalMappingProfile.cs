using AutoMapper;
using RideTogether.Dal.DataObjects.Credentials;
using RideTogether.Dal.DataObjects.Person;
using RideTogether.Dal.DataObjects.Role;
using RideTogether.Dal.DataObjects.Trip;
using RideTogether.Dal.DataObjects.User;
using RideTogether.Models.CredentialsModel;
using RideTogether.Models.PersonModel;
using RideTogether.Models.RoleModel;
using RideTogether.Models.TripModel;
using RideTogether.Models.UserModel;

namespace RideTogether.Dal;

public class DalMappingProfile : Profile
{
    public DalMappingProfile()
    {
        CreateMap<DriverDao, Driver>().ReverseMap();
        CreateMap<HitchhikerDao, Hitchhiker>().ReverseMap();
        CreateMap<TripDao, Trip>().ReverseMap();
        
        CreateMap<UserDao, User>().ReverseMap();
        CreateMap<CredentialsDao, Credentials>().ReverseMap();
        CreateMap<RoleDao, Role>().ReverseMap();
    }
}