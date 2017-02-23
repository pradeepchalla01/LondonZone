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

	@RequestMapping("/allZone")
	public @ResponseBody List<Zone> getAllZone() {
		return service.getAllZones();
	}

	@RequestMapping("/stationTypes")
	public @ResponseBody List<TrainStationType> getAllStationType() {
		return service.getAllStationType();
	}

	@RequestMapping("/trainDetails")
	public @ResponseBody List<TrainDetail> getAllStation() {
		return service.getTrainsDetail();
	}
	
	@RequestMapping(value  = "/deleteStation", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody String deleteStation(@RequestBody String stationId) {
		return service.deleteStation(stationId);
	}
}
