-- Sequence: public.patient_pk_seq

-- DROP SEQUENCE public.patient_pk_seq;

CREATE SEQUENCE public.patient_pk_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.patient_pk_seq
  OWNER TO postgres;


-- Table: public.patient

-- DROP TABLE public.patient;

CREATE TABLE public.patient
(
  pk integer NOT NULL DEFAULT nextval('patient_pk_seq'::regclass),
  name character varying NOT NULL,
  lastname character varying,
  email character varying,
  birthdate timestamp without time zone,
  CONSTRAINT patient_pkey PRIMARY KEY (pk)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.patient
  OWNER TO postgres;
