const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//object where the information of the employees will be storage.
const employees = [];

// Colect information of the manager
function manager() {
    inquirer.prompt([{
            type: "text",
            name: "name",
            message: "Type the manager name: "
        },
        {
            type: "number",
            name: "idManager",
            message: "Type the manager ID: "
        },
        {
            type: "text",
            name: "email",
            message: "Type the manager e-mail: "
        },
        {
            type: "number",
            name: "managerOfficeNumber",
            message: "Type the manager office number: "
        },
    ]).then((result) => {
        const newManager = new Manager(result.name, result.idManager, result.email, result.managerOfficeNumber);
        employees.push(newManager);
        member();
    });
};

// Check type of member
function member() {
    inquirer.prompt([{
        type: "list",
        name: "member",
        message: "Select the type of the company member",
        choices: [
            "Intern",
            "Engineer",
            "None of the above"
        ]
    }]).then((result) => {
        if (result.member === "Intern") {
            intern();
        } else if (result.member === "Engineer") {
            engineer();
        } else if (result.member === "None of the above") {
            end();
        }
    });
};

function intern() {
    inquirer.prompt([{
            type: "text",
            name: "name",
            message: "Type the intern name: "
        },
        {
            type: "number",
            name: "idIntern",
            message: "Type the intern ID: "
        },
        {
            type: "text",
            name: "email",
            message: "Type the intern e-mail: "
        },
        {
            type: "text",
            name: "internSchool",
            message: "Type the name of the school of the intern: "
        },
    ]).then((result) => {
        const newIntern = new Intern(result.name, result.idIntern, result.email, result.internSchool);
        employees.push(newIntern);
        member();
    });
};

function engineer() {
    inquirer.prompt([{
            type: "text",
            name: "name",
            message: "Type the engineer name: "
        },
        {
            type: "number",
            name: "idEngineer",
            message: "Type the engineer ID: "
        },
        {
            type: "text",
            name: "email",
            message: "Type the engineer e-mail: "
        },
        {
            type: "text",
            name: "engineerGitHub",
            message: "Type the GitHub username of the engineer: "
        },
    ]).then((result) => {
        const newEngineer = new Engineer(result.name, result.idEngineer, result.email, result.engineerGitHub);
        employees.push(newEngineer);
        member();
    });
};

function end() {
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.writeFileSync(outputPath, render(employees), "utf-8");
    } else {
        fs.mkdirSync(OUTPUT_DIR);
    }
};

manager();