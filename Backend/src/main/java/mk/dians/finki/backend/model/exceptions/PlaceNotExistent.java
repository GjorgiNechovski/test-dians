package mk.dians.finki.backend.model.exceptions;

public class PlaceNotExistent extends RuntimeException{
    public PlaceNotExistent() {
        super("The place does not exist!");
    }
}
