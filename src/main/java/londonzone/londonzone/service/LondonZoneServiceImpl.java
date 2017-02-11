package com.londonzone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.londonzone.domain.TrainStation;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;
import com.londonzone.repositories.TrainStationRepository;
import com.londonzone.repositories.TrainStationTypeRespository;
import com.londonzone.repositories.ZoneRepository;

@Service
public class LondonZoneServiceImpl {

	private ZoneRepository productRepository;
	
	@Autowired
	private TrainStationRepository trainStationRepository;
	
	@Autowired
	private TrainStationTypeRespository trainStationTypeRespository;
	
	@Autowired
	public void setProductRepository(ZoneRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	/*
	 * @Override public Iterable<Zone> listAllProducts() { return
	 * productRepository.findAll(); }
	 * 
	 * @Override public Zone getProductById(Integer id) { return
	 * productRepository.findOne(id); }
	 * 
	 * @Override public Zone saveProduct(Zone product) { return
	 * productRepository.save(product); }
	 */

	public List<Zone> getAllZone() {
		Iterable<Zone> zones = productRepository.findAll();
		List<Zone> zoneList = new ArrayList<Zone>();
		for (Zone zone : zones) {
			zoneList.add(zone);
		}
		return zoneList;
	}
	
	public List<TrainStationType> getAllStationType() {
		Iterable<TrainStationType> zones = trainStationTypeRespository.findAll();
		List<TrainStationType> zoneList = new ArrayList<TrainStationType>();
		for (TrainStationType zone : zones) {
			zoneList.add(zone);
		}
		return zoneList;
	}
	
	public List<TrainStation> getAllStation() {
		Iterable<TrainStation> zones = trainStationRepository.findAll();
		List<TrainStation> zoneList = new ArrayList<TrainStation>();
		for (TrainStation zone : zones) {
			zoneList.add(zone);
		}
		return zoneList;
	}
}
