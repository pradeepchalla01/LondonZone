package com.londonzone.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.londonzone.bo.TrainDetail;
import com.londonzone.bo.TrainStationBo;
import com.londonzone.bo.TrainStationTypeBo;
import com.londonzone.bo.ZoneBo;
import com.londonzone.domain.ContactUs;
import com.londonzone.domain.TrainStation;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;
import com.londonzone.services.LondonZoneService;

@Controller
public class ZoneController {

	@Autowired
	private LondonZoneService service;

	@RequestMapping("/greeting")
	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}

	@RequestMapping(value  = "/allZone", method = RequestMethod.POST)
	public @ResponseBody List<Zone> getAllZone() {
		return service.getAllZones();
	}

	@RequestMapping(value  = "/stationTypes", method = RequestMethod.POST)
	public @ResponseBody List<TrainStationType> getAllStationType() {
		return service.getAllStationType();
	}

	@RequestMapping(value  = "/trainDetails", method = RequestMethod.POST)
	public @ResponseBody List<TrainDetail> getAllStation() {
		return service.getTrainsDetail();
	}
	
	@RequestMapping(value  = "/deleteStation", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody TrainStation deleteStation(@RequestBody String stationId) {
		return service.deleteStation(stationId);
	}
	
	@RequestMapping(value  = "/saveOrEditStation", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody TrainStationBo saveOrEditStation(@RequestBody TrainStationBo trainStation) {
		if(trainStation !=  null) {			
			return service.saveOrEditStation(trainStation);
		}
		return null;
	}
	
	@RequestMapping(value  = "/saveOrEditStationType", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody TrainStationTypeBo saveOrEditStationType(@RequestBody TrainStationTypeBo trainStationType) {
		if(trainStationType !=  null) {			
			return service.saveOrEditStation(trainStationType);
		}
		return null;
	}
	
	@RequestMapping(value  = "/saveOrEditZone", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody ZoneBo saveOrEditZone(@RequestBody ZoneBo zoneBo) {
		if(zoneBo !=  null) {			
			return service.saveOrEditStation(zoneBo);
		}
		return null;
	}
	
	@RequestMapping(value  = "/saveContactUs", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody ContactUs saveContactUs(@RequestBody ContactUs contactUs) {
		if(contactUs !=  null) {			
			return service.saveContactUs(contactUs);
		}
		return null;
	}
}
