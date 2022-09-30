-- Table: public.category

-- DROP TABLE IF EXISTS public.category;

CREATE TABLE IF NOT EXISTS public.category
(
    catid character varying(100) COLLATE pg_catalog."default" NOT NULL,
    category character varying(500) COLLATE pg_catalog."default",
    subcategoryid character varying(250) COLLATE pg_catalog."default",
    locked bigint,
    CONSTRAINT my_catid_pkey PRIMARY KEY (catid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.category
    OWNER to doadmin;