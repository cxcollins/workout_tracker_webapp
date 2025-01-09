from flask import Flask, request, jsonify
import json
import datetime
import numpy as np
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

workout_log_data = []

file_path = "workout_log.txt"


# Need to run first to store the data to be used on the trend function
@app.route('/add_workout_to_list', methods=['POST'])
def add_workout_to_list():
    current_datetime = datetime.datetime.now()
    formatted_datetime = current_datetime.strftime("%m-%d-%y %I:%M %p")
    data = request.json
    workout_log_data.append(data)
    add_workout(formatted_datetime)
    return jsonify({'message': 'Workouts were added to the file'})


def add_workout(formatted_datetime):
    with open(file_path, 'a') as file:
        file.write('\n')
        file.write(f"Log {formatted_datetime}:")
        file.write('\n')
        for workout in workout_log_data:
            for wo in workout:
                json.dump(wo, file)
                file.write('\n')


# Calculate the average weight per set and per rep, as well as add to file
@app.route('/calculate_average_weight', methods=['GET'])
def calculate_average_weight():
    name = request.args.get('name')
    total_weight = 0
    total_sets = 0
    total_reps = 0
    for workout in workout_log_data:
        for wo in workout:
            if wo['name'] == name:
                name_found = True
                for s in wo['sets']:
                    total_weight += s['weight']
                    total_sets += 1
                    total_reps += s['reps']
    if name_found:
        average_set_weight, average_rep_weight = add_average_weight_to_file(
            name, total_weight, total_reps, total_sets)

        return jsonify(round(average_set_weight, 2))
        # return jsonify(message=f'The average weight per set for {name} is '
        #                + f'{average_set_weight}. The average weight per rep '
        #                + f'for {name} is {average_rep_weight}')
    else:
        return jsonify(message=f'{name} was not found in the current ' +
                       'workout log')


def add_average_weight_to_file(name, total_weight, total_reps, total_sets):
    average_set_weight = total_weight / total_sets
    average_rep_weight = total_weight / total_reps

    with open(file_path, 'a') as file:
        file.write(f"Average set weight for {name} = {average_set_weight}")
        file.write("\n")
        file.write(f"Average rep weight for {name} = {average_rep_weight}")  # This is the useless one
        file.write('\n')

    return round(average_set_weight, 2), round(average_rep_weight, 2)


# Calculate the average reps per set and add to file
@app.route('/calculate_average_reps', methods=['GET'])
def calculate_average_reps():
    name = request.args.get('name')
    total_sets = 0
    total_reps = 0
    for workout in workout_log_data:
        for wo in workout:
            if wo['name'] == name:
                name_found = True
                for s in wo['sets']:
                    total_sets += 1
                    total_reps += s['reps']
    average_reps = add_average_reps_to_file(name, total_reps, total_sets)
    if name_found:
        return jsonify(round(average_reps, 2))
        # return jsonify(message=f'The average reps per set for {name} is ' +
        #                f'{average_reps}')
    else:
        return jsonify(message=f'{name} was not found in the current ' +
                       'workout log')


def add_average_reps_to_file(name, total_reps, total_sets):
    average_reps = total_reps / total_sets

    with open(file_path, 'a') as file:
        file.write(f"Average reps for {name} = {average_reps}")
        file.write('\n')

    return average_reps


# Calculate average sets per workout and add to file
@app.route('/calculate_average_sets', methods=['GET'])
def calculate_average_sets():
    total_sets = 0
    total_workouts = len(workout_log_data)
    for workout in workout_log_data:
        for wo in workout:
            total_sets += len(wo['sets'])
    average_sets = total_sets / total_workouts
    with open(file_path, 'a') as file:
        file.write(f"Average sets = {average_sets}")
        file.write('\n')
    # return jsonify(message=f'The average sets per workout is {average_sets}')
    return jsonify(round(average_sets, 2))


def gather_averages(average_set_weight_data, average_rep_weight_data,
                    average_reps_data, average_sets_data):
    with open(file_path, 'r') as file:
        for line_number, line in enumerate(file, start=1):
            if 'Average set weight for' in line and '=' in line:
                key, value = line.split('=')
                value = value.strip()
                average_set_weight_data.append((float(value)))
            elif 'Average rep weight for' in line and '=' in line:
                key, value = line.split('=')
                value = value.strip()
                average_rep_weight_data.append((float(value)))
            elif 'Average reps for' in line and '=' in line:
                key, value = line.split('=')
                value = value.strip()
                average_reps_data.append((float(value)))
            elif 'Average sets' in line and '=' in line:
                key, value = line.split('=')
                value = value.strip()
                average_sets_data.append((float(value)))


def calculate_trends(arr):
    numbers = np.array(arr)
    diff = np.diff(numbers)

    return round(np.mean(diff), 2)


# Compare averages in the text file and return trends
@app.route('/identify_trends', methods=['GET'])
def identify_trends():
    average_set_weight_data = []
    average_rep_weight_data = []
    average_reps_data = []
    average_sets_data = []

    gather_averages(average_set_weight_data, average_rep_weight_data,
                    average_reps_data, average_sets_data)

    average_set_weight_trend = calculate_trends(average_set_weight_data)
    average_rep_weight_trend = calculate_trends(average_rep_weight_data)
    average_reps_trend = calculate_trends(average_reps_data)
    average_sets_trend = calculate_trends(average_sets_data)

    return jsonify({'average_weight_per_set': round(average_set_weight_trend, 2),
                    # 'average_weight_per_rep': average_rep_weight_trend,
                    'average_reps_per_set': round(average_reps_trend, 2),
                    'average_sets_per_workout': round(average_sets_trend, 2)})


if __name__ == '__main__':
    app.run(port=5002, debug=True)
