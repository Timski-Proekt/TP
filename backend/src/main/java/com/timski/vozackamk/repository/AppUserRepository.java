package com.timski.vozackamk.repository;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.dto.AppUserDrivingSchoolProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, String> {
    AppUser findByEmailAndPassword(String email, String password);
    Optional<AppUser> findByEmail(String email);
    Boolean existsByEmail(String email);
    @Query(
            "SELECT a.name as name, a.lastName as lastName, a.email as email, a.phone as phone," +
                    "ds.name as drivingSchoolName, ds.email as drivingSchoolEmail " +
                    "FROM AppUser a " +
                    "JOIN a.drivingSchool ds " +
                    "WHERE a.embg = :embg")
    AppUserDrivingSchoolProjection findUserWithDrivingSchoolByEmbg(String embg);

}
