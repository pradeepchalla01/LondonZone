package com.londonzone.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.londonzone.domain.TrainStation;

@Repository
public interface TrainStationRepository extends CrudRepository<TrainStation, Integer>{
}
