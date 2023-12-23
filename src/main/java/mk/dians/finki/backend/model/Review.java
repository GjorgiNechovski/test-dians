package mk.dians.finki.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@Table(name = "review")
@NoArgsConstructor
@AllArgsConstructor
public class Review implements Serializable {

    @Serial
    private static final long serialVersionUID = 3L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;
    private double rating;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Review(String comment, double rating) {
        this.comment = comment;
        this.rating = rating;
    }
}
