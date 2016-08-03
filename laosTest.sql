use laos;

INSERT INTO patient
(pname,birth, sex ,phone, address, systolicBP, diastolicBP, pulse, temperature, bst ,height, weight, spo2 )
values(
'김명찬','1985-12-12','M','01050247455','Anyang Imgok Apt. 105-703',
120, 80, 60, 36.5,
120,187, 90.0 , 100
);

UPDATE patient SET pname = '김공실'
WHERE pid = 1;
UPDATE patient SET pid = 1, pname = '김명찬', birth = '1985-12-11', sex = 'M' WHERE pid =1;

INSERT INTO patient (pname, birth, sex , phone, address, systolicBP, diastolicBP, pulse, height, weight) VALUES  ( '가나다', '1985-11-12', 'M' , '0100100100', '경기도의왕시내손1동', 120, 80, 60, 180, 80);
UPDATE patient SET pid = 1, pname = '김명찬', birth = '1985-12-11', sex = 'M', phone = '1234' WHERE pid =1;
-- ------------------------
desc patient;

select * from patient order by reciept_datetime desc;
SELECT pid, pname, DATE_FORMAT(birth, '%Y-%m-%d') as birth , sex, address, sBP, dBP, pulse, bst, spo2, height, weight FROM patient WHERE pid = 1;

show tables;
select * from chart;
drop table chart;
desc chart;

call insert_chart(2);

select (NOW() - birth) as age FROM patient where pid = 1;

select cid, pid, medical_chart, prescription, oriental_chart, oriental_prescription, lab, memo, DATE_FORMAT(createTime, '%Y-%m-%d %h:%i %p') as createTime
from chart;

select DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(birth , '%Y') FROM patient where pid = 1;
desc patient;
select cid, pid, medical_chart, prescription, oriental_chart, oriental_prescription, lab, memo
	, DATE_FORMAT(createTime, '%Y-%m-%d %h:%i %p') as createTime 
    from chart where pid = 4 order by createTime DESC;