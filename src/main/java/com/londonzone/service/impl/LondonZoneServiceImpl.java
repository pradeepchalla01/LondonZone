package com.londonzone.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.londonzone.bo.TrainDetail;
import com.londonzone.domain.TrainStation;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;
import com.londonzone.repositories.TrainStationRepository;
import com.londonzone.repositories.TrainStationTypeRespository;
import com.londonzone.repositories.ZoneRepository;
import com.londonzone.services.LondonZoneService;

@Service
public class LondonZoneServiceImpl implements LondonZoneService {

	private ZoneRepository productRepository;

	@Autowired
	private TrainStationRepository trainStationRepository;

	@Autowired
	private TrainStationTypeRespository trainStationTypeRespository;

	@Autowired
	public void setProductRepository(ZoneRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	public List<TrainStationType> getAllStationType() {
		Iterable<TrainStationType> zones = trainStationTypeRespository.findAll();
		List<TrainStationType> zoneList = new ArrayList<TrainStationType>();
		for (TrainStationType zone : zones) {
			zoneList.add(zone);
		}
		return zoneList;
	}

	@Override
	public List<Zone> getAllZones() {
		Iterable<Zone> zones = productRepository.findAll();
		List<Zone> zoneList = new ArrayList<Zone>();
		for (Zone zone : zones) {
			zoneList.add(zone);
		}
		return zoneList;
	}

	@Override
	public List<TrainDetail> getTrainsDetail() {
		Iterable<TrainStation> trainStations = trainStationRepository.findAll();
		List<TrainDetail> trainsDetail = new ArrayList<TrainDetail>();

		for (TrainStation trainStation : trainStations) {
			if (null != trainStation) {
				TrainDetail trainDetail = new TrainDetail();
				trainDetail.setName(trainStation.getName() == null ? "" : trainStation.getName());
				if (null != trainStation.getZone()) {
					trainDetail.setZone(trainStation.getZone().getName());
				}
				trainDetail.setAddress(trainStation.getAddress());
				trainDetail.setPostCode(trainStation.getPostCode());
				trainDetail.setLongitude(trainStation.getStationLongitude());
				trainDetail.setLatitude(trainStation.getStationLatitude());
				if (null != trainStation.getTrainStationType()) {
					trainDetail.setStationType(trainStation.getTrainStationType().getName());
				}
				trainsDetail.add(trainDetail);
			}
		}
		return trainsDetail;
	}
}
