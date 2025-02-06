# PROJECT STRUCTURE
- Emotion Analysis code: `emotion_analysis.ipynb` and pdf version with same name
- Named Entity Recognition & Topic Modeling code: `topic_modeling_final.ipynb` and corresponding pdf version with same name
- User application: `backend` and `frontend` folders
- Project Report: `group35_report.pdf`


# USER APPLICATION
Please follow these steps to run the application:

## Backend
1. In a Terminal window, navigate to the `backend` folder and run the following commands: 
- `pip install flask`
- `pip install flask_restful`
- `pip install flask_cors`
- `pip install pandas`

2. In the same Terminal window run the command `python api.py`. Now you should have the server up and running. 

## Frontend
1. Ensure you have NodeJS installed on your machine (at least version 16.*). Find the correct version for your operating system [here](https://nodejs.org/en/download/). 

2. With the backend server still running, open a new Terminal window and navigate to the `frontend` folder in this new window.
Run the command `npm install`. This will install all necessary packages for the user interface.

3. Once the installation of npm packages is complete, run the command `npm start`. This should open the application in a browser. If not, manually enter the address `http://localhost:3000` in a web browser to view the application.

**NOTE:** both the backend server and the frontend should be running (in separate Terminal windows) in order for the application to work
   