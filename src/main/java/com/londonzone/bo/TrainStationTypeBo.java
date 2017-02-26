package com.londonzone.bo;

import java.io.Serializable;

public class TrainStationTypeBo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1040130167938834574L;
	private Long id;
	private String description;
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
