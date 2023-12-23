package mk.dians.finki.backend.model.exceptions;

public class UserNameExists extends RuntimeException{
    public UserNameExists() {
        super("Username или email адресата веќе постои!");
    }
}
