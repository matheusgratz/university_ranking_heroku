import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///universities.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
University_Ranking = Base.classes.universities_ranking

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"<br>"
        f"<h1>Available Routes:</h1><br>"
        f"<br/>"
        f"<strong>Ranking Range:</strong><br>"
        f"<i>/api/v1.0/ranking/from/to</i><br>"
        f"<br>"
        f"e.g. /api/v1.0/ranking/1/100<br>"
        f"<br>"
    )

@app.route("/api/v1.0/ranking/<rfrom>/<rto>")
def ranking(rfrom, rto):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of universities based on ranking range"""
    # Query ranking range

    rfrom = float(rfrom)
    rto = float(rto)


    results = session.query(
        University_Ranking.ranking,
        University_Ranking.title,
        University_Ranking.location,
        University_Ranking.continent,
        University_Ranking.number_students,
        University_Ranking.students_staff_ratio,
        University_Ranking.perc_intl_students,
        University_Ranking.gender_ratio,
        University_Ranking.overall_score,
        University_Ranking.teaching_score,
        University_Ranking.research_score,
        University_Ranking.citations_score,
        University_Ranking.industry_income_score,
        University_Ranking.intl_outlook_score,
        University_Ranking.latitude,
        University_Ranking.longitude
    ).filter(University_Ranking.ranking >= rfrom
    ).filter(University_Ranking.ranking <= rto
    ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_universities = []

    for ranking, title, location, continent, number_students, \
        students_staff_ratio, perc_intl_students, \
        gender_ratio, overall_score, teaching_score, \
        research_score, citations_score, \
        industry_income_score, intl_outlook_score, \
        latitude, longitude in results:

        rank_range_dict = {}

        rank_range_dict["ranking"] = ranking
        rank_range_dict["title"] = title
        rank_range_dict["location"] = location
        rank_range_dict["continent"] = continent
        rank_range_dict["number_students"] = number_students
        rank_range_dict["students_staff_ratio"] = students_staff_ratio
        rank_range_dict["perc_intl_students"] = perc_intl_students
        rank_range_dict["gender_ratio"] = gender_ratio
        rank_range_dict["overall_score"] = overall_score
        rank_range_dict["teaching_score"] = teaching_score
        rank_range_dict["research_score"] = research_score
        rank_range_dict["citations_score"] = citations_score
        rank_range_dict["industry_income_score"] = industry_income_score
        rank_range_dict["intl_outlook_score"] = intl_outlook_score
        rank_range_dict["location"] = [latitude,longitude]

        all_universities.append(rank_range_dict)

    return jsonify(all_universities)



if __name__ == '__main__':
    app.run(debug=True)
