import React, { useEffect, useState } from "react";
import axios from "axios";
//useParams : get Unique Key, useNavigate : redirect.
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const ServiceFormEdit = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("isAdmin");
  console.log(accessToken);
  console.log(isAdmin);

  //When user logged in, but not admin (isAdmin is false)
  if (accessToken && isAdmin === "false") {
    alert("ONLY admin can access. Please ask admin");
    document.location.href = "/layouts/NotFound";
  }
  //User don't login. then access denied
  if (!accessToken && !isAdmin) {
    alert("ONLY admin can access. Please ask admin");
    document.location.href = "/layouts/NotFound";
  }

  //(1) Declare useParams(), useNaviage()
  const { id } = useParams();

  //(2) Set up our state for the form.
  //[data, setter] = useState({default});
  const [formData, setFormData] = useState({
    title: "",
    cat: "",
    price: "",
    imageUrl: null,
    description: "",
  });

  console.log(props);

  //Get the service using useEffect if there is id.
  //(3) select * from service where C_id = 'id'
  useEffect(() => {
    const getService = async (id) => {
      const res = await axios.get(`/api/service/${id}`);
      const service = res.data;

      //Use the setFieldsValue provided by antd to update the changed value.
      setFormData({
        title: service.title,
        cat: service.cat,
        price: service.price,
        imageUrl: service.imageUrl,
        description: service.description,
      });
    };
    getService(id);
    // The dependency array hold the values or functions that will trigger updates to the component.
  }, [id]);

  //The setFormData function has been updated.
  //Call the updated formdata
  const { title, cat, price, imageUrl, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData);

  //const navigate = useNavigate();
  //const [imageUrl, setImageUrl] = useState(null);

  //(5) Submit updated data to server.
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .put(`/api/service/edit/${id}`, {
        title: formData.title,
        description: formData.description,
        cat: formData.cat,
        price: parseInt(formData.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

    // Redirect to the home page.
    //navigate("/", { replace: true });
  };

  return (
    <div>
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">Service Form</h2>
          </div>
        </div>
      </section>

      <section className="mainAbout my-5">
        <div className="container">
          <div className="showcase-form">
            <h2>Edit Service</h2>

            <form
              onSubmit={(e) => onSubmit(e)}
              encType="multipart/form-data"
              method="post"
            >
              {imageUrl}
              <br />
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => onChange(e)}
              />
              Title:
              <input
                type="text"
                id="title"
                placeholder="title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
              />
              Category:
              <input
                type="text"
                id="cat"
                placeholder="cat"
                name="cat"
                value={cat}
                onChange={(e) => onChange(e)}
              />
              Price:
              <input
                type="text"
                id="price"
                placeholder="price"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
              />
              Description:
              <textarea
                cols="50"
                rows="10"
                placeholder="Description"
                name="description"
                onChange={(e) => onChange(e)}
                value={description}
              ></textarea>
              <input
                type="submit"
                value="Update Service"
                className="btn btn-primary "
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceFormEdit;
