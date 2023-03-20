const mysql = require("mysql2");
require("console.table");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  database: "employeesDB",
});

//after connecting to database, begin asking questions
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View all Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Remove Employee",
          "Quit",
        ],
      },
    ])
    .then(function (res) {
      switch (res.start) {
        case "Add Employee":
          addEmployee();
          break;

        case "View All Employees":
          viewAllEmployees();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Add Department":
          addDept();
          break;

        case "View All Departments":
          viewAllDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}

//adds new employee
function addEmployee() {
  console.log("Inserting a new employee.\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "First Name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "Last Name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: [1, 2, 3, 4, 5],
      },
      {
        type: "list",
        message: "What is the employee's manager's ID?",
        name: "manager_id",
        choices: [1, 2, 3, "null"],
      },
    ])
    .then(function (res) {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        res,
        function (err, res) {
          if (err) throw err;
          console.log("Employee added!\n");

          start();
        }
      );
    });
}

// views all employees
function viewAllEmployees() {
  connection.query("Select * from employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// deletes employee
function removeEmployee() {
  let employeeList = [];
  connection.query(
    "SELECT employee.first_name, employee.last_name FROM employee",
    (err, res) => {
      for (let i = 0; i < res.length; i++) {
        employeeList.push(res[i].first_name + " " + res[i].last_name);
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to delete?",
            name: "employee",
            choices: employeeList,
          },
        ])
        .then(function (res) {
          const query = connection.query(
            `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
            function (err, res) {
              if (err) throw err;
              console.log("Employee deleted!\n");
              start();
            }
          );
        });
    }
  );
}

// adds department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the department?",
      },
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: res.deptName,
        },
        function (err, res) {
          connection.query("SELECT * FROM department", function (err, res) {
            console.table(res);
            start();
          });
        }
      );
    });
}

// views all departments
function viewAllDept() {
  connection.query("Select * from department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// adds role
function addRole() {
  let departments = [];
  connection.query("select * from role", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      res[i].first_name + " " + res[i].last_name;
      departments.push({ name: res[i].name, value: res[i].id });
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "which department does the role belong to?",
          choices: departments,
        },
      ])
      .then(function (res) {
        console.log(res);
        const query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.title,
            salary: res.salary,
            department_id: res.department,
          },
          function (err, res) {
            if (err) throw err;
            start();
          }
        );
      });
  });
}

// views all roles
function viewAllRoles() {
  connection.query("Select * from role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// updates employee's role_id column
function updateEmployeeRole() {
  connection.query("Select * from employee", function (err, res) {
    let employees = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeName",
          message: "Which employee's role do you want to update?",
          choices: employees,
        },
        {
          type: "list",
          name: "role",
          message: "Which role do you want to assign to the selected employee?",
          choices: [1, 2, 3, 4, 5],
        },
      ])
      .then((answers) => {
        const employee = employees.find(
          (employee) => employee.value === answers.employeeName
        );

        connection.query(
          "UPDATE employee SET role_id = ? WHERE id= ?",
          [answers.role, employee.value],
          (err, res) => {
            if (err) throw err;
            console.log("Employee updated successfully.");
            start();
          }
        );
      });
  });
}
