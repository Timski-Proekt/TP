package com.timski.vozackamk.repository;

import com.timski.vozackamk.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
}
