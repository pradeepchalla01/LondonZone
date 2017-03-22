package com.londonzone.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.londonzone.bo.MailInfo;
import com.londonzone.bo.TrainDetail;
import com.londonzone.bo.TrainStationBo;
import com.londonzone.bo.TrainStationTypeBo;
import com.londonzone.bo.ZoneBo;
import com.londonzone.domain.ContactUs;
import com.londonzone.domain.TrainStation;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;
import com.londonzone.repositories.ContactUsRepository;
import com.londonzone.repositories.TrainStationRepository;
import com.londonzone.repositories.TrainStationTypeRespository;
import com.londonzone.repositories.ZoneRepository;
import com.londonzone.services.LondonZoneService;
import com.londonzone.services.MailService;

@Service
public class LondonZoneServiceImpl implements LondonZoneService {

	@Autowired
	private ZoneRepository zoneRepository;

	@Autowired
	private TrainStationRepository trainStationRepository;

	@Autowired
	private TrainStationTypeRespository trainStationTypeRespository;
	
	@Autowired
	private ContactUsRepository contactUsRepository;

	@Autowired
	private MailService mailService;

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
	public TrainStation deleteStation(String id) {
		if (null != id) {
			TrainStation trainStation = trainStationRepository.findOne(Long.valueOf(id));
			if (null != trainStation) {
				trainStation.setIsActive(Boolean.FALSE);
				trainStation = trainStationRepository.save(trainStation);
				return trainStation;
			}
		}
		return null;
	}

	@Override
	public TrainStationBo saveOrEditStation(TrainStationBo trainStation) {
		TrainStation station = null;
		if (null != trainStation) {
			station = buildStation(trainStation);
			station = trainStationRepository.save(station);
			trainStation.setId(station.getId());
		}
		return trainStation;
	}

	@Override
	public TrainStationTypeBo saveOrEditStation(TrainStationTypeBo trainStationType) {
		TrainStationType stationType = null;
		if (null != trainStationType) {
			stationType = buildStationType(trainStationType);
			stationType = trainStationTypeRespository.save(stationType);
			trainStationType.setId(stationType.getId());
		}
		return trainStationType;
	}

	@Override
	public ZoneBo saveOrEditStation(ZoneBo zoneBo) {
		Zone zone = null;
		if (null != zoneBo) {
			zone = buildZone(zoneBo);
			zone = zoneRepository.save(zone);
			zoneBo.setId(zone.getId());
		}
		return zoneBo;
	}

	private TrainStation buildStation(TrainStationBo trainStationTo) {

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

	private TrainStationType buildStationType(TrainStationTypeBo trainStationTypeBo) {

		TrainStationType trainStationType = new TrainStationType();
		trainStationType.setId(trainStationTypeBo.getId());
		trainStationType.setName(trainStationTypeBo.getName());
		trainStationType.setDescription(trainStationTypeBo.getDescription());
		return trainStationType;
	}

	private Zone buildZone(ZoneBo zoneBo) {

		Zone zone = new Zone();
		zone.setId(zoneBo.getId());
		zone.setName(zoneBo.getName());
		zone.setDescription(zoneBo.getDescription());
		return zone;
	}
	
	@Override
	public ContactUs saveContactUs(ContactUs contactUs){
		contactUs = contactUsRepository.save(contactUs);
		
		MailInfo mailInfo = new MailInfo();
		mailInfo.setFromEmail(contactUs.getEmail());
		mailInfo.setToEmail("sudhirk1744@gmail.com");
		mailInfo.setSubject("Question about LondonZone Finder");
		String emailBody = contactUs.getName() + "<br>" + contactUs.getPhone() + "<br>" + contactUs.getQuestion();
		mailInfo.setBody(emailBody);
		mailService.sendEmail(mailInfo);
		
		return contactUs;
	}
}
