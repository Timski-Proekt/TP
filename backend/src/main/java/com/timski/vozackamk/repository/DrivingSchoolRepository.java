package com.timski.vozackamk.repository;

import com.timski.vozackamk.model.DrivingSchool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository

public interface DrivingSchoolRepository extends JpaRepository<DrivingSchool, UUID> {
}
