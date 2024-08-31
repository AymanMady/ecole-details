package _4.mr.backend.dtos;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    private String name;

    private String email;

    private String phoneNumber;

    private String role;

}
