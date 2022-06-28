import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import axios from "axios";
//useParams : get Unique Key, useNavigate : redirect.
import { useParams } from "react-router-dom";
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
  console.log(props);
  const { id } = useParams(); //get content's unique number :id
  console.log(id);

  //(2) Set up our state for the form.
  const [formData, setFormData] = useState({
    title: "",
    cat: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  //Get the service using useEffect if there is id.
  //(3) select * from service where C_id = 'id'
  useEffect(() => {
    const getService = async (id) => {
      const res = await axios.get(`/api/service/${id}`);
      const service = res.data;
      console.log(service);
      //use the setFormData to set our state (formData)
      setFormData({
        title: service.title,
        cat: service.cat,
        price: service.price,
        imageUrl: service.imageUrl,
        description: service.description,
      });
    };

    getService(id);
  }, [id]);

  //The setFormData function has been updated.
  //Call the updated formdata
  const { title, cat, price, imageUrl, description } = formData;

  //(4)Print called data
  //console.log(title + cat + price + imageUrl + description);

  //const [imageUrl, setImageUrl] = useState(null);

  //(5) Submit updated data to server.
  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("/api/service/edit/:id", {
        title: values.title,
        description: values.description,
        cat: values.cat,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //call onChange function, then callback parameter (info)
  //update info.
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    //
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      //setImageUrl(imageUrl);
    }
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
            {/* Form.Item "name" goes to the DB */}
            <Form name="productImage" onFinish={onSubmit}>
              <Form.Item
                name="upload"
                label={<div className="upload-label">Image</div>}
              >
                {/* Used Upload from antd, and get the key which is "key" */}
                <Upload
                  name="image"
                  action="http://localhost:3001/api/image"
                  listType="picture"
                  showUploadList={false}
                  onChange={onChangeImage}
                >
                  {/* if there is imageUrl, then show image, otherwise, upload Image */}
                  {imageUrl ? (
                    <img
                      id="upload-image"
                      src={`http://localhost:3001/${imageUrl}`}
                      alt=""
                    />
                  ) : (
                    <div id="upload-img-placeholder">
                      <span>Please upload Image</span>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                label={<div className="upload-label">Category</div>}
                name="cat"
                rules={[{ required: false, message: "Please write Category" }]}
              >
                {cat}
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Category"
                  value={cat}
                />
              </Form.Item>

              <Form.Item
                name="title"
                label={<div className="upload-label">Title</div>}
                rules={[{ required: false, message: "Please write Title" }]}
              >
                {title}
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Title"
                  value={title}
                />
              </Form.Item>

              <Form.Item
                name="price"
                label={<div className="upload-label">Price</div>}
                rules={[{ required: false, message: "Please write Price" }]}
              >
                {price}
                <Input className="upload-price" size="large" value={price} />
              </Form.Item>

              <Form.Item
                name="description"
                label={<div className="upload-label">Description</div>}
                rules={[
                  { required: false, message: "Please write Description" },
                ]}
              >
                {description}
                <Input.TextArea
                  size="large"
                  id="product-description"
                  showCount
                  maxLength={300}
                  placeholder="Please write Description"
                  value={description}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  id="submit-button"
                  size="large"
                  htmlType="submit"
                  className="btn btn-primary"
                >
                  SAVE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceFormEdit;
