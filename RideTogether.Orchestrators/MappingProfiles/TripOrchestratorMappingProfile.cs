using AutoMapper;
using RideTogether.Orchestrators.Contracts.Trip;

namespace RideTogether.Orchestrators.MappingProfiles;

public class TripOrchestratorMappingProfile : Profile
{
    public TripOrchestratorMappingProfile()
    {
        CreateMap<CreateTripRequest, Models.TripModel.Trip>().ReverseMap();
        CreateMap<UpdateTripRequest, Models.TripModel.Trip>().ReverseMap();
    }
}