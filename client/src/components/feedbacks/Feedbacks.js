// rafcp
import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
// import the Link component
import { Link } from "react-router-dom";
// Auth
import { AuthContext } from "../../helpers/AuthContext";

const Feedbacks = () => {
  const [Feedbacks, setFeedbacks] = useState(null);
  //grab which user logged in.
  const { AuthState } = useContext(AuthContext);

  //네트워크 통신을 한번만 실행하기위해서 useEffect사용. 재렌더링 방지.
  useEffect(() => {
    axios
      .get("/api/feedbacks")
      .then(function (result) {
        const Feedbacks = result.data;
        console.log(Feedbacks);
        setFeedbacks(Feedbacks);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (Feedbacks == null) {
    return <h1> Loading ..... </h1>;
  }

  return (
    <div>
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">FEEDBACK LIST</h2>
          </div>
        </div>
      </section>

      <section className="mainAbout my-5">
        <div className="container">
          <div className="showcase-form">
            <h2>Feedback</h2>
            <table className="text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>VIEW</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Call all services using Map function --> */}
                {Feedbacks.map((feedback, key) => {
                  return (
                    <tr key={key}>
                      <td>{feedback.FName}</td>
                      <td>{feedback.FTitle} </td>
                      <td>{feedback.createdAt}</td>
                      <td>
                        <button className="btn btn-secondary">
                          <Link to={`/feedback/${feedback.F_id}`}>View</Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <button className="btn btn-primary">
              <Link to="/feedbackform">Leave Feedback</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedbacks;
