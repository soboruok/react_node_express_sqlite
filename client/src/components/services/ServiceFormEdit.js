import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import axios from "axios";
//useParams : get Unique Key, useNavigate : redirect.
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const ServiceFormEdit = () => {
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
  const { id } = useParams(); //get content's unique number :id
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  //Get the service using useEffect if there is id.
  //(3) select * from service where C_id = 'id'
  useEffect(() => {
    const getService = async (id) => {
      const res = await axios.get(`/api/service/${id}`);
      const service = res.data;
      console.log(service);

      //Use the setFieldsValue provided by antd to update
      form.setFieldsValue({
        title: service.title,
        cat: service.cat,
        price: service.price,
        imageUrl: setImageUrl(service.imageUrl),
        description: service.description,
      });
    };
    getService(id);
  }, [id]);

  console.log(imageUrl);
  //(5) Submit updated data to server.
  const onSubmit = (props) => {
    console.log(props);
    axios
      .put(
        `/api/service/edit/${id}`,
        {
          title: props.title,
          description: props.description,
          cat: props.cat,
          price: parseInt(props.price),
          imageUrl: imageUrl,
        },
        {
          //Place accessToken to header. logged user only access
          headers: {
            accessToken: localStorage.getItem("accessToken"),
            isAdmin: localStorage.getItem("isAdmin"),
          },
        }
      )
      .then((result) => {
        if (result.data.error) {
          console.log(result.data.error);
        } else {
          navigate("/services");
          console.log(result);
        }
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
      setImageUrl(imageUrl);
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
            <Form form={form} name="productImage" onFinish={onSubmit}>
              <Form.Item
                name="imageUrl"
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
                name="cat"
                label={<div className="upload-label">Category</div>}
                rules={[{ required: false, message: "Please write Category" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Category"
                />
              </Form.Item>

              <Form.Item
                name="title"
                label={<div className="upload-label">Title</div>}
                rules={[{ required: false, message: "Please write Title" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Title"
                />
              </Form.Item>

              <Form.Item
                name="price"
                label={<div className="upload-label">Price</div>}
                rules={[{ required: false, message: "Please write Price" }]}
              >
                <Input className="upload-price" size="large" />
              </Form.Item>

              <Form.Item
                name="description"
                label={<div className="upload-label">Description</div>}
                rules={[
                  { required: false, message: "Please write Description" },
                ]}
              >
                <Input.TextArea
                  size="large"
                  id="product-description"
                  showCount
                  maxLength={300}
                  placeholder="Please write Description"
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
