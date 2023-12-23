package mk.dians.finki.backend.web;

import jakarta.servlet.http.HttpSession;
import mk.dians.finki.backend.model.User;
import mk.dians.finki.backend.model.exceptions.WrongCredentials;
import mk.dians.finki.backend.service.AuthenticationService;
import mk.dians.finki.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerNewUser(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password){

        try {
            authenticationService.registerNewUser(username, email, password);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.ok(true);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @RequestParam String email,
            @RequestParam String password,
            HttpSession session){
        User user;
        try {
            user =  authenticationService.login(email, password);
        }
        catch (WrongCredentials e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        session.setAttribute("user", user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session){
        session.removeAttribute("user");

        return ResponseEntity.ok().build();
    }

    @GetMapping("/currentUser/{userId}")
    public ResponseEntity<Object> getCurrentUser(@PathVariable Long userId, HttpSession session){

        return ResponseEntity.ok().body(userService.findById(userId));
    }
}
