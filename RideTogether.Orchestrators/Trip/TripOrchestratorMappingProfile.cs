using AutoMapper;
using RideTogether.Dal.Trip;

namespace RideTogether.Orchestrators.Trip;

public class TripOrchestratorMappingProfile : Profile
{
    public TripOrchestratorMappingProfile()
    {
        CreateMap<PlaceDao, Place.Place>().ReverseMap();
        CreateMap<TripDao, Model.Trip>().ReverseMap();
    }
}