package com.crudapp.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface profileRepository extends JpaRepository<profile, Long> {

}