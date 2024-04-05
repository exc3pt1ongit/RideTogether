using AutoMapper;
using RideTogether.Dal.DataObjects.Person;
using RideTogether.Dal.DataObjects.Trip;
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