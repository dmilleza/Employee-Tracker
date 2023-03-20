USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)quit
VALUES ("Sales Lead", 900000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 140000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 130000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 270000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Kim", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Rowave", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Gutierrez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tambell", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leen", "Back", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kunal", "Ahmad", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Deeznets", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Ato", 5, 2);