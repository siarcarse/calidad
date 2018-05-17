-- Sequence: public.personas_pk_seq

-- DROP SEQUENCE public.personas_pk_seq;

CREATE SEQUENCE public.personas_pk_seq
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
ALTER TABLE public.personas_pk_seq
  OWNER TO postgres;


-- Table: public.personas

-- DROP TABLE public.personas;

CREATE TABLE public.personas
(
  name character varying,
  lastname character varying,
  birthdate timestamp
  without time zone,
  active boolean,
  pk integer NOT NULL DEFAULT nextval
  ('personas_pk_seq'::regclass)
)
  WITH
  (
  OIDS=FALSE
);
  ALTER TABLE public.personas
  OWNER TO postgres;
