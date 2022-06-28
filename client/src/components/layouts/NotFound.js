import React from "react";

const NotFound = () => {
  return (
    <div className="page">
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">Page Not Found</h2>
          </div>
        </div>
      </section>

      <section>
        <p className="my-5 text-center">Sorry, this page does not exist</p>
      </section>
    </div>
  );
};

export default NotFound;
