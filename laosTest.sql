use laos;

INSERT INTO patient
(pname,birth, sex ,phone, address, systolicBP, diastolicBP, pulse, temperature, bst ,height, weight, spo2 )
values(
'김명찬','1985-12-12','M','01050247455','Anyang Imgok Apt. 105-703',
120, 80, 60, 36.5,
120,187, 90.0 , 100
);



-- ------------------------
desc patient;

select * from patient;