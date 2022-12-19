# 320-ISO-Project-Fall22
Full stack web application for reporting on bulk LMP datasets.


### Notes for Installation and Use
In order to install and use our application, make sure to have npm installed and have downloaded the .env  file in the deliverables.

## Installation 
Clone the GitHub repository using the following command

	git clone https://github.com/hiimlo/320-ISO-Project-Fall22.git

Once the project is cloned, navigate to its directory on your local machine. Paste the `.env` file into the directory.
Then, from the same directory, run the command `npm i --force`



## Running the Application
1. `npm start`
2. enjoy!

### Data Loading
The app will make GET requests to the database defined by the `DB_URI` property your `.env` file (the database provided is already populated). If you wish to plug in your own data, simply replace the csv files in `backend/dummy-data` with new csv files that have column format. Then, run `backend/dataloading_script.py` to run a script that loads in all the new data from the csv into the mongodb databse.

## About
This project was a joint collaboration between ISO New Engand and students of CS320 at UMass.


## License

[MIT](https://choosealicense.com/licenses/mit/)
