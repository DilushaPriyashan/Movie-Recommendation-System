from flask import Flask, jsonify, render_template
import pickle

app = Flask(__name__)

# Load your pickled data (new_df and similarity)
new_df = pickle.load(open('artifacts/movie_list.pkl', 'rb'))
similarity = pickle.load(open('artifacts/similarity.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend/<string:movie>', methods=['GET'])
def recommend(movie):
    index = new_df[new_df['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommendations = [new_df.iloc[i[0]]['title'] for i in distances[1:10]]
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)

