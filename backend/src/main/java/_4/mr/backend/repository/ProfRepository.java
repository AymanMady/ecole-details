package _4.mr.backend.repository;

import _4.mr.backend.model.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfRepository extends JpaRepository<Prof, Integer> {
}
