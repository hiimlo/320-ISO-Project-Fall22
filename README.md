# 320-ISO-Project-Fall22
Full stack web application for reporting on bulk LMP datasets across different scnenarios and nodes


### Notes for Installation and Use
In order to install and use our application, make sure to have npm installed and have downloaded the `.env`  file in the deliverables. (`.env` not included here for security)

## Installation 
Clone the GitHub repository using the following command

	git clone https://github.com/hiimlo/320-ISO-Project-Fall22.git

1. Once the project is cloned, navigate to its directory on your local machine. Paste the provided `.env` file into the root of the cloned directory (i.e. `/320-ISO-Project-Fall22`). This file should already be in `.gitignore`
2. From the same directory, run the command `npm i --force` to install JS packages
3. From the same directory, run the command `pip install -r requirements.txt` to install python packages



## Running the Application
1. `npm start`
2. enjoy! Ctrl-C in the command line to stop.

### Data Loading
The app will make GET requests to the database defined by the `DB_URI` property in your `.env` file (the database provided is already populated). If you wish to plug in your own data, simply replace the csv files in `backend/dummy-data` with new csv files that have the same column names. Then, run `backend/dataloading_script.py` to run a script that loads in all the new data from the csv into the mongo database. 

### Modular Backend
This application uses its own database. If for some reason a new database is desired, as long as API calls can be made following the api contract in docs, a new backend can be swapped in by replacing the backend folder and updating the startup script in package.json

## About
This project was a joint collaboration between ISO New Engand and students of CS320 at UMass. See the documentation pdf for contact details and more info.

Contributors to the project 

**CS429 Project Management**

@hiimlo Lo 

Provided structure and guidance in team meetings where members created stories, refined the backlog, and participated in two week sprints (JIRA). Weekly SCRUMs were held to assess progress and to ensure that the project was able to get to the MVP.

**CS320 Software Engineering**

_Frontend_

@ajnguy Alex

@AACcodes Ayush

@jamesrcarney James

@dvaykhanskiy-umass David

@Savannah-Arimento Savannah


Members primarily used React.js, HTML, and CSS to build the frontend, and got experience using React Routers to create a multi page web app. Part of the project requirements required data visualizations. Members in the front end researched different libraries to use and ultimately decided on Apex Charts. Rest API calls were made to the backend in order to retrieve the data to display. Overall a well designed and solid front end was created. (Note: members had little to no experience using React prior to this, and picked it up very quickly!)

_Backend_

@Victorapple Victor

@jbredd Joshua

@MaanasPeri23 Maanas

@tai-dang11 Tai


Members of the backend team took some time researching what database to use, and selected one that fit the needs of the customer, being MongoDB. Paired with Mongoose for object data modeling, they were able to start taking given CSV files and move the data to the database. Using ExpressJS, members also created API endpoints for the front end to call and receive JSON responses. There was a need for filtering based on input provided by the front end, and members were successfully able to filter and provide the needed data. This teams backend was the fastest and most capable in the class! (Note: members in the backend also had little to no prior experience, and also picked up the tech stack very quickly!)

Both the frontend and the backend were built on top of Node.js


## License

[MIT](https://choosealicense.com/licenses/mit/)
