using AutoMapper;
using RideTogether.Dal.DataObjects.Person;
using RideTogether.Dal.DataObjects.Trip;
using RideTogether.Models.PersonModel;
using RideTogether.Models.TripModel;

namespace RideTogether.Dal;

public class DalMappingProfile : Profile
{
    public DalMappingProfile()
    {
        CreateMap<DriverDao, Driver>().ReverseMap();
        CreateMap<HitchhikerDao, Hitchhiker>().ReverseMap();
        CreateMap<TripDao, Trip>().ReverseMap();
        
        // + UserDao, CredentialsDao, RoleDao
    }
}