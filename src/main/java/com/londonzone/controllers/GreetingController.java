package com.londonzone.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.londonzone.domain.TrainStation;
import com.londonzone.domain.TrainStationType;
import com.londonzone.domain.Zone;
import com.londonzone.service.LondonZoneServiceImpl;

@Controller
public class GreetingController {

	@Autowired
	private LondonZoneServiceImpl service;
	
    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

    @RequestMapping("/allZone")
    public @ResponseBody List<Zone> getAllZone() {
    	return service.getAllZone();
    }
    
    @RequestMapping("/stationTypes")
    public @ResponseBody List<TrainStationType> getAllStationType() {
    	return service.getAllStationType();
    }
    
    @RequestMapping("/allStation")
    public @ResponseBody List<TrainStation> getAllStation() {
    	return service.getAllStation();
    }
}
