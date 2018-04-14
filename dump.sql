-- Sequence: public.products_pk_seq

-- DROP SEQUENCE public.products_pk_seq;

CREATE SEQUENCE public.products_pk_seq
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.products_pk_seq
  OWNER TO siarcarse;



-- Table: public.products

-- DROP TABLE public.products;

CREATE TABLE public.products
(
    pk integer NOT NULL DEFAULT nextval('products_pk_seq'
    ::regclass),
  name character varying,
  code character varying,
  price integer,
  active boolean,
  CONSTRAINT pkey PRIMARY KEY
    (pk)
)
    WITH
    (
  OIDS=FALSE
);
    ALTER TABLE public.products
  OWNER TO siarcarse;
