package _4.mr.backend.repository;

import _4.mr.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findFirstByEmail(String email);
    Optional<User> findByOtp(String otp);
    Optional<User> findByEmail(String email);

}
