--create ENUM for group type
create type group_type as ENUM('internal','corporate','academics');

--create ENUM for user_role
create type user_role as ENUM('admin','student','teacher','individual','corporate admin');

--create ENUM for status
create type status_for as ENUM('not-started','in-complete','complete');

--create table for group_master
CREATE TABLE public.group_master(
	user_group varchar(100) Primary key Not null,
	type group_type
);

--create table for pravinyam_usermaster
CREATE TABLE public.pravinyam_usermaster(
	userid varchar(250) PRIMARY KEY,
	password varchar(100),
	role user_role,
	user_group varchar(100),
	FOREIGN KEY(user_group) REFERENCES public.group_master(user_group)ON DELETE CASCADE ON UPDATE CASCADE
);

--create table for userResponse_master
Create table public.userResponse_master(
	userid text NOT null,
	exid text NOT null,
	no_of_correct_answers int,
	no_of_total_questions int,
	QA_details text,
	first_attempt date,
	last_attempt date,
	no_of_attempts int,
	score int,
	badges int,
	status status_for,
	constraint pk_user_response primary key(userid,exid)
);
