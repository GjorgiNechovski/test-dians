package mk.dians.finki.backend.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "places")
@NoArgsConstructor
@AllArgsConstructor
public class Place implements Serializable {

    @Serial
    private static final long serialVersionUID = 2L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name cannot be blank")
    private String name;
    private String city;

    @NotNull(message = "X coord cannot be null")
    private double xCoordinate;
    @NotNull(message = "Y coord cannot be null")
    private double yCoordinate;

    private Boolean hasEntranceFee;
    private String website;
    private String openingHours;
    private String phoneNumber;
    private String type;

    private String imageUrl;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Review> reviews;

}
