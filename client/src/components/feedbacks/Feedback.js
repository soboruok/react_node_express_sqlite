import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import the Link component
import { Link } from "react-router-dom";

const Feedback = () => {
  //get id using useParams
  const { id } = useParams();
  const [feedbackOne, setFeedbackOne] = useState(null);
  useEffect(function () {
    axios
      .get(`/api/feedback/${id}`)
      .then(function (result) {
        const feedbackOne = result.data;
        console.log(feedbackOne);
        setFeedbackOne(feedbackOne);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  //if feedback is null, diplay loading.
  if (feedbackOne == null) {
    return <h1> Loading ..... </h1>;
  }

  return (
    <div>
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">FEEDBACK</h2>
          </div>
        </div>
      </section>

      <section className="mainFeedback py-5">
        <div className="container flex">
          <div className="card py-3">
            <div className="mainFeedbackBox px-3 px-5">
              <p className="sm b800">Title: {feedbackOne.FTitle}</p>
              <p className="sm b500">Name : {feedbackOne.FName}</p>
              <p className="sm b500">
                Description: {feedbackOne.FDescription}
                <br />
                <br />
                <span className="ssm">Writer: {feedbackOne.FEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
