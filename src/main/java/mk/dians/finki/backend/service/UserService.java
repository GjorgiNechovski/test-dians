package mk.dians.finki.backend.service;

import mk.dians.finki.backend.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findById(Long id);
}
