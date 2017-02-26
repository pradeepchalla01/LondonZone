package com.londonzone.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.londonzone.bo.TrainDetail;
import com.londonzone.bo.TrainStationTo;
import com.londonzone.domain.TrainStation;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;
import com.londonzone.repositories.TrainStationRepository;
import com.londonzone.repositories.TrainStationTypeRespository;
import com.londonzone.repositories.ZoneRepository;
import com.londonzone.services.LondonZoneService;

@Service
public class LondonZoneServiceImpl implements LondonZoneService {

	@Autowired
	private ZoneRepository zoneRepository;

	@Autowired
	private TrainStationRepository trainStationRepository;

	@Autowired
	private TrainStationTypeRespository trainStationTypeRespository;

	@Autowired
	public void setProductRepository(ZoneRepository zoneRepository) {
		this.zoneRepository = zoneRepository;
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
		Iterable<Zone> zones = zoneRepository.findAll();
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
			if (null != trainStation && trainStation.getIsActive()) {
				TrainDetail trainDetail = new TrainDetail();
				trainDetail.setId(trainStation.getId());
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

	@Override
	public String deleteStation(String id) {
		if (null != id) {
			TrainStation trainStation = trainStationRepository.findOne(Long.valueOf(id));
			if (null != trainStation) {
				trainStation.setIsActive(Boolean.FALSE);
				trainStation = trainStationRepository.save(trainStation);
				return "Success";
			}
		}
		return "Failed";
	}

	@Override
	public TrainStationTo saveOrEditStation(TrainStationTo trainStation) {
		TrainStation station = null;
		if (null != trainStation) {
			station = buildStation(trainStation);
			station = trainStationRepository.save(station);
			trainStation.setId(station.getId());
		}
		return trainStation;
	}

	private TrainStation buildStation(TrainStationTo trainStationTo) {

		TrainStation trainStation = new TrainStation();
		trainStation.setId(trainStationTo.getId());
		trainStation.setAddress(trainStationTo.getAddress());
		trainStation.setIsActive(Boolean.TRUE);
		trainStation.setName(trainStationTo.getName());
		trainStation.setPostCode(trainStationTo.getPostCode());
		trainStation.setStationLatitude(trainStationTo.getLatitude());
		trainStation.setStationLongitude(trainStationTo.getLongitude());
		if (null != trainStationTo.getZoneId()) {
			Zone zone = zoneRepository.findOne(trainStationTo.getZoneId().intValue());
			if (null != zone) {
				trainStation.setZone(zone);
			}
		}

		if (null != trainStationTo.getStationTypeId()) {
			TrainStationType trainStationType = trainStationTypeRespository
					.findOne(trainStationTo.getStationTypeId().longValue());
			if (null != trainStationType) {
				trainStation.setTrainStationType(trainStationType);
			}
		}

		return trainStation;
	}
}
