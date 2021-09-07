package com.backend.server.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface profileRepository extends JpaRepository<profile, Long> {
    Page<profile> findByName(String name, Pageable paging);
}