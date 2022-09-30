-- Table: public.userhistory

-- DROP TABLE IF EXISTS public.userhistory;

CREATE TABLE IF NOT EXISTS public.userhistory
(
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    first_login timestamp without time zone,
    login timestamp without time zone,
    logout timestamp without time zone,
    spent_hours integer,
    CONSTRAINT userhistory_pkey PRIMARY KEY (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.userhistory
    OWNER to doadmin;