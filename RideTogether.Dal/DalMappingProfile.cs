using AutoMapper;
using RideTogether.Dal.Person;
using RideTogether.Dal.Trip;
using RideTogether.Models.Person;
using RideTogether.Models.PersonModel;

namespace RideTogether.Dal;

public class DalMappingProfile : Profile
{
    public DalMappingProfile()
    {
        CreateMap<DriverDao, Driver>().ReverseMap();
        CreateMap<HitchhikerDao, Hitchhiker>().ReverseMap();
        CreateMap<TripDao, Models.TripModel.Trip>().ReverseMap();
    }
}