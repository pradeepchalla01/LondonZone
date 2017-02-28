ALTER TABLE1 TRAIN_STATION ADD  is_active boolean default true 


CREATE SEQUENCE public.train_station_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 20;
  
 CREATE SEQUENCE public.station_type_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 20;
  
 CREATE SEQUENCE public.zone_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 20;
  
  -- Create Table Starts--
  CREATE TABLE public.contact_us
(
    id bigint NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    question character varying(40000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT contact_us_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
-- Create Table ends--

ALTER TABLE public.contact_us
    OWNER to postgres;
  
 CREATE SEQUENCE public.contact_us_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 20;