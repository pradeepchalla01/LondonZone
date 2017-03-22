package com.londonzone.services;

import com.londonzone.bo.MailInfo;

public interface MailService {

	public String sendEmail(MailInfo mailInfo);
}
