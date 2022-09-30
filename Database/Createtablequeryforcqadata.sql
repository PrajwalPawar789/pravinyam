-- Table: public.cqadata

-- DROP TABLE IF EXISTS public.cqadata;

CREATE TABLE IF NOT EXISTS public.cqadata
(
    exid character varying(100) COLLATE pg_catalog."default" NOT NULL,
    key bigint NOT NULL,
    label character varying(500) COLLATE pg_catalog."default",
    type character varying(250) COLLATE pg_catalog."default",
    options character varying(250) COLLATE pg_catalog."default",
    answer character varying(250) COLLATE pg_catalog."default",
    CONSTRAINT my_exidkey_pkey PRIMARY KEY (exid, key)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cqadata
    OWNER to doadmin;