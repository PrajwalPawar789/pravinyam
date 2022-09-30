--insert query for group_master
insert into public.group_master(user_group,type) 
values('DSL','internal');

insert into public.group_master(user_group,type) 
values('TataMotors','corporate');

insert into public.group_master(user_group,type) 
values('christ college','academics');

--insert query for pravinyam_usermaster
insert into public.pravinyam_usermaster(userid,password,role,user_group) 
values ('intern1@gmail.com','intern1@123','student','DSL');

insert into public.pravinyam_usermaster(userid,password,role,user_group) 
values ('intern2@gmail.com','intern2@123','student','christ college');

insert into public.pravinyam_usermaster(userid,password,role,user_group) 
values ('admin@gmail.com','admin@123','admin','DSL');

insert into public.pravinyam_usermaster(userid,password,role,user_group) 
values ('TataMotors@gmail.com','TataMotors@123','corporate admin','TataMotors');

insert into public.pravinyam_usermaster(userid,password,role,user_group) 
values ('student1@gmail.com','student1@123','individual','christ college');

insert into public.pravinyam_usermaster(userid,password,role,user_group) 
values ('teacher1@gmail.com','teacher1@123','teacher','christ college');

