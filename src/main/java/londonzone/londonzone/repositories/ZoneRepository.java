package com.londonzone.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.londonzone.domain.Zone;

@Repository
public interface ZoneRepository extends CrudRepository<Zone, Integer>{
}
