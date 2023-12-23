package mk.dians.finki.backend.model.exceptions;

public class WrongCredentials extends RuntimeException{
    public WrongCredentials() {
        super("Внесовте погрешни податоци!");
    }
}
