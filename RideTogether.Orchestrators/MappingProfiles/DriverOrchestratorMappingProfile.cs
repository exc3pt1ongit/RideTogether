using AutoMapper;
using RideTogether.Models.Person;
using RideTogether.Orchestrators.Contracts.Driver;

namespace RideTogether.Orchestrators.MappingProfiles;

public class DriverOrchestratorMappingProfile : Profile
{
    public DriverOrchestratorMappingProfile()
    {
        CreateMap<CreateDriverRequest, Driver>().ReverseMap();
        CreateMap<UpdateDriverRequest, Driver>().ReverseMap();
    }
}