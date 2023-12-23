package mk.dians.finki.backend.service.impl;

import mk.dians.finki.backend.model.Place;
import mk.dians.finki.backend.model.exceptions.PlaceNotExistent;
import mk.dians.finki.backend.repository.PlaceRepository;
import mk.dians.finki.backend.service.ImageService;
import mk.dians.finki.backend.service.PlaceService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;
    private final ImageService imageService;

    public PlaceServiceImpl(PlaceRepository placeRepository, ImageService imageService) {
        this.placeRepository = placeRepository;
        this.imageService = imageService;
    }

    @Override
    //TODO: zameni go so shablon
    public List<Place> getPlaces(String type, String search, boolean fee, String city) {
        if (type != null && search != null && fee && city != null) {
            return placeRepository.findByCityAndNameContainingIgnoreCaseAndTypeEqualsAndHasEntranceFee(city, search, type, true);
        }
        if (type != null && search != null && fee) {
            return placeRepository.findByNameContainingIgnoreCaseAndTypeEqualsAndHasEntranceFee(search, type, true);
        }
        if (type != null && search != null && city != null) {
            return placeRepository.findByCityAndNameContainingAndType(city, search, type);
        }
        if (type != null && fee && city != null) {
            return placeRepository.findByCityAndTypeAndHasEntranceFee(city, type, true);
        }
        if (search != null && fee && city != null) {
            return placeRepository.findByCityAndNameContainingIgnoreCaseAndHasEntranceFee(city, search, true);
        }
        if (type != null && city != null) {
            return placeRepository.findByCityAndType(city, type);
        }
        if (search != null && city != null) {
            return placeRepository.findByCityAndNameContainingIgnoreCase(city, search);
        }
        if (fee && city != null) {
            return placeRepository.findByCityAndHasEntranceFee(city, true);
        }
        if (type != null && fee) {
            return placeRepository.findByTypeAndHasEntranceFee(type, true);
        }
        if (search != null && fee) {
            return placeRepository.findByNameContainingIgnoreCaseAndHasEntranceFee(search, true);
        }
        if (type != null && search != null) {
            return placeRepository.findByNameContainingIgnoreCaseAndTypeEquals(search, type);
        }
        if (type != null) {
            return placeRepository.findByType(type);
        }
        if (search != null) {
            return placeRepository.findByNameContainingIgnoreCase(search);
        }
        if (fee) {
            return placeRepository.findByHasEntranceFee(true);
        }
        if (city != null) {
            return placeRepository.findByCity(city);
        }
        return placeRepository.findAll();
    }


    @Override
    public Optional<Place> getPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    @Override
    public List<String> getAllCities() {
        return this.placeRepository.findAllCities();
    }

    @Override
    public void deleteById(Long id) {
        this.placeRepository.deleteById(id);
    }

    public Place savePlace(String name,
                           double xCoordinate, double yCoordinate,
                           String city,
                           MultipartFile imageUrl,
                           String phoneNumber,
                           String type,
                           boolean hasEntranceFee) throws IOException {
        Place place = new Place();

        if(imageUrl!=null) {
            String image = this.imageService.uploadFile(imageUrl);
            place.setImageUrl(image);
        }
        if (phoneNumber != null){
            place.setPhoneNumber(phoneNumber);
        }

        place.setName(name);
        place.setXCoordinate(xCoordinate);
        place.setYCoordinate(yCoordinate);
        place.setCity(city);
        place.setType(type);


        return placeRepository.save(place);
    }

    @Override
    public Place editPlace(Long id, String name, double xCoordinate, double yCoordinate, String city, String phoneNumber, String type, boolean hasEntranceFee) {
        Place place = this.getPlaceById(id).orElseThrow(PlaceNotExistent::new);

        place.setName(name);
        place.setXCoordinate(xCoordinate);
        place.setYCoordinate(yCoordinate);
        place.setCity(city);
        place.setPhoneNumber(phoneNumber);
        place.setType(type);
        place.setHasEntranceFee(hasEntranceFee);

        return this.placeRepository.save(place);
    }

}
