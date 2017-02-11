package com.londonzone.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.londonzone.domain.TrainStationType;

@Repository
public interface TrainStationTypeRespository extends CrudRepository<TrainStationType, Integer> {
}
