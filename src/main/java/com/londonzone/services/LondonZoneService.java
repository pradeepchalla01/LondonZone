package com.londonzone.services;

import java.util.List;

import com.londonzone.bo.TrainDetail;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;

public interface LondonZoneService {

	public List<Zone> getAllZones();

	List<TrainDetail> getTrainsDetail();
	public List<TrainStationType> getAllStationType();
	String deleteStation(String id);
}
