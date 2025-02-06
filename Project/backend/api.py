
from unittest import result
from click import option
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import pandas as pd
import ast
import json


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


df = pd.read_csv("movies_emotions.csv")
df.drop(['Unnamed: 0'], axis=1, inplace=True)
clustersDf = pd.read_csv("movies_with_topics.csv")

def jsonify(df):
    return json.dumps(df.to_numpy().tolist())

@app.route('/movies', methods=['GET'])
def getMovies():
    print("fetching movies")
    emotions_list = ast.literal_eval(request.args.get('emotions_list'))
    limit = int(request.args.get('limit'))

    options = [False for _ in emotions_list]
    df.sort_values(emotions_list, ascending = options, inplace=True)
    df1 = df[['imdb_id', 'title']]
    return jsonify(df1[:limit])

@app.route('/clusters', methods=['GET'])
def getClusters():
    print("fetching movie clusters")
    movie_id = request.args.get('imdb_id')
    limit = int(request.args.get('limit'))
    topic = clustersDf[clustersDf.Movie_ID == movie_id]['Topic'].item()
    clusters = clustersDf[clustersDf.Topic == topic]
    clusters = clusters[[ 'Movie_ID', 'Title']]
    return jsonify(clusters[:limit])
    
if __name__ == '__main__':
    app.run()  # run our Flask app
