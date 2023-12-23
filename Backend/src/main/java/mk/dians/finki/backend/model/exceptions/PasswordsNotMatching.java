package mk.dians.finki.backend.model.exceptions;

public class PasswordsNotMatching extends RuntimeException{
    public PasswordsNotMatching() {
        super("The passwords do not match!");
    }
}
