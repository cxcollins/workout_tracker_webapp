from flask import Flask, request
import random
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

quotes = [
  "The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion. - Arnold Schwarzenegger",
  "What hurts today makes you stronger tomorrow. - Jay Cutler",
  "Motivation is what gets you started. Habit is what keeps you going. - Jim Ryun",
  "Fitness is not about being better than someone else. It's about being better than you used to be. - Khloe Kardashian",
  "I hate every minute of training. But I said, don't quit. Suffer now and live the rest of your life as a champion. - Mohammad Ali",
  "If it doesn't challenge you, it won't change you. - Fred Devito",
  "You're only one workout away from a good mood. - Health Coach Maria Marlowe",
  "You can have results or excuses, but not both. - Arnold Schwarzenegger",
  "Nothing will work unless you do. - Maya Angelou",
  "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
  "Take care of your body. It's the only place you have to live. - Jim Rohn",
  "A rested body is a healthy one. - Health Coach, Jessica Sepel",
  "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear. - Buddha",
  "A healthy attitude is contagious but don't wait to catch it from others. Be a carrier.- Tom Stoppard",
  "Learning to love is a process. It starts from a decision. - Health Coach, Tara Wang",
  "The greatest wealth is health. - Roman poet, Virgil",
  "When you focus on your health, you awaken your creativity. By creativity I don't mean painting or drawing, I mean the ability to conceive your life exactly the way you most want it. - Stacey Morgenstern, Founder at Health Coach Institute",
  "The food you eat can either be the safest & most powerful form of medicine...or the slowest form of poison. - Ann Wigmore",
  "A fresh start isn't a new place, it's a new mindset. - Erin Taylor, Health Coach",
  "Self-care is about giving the world the best of you, not what's left of you. - Marissa Palmer, Health Coach",
  "The hard days are what make you stronger. - Aly Raisman",
  "One thing that does seem to be clear is that health and happiness are connected, more so than we're often aware. - Bobby Duffy",
  "In order to master aliveness-in life and in business-we must let go of the habit of being stopped. - Carey Peters, Founder at Health Coach Institute",
  "Obstacles don't have to stop you. If you run into a wall, don't turn around and give up. Figure out how to climb it, go through it, or work around it. - Michael Jordan"
]


@app.route('/get-quote', methods=['GET'])
def return_quote():
    quote = random.choice(quotes)
    return quote


if __name__ == '__main__':
    check()
    app.run(port=5001)
