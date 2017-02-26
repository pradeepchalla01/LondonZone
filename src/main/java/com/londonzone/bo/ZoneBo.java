package com.londonzone.bo;

import java.io.Serializable;

public class ZoneBo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7017967113659933877L;
	private Integer id;
	private String description;
	private String name;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
