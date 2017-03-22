package com.londonzone.bo;

public class MailInfo {
	
	private String fromEmail;
	private String toEmail;
	private String body;
	private String subject;

	public String getFromEmail() {
		return fromEmail;
	}

	public void setFromEmail(String from) {
		this.fromEmail = from;
	}

	public String getToEmail() {
		return toEmail;
	}

	public void setToEmail(String to) {
		this.toEmail = to;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}
}
