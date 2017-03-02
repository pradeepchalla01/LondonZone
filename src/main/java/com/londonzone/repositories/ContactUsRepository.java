package com.londonzone.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.londonzone.domain.ContactUs;;

@Repository
public interface ContactUsRepository extends CrudRepository<ContactUs, Long> {

}
