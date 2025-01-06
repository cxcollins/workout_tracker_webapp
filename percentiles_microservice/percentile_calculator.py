from flask import Flask, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

df = pd.read_csv('filtered_df.csv')

@app.route('/lifting-stats', methods=['GET'])
def return_date():
    sex = request.args.get('sex')
    age = request.args.get('age', type=float)
    weight = request.args.get('weight', type=int)
    weight = round(weight / 11) * 5  # 5 * 2.2 = 11

    print(sex, age, weight)

    personalized_query = df[(df['Sex'] == sex) & (df['BodyweightKg'] == weight) & (df['Age'] == age) & (df['Best3DeadliftKg'].notna())]

    deadlift = personalized_query[personalized_query['Best3DeadliftKg'].notna()]['Best3DeadliftKg'].quantile([0.1, 0.25, 0.5, 0.75, 0.9]).to_dict()
    bench = personalized_query[personalized_query['Best3BenchKg'].notna()]['Best3BenchKg'].quantile([0.1, 0.25, 0.5, 0.75, 0.9]).to_dict()
    squat = personalized_query[personalized_query['Best3SquatKg'].notna()]['Best3SquatKg'].quantile([0.1, 0.25, 0.5, 0.75, 0.9]).to_dict()
    # deadlift['exercise_name'] = 'deadlift'
    # bench['exercise_name'] = 'bench'
    # squat['exercise_name'] = 'squat'

    # return deadlift
    return [deadlift,  bench, squat]


if __name__ == '__main__':
    app.run(port=5000)
