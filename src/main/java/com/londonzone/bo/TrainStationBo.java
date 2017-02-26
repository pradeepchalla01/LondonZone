package com.londonzone.bo;

import java.io.Serializable;

public class TrainStationBo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8239866795528720060L;
	private Long id;
	private String name;
	private Long zoneId;
	private String address;
	private String postCode;
	private Long stationTypeId;
	private Double longitude;
	private Double latitude;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getZoneId() {
		return zoneId;
	}

	public void setZoneId(Long zoneId) {
		this.zoneId = zoneId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public Long getStationTypeId() {
		return stationTypeId;
	}

	public void setStationTypeId(Long stationTypeId) {
		this.stationTypeId = stationTypeId;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

}
