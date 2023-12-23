package mk.dians.finki.backend.repository;

import mk.dians.finki.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long userId);
    User findByUsername(String username);
    User findByEmail(String email);
}
