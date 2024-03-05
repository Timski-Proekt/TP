package com.timski.vozackamk.repository;

import com.timski.vozackamk.model.Location;
import com.timski.vozackamk.model.LocationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface LocationRepository extends JpaRepository<Location, LocationId> {
}
