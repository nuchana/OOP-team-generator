const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// create an array of team members to be filled in with their id array.
const teamMembers = [];
const idArray = [];


// Write code to use inquirer to gather information about the development team members by starting from a manager role who will set up the team.
function appMenu() {
    function createManager() {
        // use inquirer for prompt question and validating answers with return to ensure valid user input
        inquirer.prompt([
            {
                type: "input",

                message: "What is your manager's name?",
                name: "managerName",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                message: "What is your manager's id?",
                name: "managerId",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero."
                }

            },
            {
                type: "input",
                message: "What is your manager's email?",
                name: "managerEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid e-mail."
                }
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name: "managerOfficeNumber",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero."
                }
            },

        // call back with user's answers to be push in the team member/id array and create team function to be executed.
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();

        });
    }

    // Create creatTeam function with inquirer/prompt question to set up a team and identify which member type he/she will be as thier class will be different.
    function createTeam() {
        inquirer.prompt([

            {
                type: "list",
                name: "memberType",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more."
                ]
            }
        
        ]).then(userChoice => {
            switch (userChoice.memberType) {
                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                default:
                    buildTeam();

            }
        });


    }
    // create addEngineer function to be called once user input is Engineer. Engineer class with inherit parent class from employee will be prompt questions.
    function addEngineer() {
        inquirer.prompt([

            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                message: "What is your engineer's id?",
                name: "engineerId",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero."
                }

            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "engineerEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid e-mail."
                }
            },
            {
                type: "input",
                message: "What is your engineer's Github username?",
                name: "engineerGithub",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            }

        // callback with Engineer class to be pushed into teamMember and id arrays

        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();

        })

    }
    // create addIntern function with the similar appraoch to addEngineer function with relevant intern class.
    function addIntern () {
        inquirer.prompt([

            {
                type: "input",
                message: "What is your intern's name?",
                name: "internName",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                message: "What is your intern's id?",
                name: "internId",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero."
                }

            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "internEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid e-mail."
                }
            },
            {
                type: "input",
                message: "What is your intern's school?",
                name: "internSchool",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            }


        ]).then(answers => {
            const intern = new Intern(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();

        })
    }
    
    // create output directory if the output path doesn't exist. 
    function buildTeam () {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();
}

appMenu();






// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
