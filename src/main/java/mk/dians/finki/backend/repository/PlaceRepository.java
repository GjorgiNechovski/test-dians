package mk.dians.finki.backend.repository;


import mk.dians.finki.backend.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByNameContainingIgnoreCase(String name);
    List<Place> findByType(String type);
    List<Place> findByNameContainingIgnoreCaseAndTypeEquals(String name, String type);
    List<Place> findByHasEntranceFee(boolean fee);
    List<Place> findByNameContainingIgnoreCaseAndHasEntranceFee(String name, boolean fee);
    List<Place> findByTypeAndHasEntranceFee(String type, boolean fee);
    List<Place> findByNameContainingIgnoreCaseAndTypeEqualsAndHasEntranceFee(String name, String type, boolean fee);
    List<Place> findByCity(String city);
    List<Place> findByCityAndNameContainingIgnoreCase(String city, String name);
    List<Place> findByCityAndType(String city, String type);
    List<Place> findByCityAndHasEntranceFee(String city, boolean fee);
    List<Place> findByCityAndNameContainingIgnoreCaseAndHasEntranceFee(String city,String name, boolean fee);
    List<Place> findByCityAndTypeAndHasEntranceFee(String city,String type, boolean fee);
    List<Place> findByCityAndNameContainingAndType(String city, String name,String type);
    List<Place> findByCityAndNameContainingIgnoreCaseAndTypeEqualsAndHasEntranceFee(String city, String name,String type, boolean fee);

    @Query("SELECT DISTINCT p.city FROM Place p")
    List<String> findAllCities();
}

