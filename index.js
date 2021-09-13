const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");

function menuPrompt() {
    inquirer.prompt({
        type: 'list',
        message: 'Would you like to add an Engineer, Intern, or finish building your team?',
        name: 'nextStep',
        choices: ['Engineer', 'Intern', 'Finish']})
}

const init = () => {
    let teamArr = [];
    let currentID = 1;
    let engineerCount = 0;

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter your team manager's name: ",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter your team manager's ID: ",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter your team manager's email address: ",
        },
        {
            type: 'input',
            name: 'offnum',
            message: "Enter your team manager's office number: ",
        },
        {
            type: 'list',
            message: 'Would you like to add an Engineer, Intern, or finish building your team?',
            name: 'nextStep',
            choices: ['Engineer', 'Intern', 'Finish'],
        }
    ])
        .then((answers) => {
            const teamManager = new Manager(answers.name, answers.id, answers.email, answers.offnum);
            teamArr.push(teamManager);

            if (answers.nextStep == "Engineer") {
                engineerCount++;
                currentID++;
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: "Enter your engineer's name: ",
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: "Enter your engineer's ID: ",
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: "Enter your engineer's email address: ",
                    },
                    {
                        type: 'input',
                        name: 'github',
                        message: "Enter your engineer's GitHub username: ",
                    },
                    {
                        type: 'list',
                        message: 'Would you like to add an Engineer, Intern, or finish building your team?',
                        name: 'nextStep',
                        choices: ['Engineer', 'Intern', 'Finish'],
                    }
                ]).then((answers) => {
                    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                    teamArr.push(engineer);
                })
            } else if (answers.nextStep == "Intern") {
                currentID++;
                inquirer.prompt([]).then((answers) => { })
            } else {
                fs.writeFile("index.html", answers, (err) => err ? console.log(err) : console.log('Successfully created README.md!'))
            }
        });
}

const manager = new Manager();

// fs.writeFile('README.md', READMEContent, (err) =>
//                 err ? console.log(err) : console.log('Successfully created README.md!'))