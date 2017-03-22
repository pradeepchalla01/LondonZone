package com.londonzone.service.impl;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.londonzone.bo.MailInfo;
import com.londonzone.services.MailService;

@Service("mailService")
public class MailServiceImpl implements MailService{

	@Autowired
    JavaMailSender mailSender;
	
	@Override
	public String sendEmail(MailInfo mailInfo) {
		
		MimeMessagePreparator preparator = getMessagePreparator(mailInfo);
		try {
            mailSender.send(preparator);
            return "success";
        } catch (MailException ex) {
        	return "Failed";
        }
		
	}
	
	private MimeMessagePreparator getMessagePreparator(MailInfo mailInfo) {
		 
        MimeMessagePreparator preparator = new MimeMessagePreparator() {
 
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setFrom(mailInfo.getFromEmail());
                mimeMessage.setRecipient(Message.RecipientType.TO,
                        new InternetAddress(mailInfo.getToEmail()));
                mimeMessage.setText(mailInfo.getBody());
                mimeMessage.setSubject(mailInfo.getSubject());
            }
        };
        return preparator;
    }
 

}
