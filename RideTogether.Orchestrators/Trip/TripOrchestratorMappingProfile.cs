using AutoMapper;
using RideTogether.Dal.Trip;
using RideTogether.Dal.Trip.Filtering;
using RideTogether.Orchestrators.Trip.Model;
using RideTogether.Orchestrators.Trip.Model.Requests;
using TripAmenities = RideTogether.Dal.Trip.TripAmenities;

namespace RideTogether.Orchestrators.Trip;

public class TripOrchestratorMappingProfile : Profile
{
    public TripOrchestratorMappingProfile()
    {
        CreateMap<PlaceDao, Place.Place>().ReverseMap();
        // CreateMap<TripDao, Model.Trip>().ReverseMap();
        
        CreateMap<TripDao, TripResponseDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.DriverId, opt => opt.MapFrom(src => src.DriverId))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
            .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTime))
            .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
            .ForMember(dest => dest.Destination, opt => opt.MapFrom(src => src.Destination))
            .ForMember(dest => dest.Amenities, opt => opt.MapFrom(src => src.Amenities))
        .ReverseMap();
    
        CreateMap<GetTripsRequest, TripFilter>()
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy ?? 0))
            .ForMember(dest => dest.MainFilter, opt => opt.MapFrom(src => src.MainFilter ?? ""))
            .ForMember(dest => dest.DepartureSixToNoon, opt => opt.MapFrom(src => src.DepartureSixToNoon ?? false))
            .ForMember(dest => dest.DepartureNoonToSix, opt => opt.MapFrom(src => src.DepartureNoonToSix ?? false))
            .ForMember(dest => dest.DepartureAfterSixPm, opt => opt.MapFrom(src => src.DepartureAfterSixPm ?? false))
            .ForMember(dest => dest.SourceLat, opt => opt.MapFrom(src => src.SourceLat))
            .ForMember(dest => dest.SourceLng, opt => opt.MapFrom(src => src.SourceLng))
            .ForMember(dest => dest.DestinationLat, opt => opt.MapFrom(src => src.DestinationLat))
            .ForMember(dest => dest.DestinationLng, opt => opt.MapFrom(src => src.DestinationLng))
            .ForMember(dest => dest.TripDate, opt => opt.MapFrom(src => src.TripDate))
            // .ForMember(dest => dest.Amenities, opt => opt.MapFrom(src => src.Amenities == null ? null : MapAmenities(src.Amenities)))
            .ReverseMap();
        
        CreateMap<TripDao, TripResponseDto>()
            .ForMember(dest => dest.Amenities, opt => opt.MapFrom(src => MapAmenities(src.Amenities)))
            .ReverseMap();
        
        // CreateMap<TripAmenities, TripAmenities>() // Add this line
        //     .ForMember(dest => dest.MaximumTwoPeopleBackSeat, opt => opt.MapFrom(src => src.MaximumTwoPeopleBackSeat ?? false))
        //     .ForMember(dest => dest.CanSmoke, opt => opt.MapFrom(src => src.CanSmoke ?? false))
        //     .ForMember(dest => dest.PetsAllowed, opt => opt.MapFrom(src => src.PetsAllowed ?? false))
        //     .ForMember(dest => dest.Wifi, opt => opt.MapFrom(src => src.Wifi ?? false))
        //     .ForMember(dest => dest.AirConditioning, opt => opt.MapFrom(src => src.AirConditioning ?? false));

        CreateMap<UpdateTripRequest, TripResponseDto>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Amenities, opt => opt.MapFrom(src => src.Amenities))
            .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTime))
            .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime));
        
        CreateMap<RideTogether.Orchestrators.Trip.Model.TripAmenities, RideTogether.Dal.Trip.TripAmenities>().ReverseMap();
    }
    
    private static TripAmenities MapAmenities(TripAmenities amenities)
    {
        if (amenities == null)
        {
            return new TripAmenities
            {
                MaximumTwoPeopleBackSeat = false,
                CanSmoke = false,
                PetsAllowed = false,
                Wifi = false,
                AirConditioning = false
            };
        }

        return new TripAmenities
        {
            MaximumTwoPeopleBackSeat = amenities.MaximumTwoPeopleBackSeat ?? false,
            CanSmoke = amenities.CanSmoke ?? false,
            PetsAllowed = amenities.PetsAllowed ?? false,
            Wifi = amenities.Wifi ?? false,
            AirConditioning = amenities.AirConditioning ?? false
        };
    }
}