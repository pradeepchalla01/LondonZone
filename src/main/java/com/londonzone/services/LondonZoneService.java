package com.londonzone.services;

import java.util.List;

import com.londonzone.bo.TrainDetail;
import com.londonzone.bo.TrainStationBo;
import com.londonzone.bo.TrainStationTypeBo;
import com.londonzone.bo.ZoneBo;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;

public interface LondonZoneService {

	public List<Zone> getAllZones();

	List<TrainDetail> getTrainsDetail();
	public List<TrainStationType> getAllStationType();
	String deleteStation(String id);

	public TrainStationBo saveOrEditStation(TrainStationBo trainStation);
	public TrainStationTypeBo saveOrEditStation(TrainStationTypeBo trainStation);
	public ZoneBo saveOrEditStation(ZoneBo trainStation);
}
