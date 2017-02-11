package com.londonzone.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TRAIN_STATION_TYPE", schema = "")
public class TrainStationType {
	
	@Id
	@SequenceGenerator(name = "my_seq", sequenceName = "hibernate_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq")
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
