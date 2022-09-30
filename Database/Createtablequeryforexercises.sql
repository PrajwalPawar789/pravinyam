-- Table: public.cexercises

-- DROP TABLE IF EXISTS public.cexercises;
--Create table for exercises
CREATE TABLE IF NOT EXISTS public.cexercises
(
    exid character varying(100) COLLATE pg_catalog."default" NOT NULL,
    title character varying(100) COLLATE pg_catalog."default",
    description character varying(250) COLLATE pg_catalog."default",
    category character varying(100) COLLATE pg_catalog."default",
    subcategoryid character varying(100) COLLATE pg_catalog."default",
    level bigint,
    language character varying(100) COLLATE pg_catalog."default",
    qlocation character varying(100) COLLATE pg_catalog."default",
    module character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT cexercises_pkey PRIMARY KEY (exid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cexercises
    OWNER to doadmin;