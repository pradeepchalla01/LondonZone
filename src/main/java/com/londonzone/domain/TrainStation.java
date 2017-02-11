package com.londonzone.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TRAIN_STATION", schema = "")
public class TrainStation {

	@Id
	@SequenceGenerator(name = "my_seq", sequenceName = "hibernate_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq")
	private Long id;
	private String address;
	private String name;
	private String postCode;
	private Double stationLatitude;
	private Double stationLongitude;

	@ManyToOne(optional = false)
	@JoinColumn(name = "train_station_type_fk", referencedColumnName = "id")
	private TrainStationType trainStationType;

	@ManyToOne(optional = false)
	@JoinColumn(name = "zone_fk", referencedColumnName = "id")
	private Zone zone;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public Double getStationLatitude() {
		return stationLatitude;
	}

	public void setStationLatitude(Double stationLatitude) {
		this.stationLatitude = stationLatitude;
	}

	public Double getStationLongitude() {
		return stationLongitude;
	}

	public void setStationLongitude(Double stationLongitude) {
		this.stationLongitude = stationLongitude;
	}

	public TrainStationType getTrainStationType() {
		return trainStationType;
	}

	public void setTrainStationType(TrainStationType trainStationType) {
		this.trainStationType = trainStationType;
	}

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}

}
