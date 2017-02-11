package com.londonzone.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.londonzone.domain.AuditTrail;

@Repository
public interface AuditTrailRepository extends CrudRepository<AuditTrail, Integer> {

}
