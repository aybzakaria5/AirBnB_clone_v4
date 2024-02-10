#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/1-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    state_obj = storage.all('State').values()
    states = dict([state.name, state] for state in state_obj)
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    user_obj = storage.all('User').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in user_obj)
    cache_id = uuid.uuid4()            
    return render_template('1-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
