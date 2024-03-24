using AutoMapper;
using RideTogether.Models.PersonModel;
using RideTogether.Orchestrators.Contracts.Hitchhiker;

namespace RideTogether.Orchestrators.MappingProfiles;

public class HitchhikerOrchestratorMappingProfile : Profile
{
    public HitchhikerOrchestratorMappingProfile()
    {
        CreateMap<CreateHitchhikerRequest, Hitchhiker>().ReverseMap();
        CreateMap<UpdateHitchhikerRequest, Hitchhiker>().ReverseMap();
    }
}