package mk.dians.finki.backend.service;

import mk.dians.finki.backend.model.Place;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


public interface PlaceService {

    List<Place> getPlaces(String type, String search, boolean fee, String city);

    Optional<Place> getPlaceById(Long id);

    List<String> getAllCities();
    void deleteById(Long id);

    Place savePlace(String name, double xCoordinate, double yCoordinate, String city, MultipartFile imageUrl, String phoneNumber, String type, boolean hasEntranceFee) throws IOException;
    Place editPlace(Long id, String name, double xCoordinate, double yCoordinate, String city, String phoneNumber, String type, boolean hasEntranceFee);
}

