import axios from "axios";
import React, { useState, useEffect } from "react";
// import the Link component
import { useParams } from "react-router-dom";
import ServiceBotton from "./ServiceBotton";

const Service = () => {
  //get id using useParams

  const { id } = useParams();
  const [serviceOne, setServiceOne] = useState(null);
  useEffect(
    function () {
      axios
        .get(`/api/service/${id}`)
        .then(function (result) {
          const serviceOne = result.data;
          console.log(serviceOne);
          setServiceOne(serviceOne);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    [id]
  );

  //if service is null, diplay loading.
  if (serviceOne == null) {
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
          <div className="mainServicesDes whiteCard">
            <div className="px-3">
              <p className="sm b800">{serviceOne.cat}</p>
              <p className="sm b500">
                {" "}
                <img
                  src={`http://localhost:3001/${serviceOne.imageUrl}`}
                  alt=""
                />
              </p>
              <p className="sm b500">AUD {serviceOne.price}</p>
              <p className="sm b500">{serviceOne.description}</p>

              <ServiceBotton id={serviceOne.C_id} service={serviceOne} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
