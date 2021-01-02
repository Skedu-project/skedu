package com.schedule.skedu.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {   //connecting repo to user class and the identifier is a long type.
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    @Query(
        value = "SELECT * FROM User",
        nativeQuery = true
    )
    List<User> findCurrentUsers(); 
}
