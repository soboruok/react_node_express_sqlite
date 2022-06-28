// rafcp
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import the Link component
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState(null);

  //네트워크 통신을 한번만 실행하기위해서 useEffect사용. 재렌더링 방지.
  useEffect(function () {
    axios
      .get("/api/services")
      .then(function (result) {
        const services = result.data;
        console.log(services);
        setServices(services);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (services == null) {
    return <h1> Loading ..... </h1>;
  }

  return (
    <div>
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">SERVICE</h2>
          </div>
        </div>
      </section>
      <section className="mainServices">
        <div className="container flex">
          {/* <!-- Call all services using Map function --> */}
          {services.map(function (service, key) {
            return (
              <div key={key} className="card px-3">
                <p className="sm b800">{service.cat}</p>
                <p className="sm b800">
                  <img
                    src={`http://localhost:3001/${service.imageUrl}`}
                    alt=""
                  />
                </p>
                <p className="sm b500">AUD {service.price}</p>
                <div className="mainServicesBtn  py-2">
                  <button className="btn btn-secondary">
                    <Link to={`/service/${service.C_id}`}>View</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;
