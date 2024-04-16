using AutoMapper;
using Microsoft.Extensions.Logging;
using RideTogether.Dal.Trip;
using RideTogether.Orchestrators.Trip.Model;
using RideTogether.Orchestrators.Validation.Exceptions;
using TripStatuses = RideTogether.Orchestrators.Trip.Model.TripStatuses;

namespace RideTogether.Orchestrators.Trip;

public class TripOrchestrator : ITripOrchestrator
{
    private const double AverageCarSpeedKph = 75.0;
    private const double EarthRadiusKm = 6371.0;
    
    private readonly ILogger<TripOrchestrator> _logger;
    private readonly IMapper _mapper;
    private readonly ITripRepository _tripRepository;
    
    public TripOrchestrator(ITripRepository tripRepository, IMapper mapper, ILogger<TripOrchestrator> logger)
    {
        _tripRepository = tripRepository;
        _mapper = mapper;
        _logger = logger;
    }
    
    public async Task<IEnumerable<Model.Trip>> GetAllAsync()
    {
        var trips = await _tripRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<Model.Trip>>(trips);
    }

    public async Task<Model.Trip> GetByIdAsync(int id)
    {
        var trip = await _tripRepository.GetByIdAsync(id);
        if (trip == null)
            throw new NotFoundException(string
                .Format(ExceptionMessages.NotFound, nameof(Model.Trip), "Id", id.ToString()));
        return _mapper.Map<Model.Trip>(trip);
    }

    public async Task<Model.Trip> CreateAsync(CreateTripRequest request)
    {
        var sourcePlaceData = (request.Source.Latitude, request.Source.Longitude);
        var destinationPlaceData = (request.Destination.Latitude, request.Destination.Longitude);
        var isExist = await _tripRepository.IsTripExistAsync(request.DriverId, sourcePlaceData, destinationPlaceData);

        if (isExist)
            throw new InvalidRegistrationException(string
                .Format(ExceptionMessages.TripAlreadyCreated, request.DriverId, request.Source, request.Destination));

        // if (request.Nickname == "") request.Nickname = null;

        var tripModel = CreateTripModel(request);
        
        var trip = await _tripRepository.CreateAsync(_mapper.Map<TripDao>(tripModel));

        _logger.LogInformation("Trip with id {id} created", tripModel.Id);

        return _mapper.Map<Model.Trip>(trip);
    }

    public async Task DeleteByIdAsync(int tripId)
    {
        var trip = await _tripRepository.GetByIdAsync(tripId);

        if (trip == null)
            throw new NotFoundException(string.Format(ExceptionMessages.NotFound, nameof(Model.Trip), "Id",
                tripId.ToString()));

        await _tripRepository.DeleteAsync(tripId);

        _logger.LogInformation("The trip {Id} has been deleted", trip.Id);
    }

    private static Model.Trip CreateTripModel(CreateTripRequest request)
    {
        var approximateDistance = CalculateApproximateDistance(request.Source, request.Destination);
        var approximateTime = CalculateApproximateTime(approximateDistance);
        
        return new Model.Trip
        {
            DriverId = request.DriverId,
            Status = TripStatuses.Available,
            SorcePlace = new Place.Place
            {
                Name = request.Source.Name,
                Latitude = request.Source.Latitude,
                Longitude = request.Source.Longitude
            },
            DestinationPlace = new Place.Place
            {
                Name = request.Destination.Name,
                Latitude = request.Destination.Latitude,
                Longitude = request.Destination.Longitude
            },
            Distance = approximateDistance,
            StartTime = DateTime.Now,
            EndTime = DateTime.Now + approximateTime,
            Travelers = new List<int>()
        };
    }

    private static double CalculateApproximateDistance(Place.Place sourcePlace, Place.Place destinationPlace)
    {
        var lat1Rad = ToRadians(sourcePlace.Latitude);
        var lon1Rad = ToRadians(sourcePlace.Longitude);
        var lat2Rad = ToRadians(destinationPlace.Latitude);
        var lon2Rad = ToRadians(destinationPlace.Longitude);

        // Calculate the differences
        var dLat = lat2Rad - lat1Rad;
        var dLon = lon2Rad - lon1Rad;

        // Haversine formula
        var a = Math.Pow(Math.Sin(dLat / 2), 2) +
                   Math.Cos(lat1Rad) * Math.Cos(lat2Rad) *
                   Math.Pow(Math.Sin(dLon / 2), 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        
        return EarthRadiusKm * c;
    }
    private static double ToRadians(double angle) => Math.PI * angle / 180.0;
    
    private static TimeSpan CalculateApproximateTime(double approximateDistance)
    {
        var timeHours = approximateDistance / AverageCarSpeedKph;
        return TimeSpan.FromHours(timeHours);
    }
}