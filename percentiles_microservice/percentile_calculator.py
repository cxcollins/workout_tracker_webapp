from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('openpowerlifting-2024-11-30-a70793a3.csv')

@app.route('/lifting-stats/', methods=['GET'])
def return_date():
    sex = request.args.get('sex')
    age = request.args.get('age', type=int)
    weight = request.args.get('weight', type=int)
    weight = round(weight / 5) * 5

    # This later will be covered by ipynb
    df_filtered = df[(df['Equipment'] == 'Raw') & (df['BodyweightKg'] != '') & (df['BodyweightKg'].notna()) & (df['Tested'] == 'Yes') & (df['Age'].notna())][['Sex', 'Age', 'BodyweightKg', 'Best3DeadliftKg', 'Best3BenchKg', 'Best3SquatKg']]
    df_filtered['BodyweightKg'] = df_filtered['BodyweightKg'].apply(lambda x: round(x/5) * 5)

    deadlift_query = df_filtered[(df['Sex'] == sex) &
                                 (df['BodyweightKg'] == weight) & (df['Age'] == age) & (df['Best3DeadliftKg'].notna())]['Best3DeadliftKg'].quantile([0.1, 0.25, 0.5, 0.75, 0.9])

    result = deadlift_query.to_dict()
    
    return result

    # return jsonify(result)


if __name__ == '__main__':
    app.run(port=5000)
