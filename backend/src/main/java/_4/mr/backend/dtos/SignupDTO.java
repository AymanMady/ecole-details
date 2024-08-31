package _4.mr.backend.dtos;

import lombok.Data;

@Data
public class SignupDTO {

    private String name;

    private String email;

    private String password;

    private String phoneNumber;

    private String role;
}
