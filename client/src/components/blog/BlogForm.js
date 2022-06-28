import React from "react";
//npm install antd to use form.
import { Form, Input, Button } from "antd";
import axios from "axios";
//Redirect
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();

  //(accessToken, isAdmin)
  const accessToken = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("isAdmin");
  const email = localStorage.getItem("email");
  // console.log(accessToken);
  // console.log(isAdmin);

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

  //FName, FEmail, FTitle,FDescription
  const onSubmit = (values) => {
    axios
      .post(
        "/api/blog/add",
        {
          BName: email,
          BCat: values.BCat,
          BTitle: values.BTitle,
          BDescription: values.BDescription,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((result) => {
        console.log(result);
        //if there is no accessToken
        if (result.data.error) {
          console.log(result.data.error);
          alert("Please Login IN");
          navigate("/blogform");
        } else {
          navigate("/");
          console.log(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">Blog Form</h2>
          </div>
        </div>
      </section>

      <section className="mainAbout my-5">
        <div className="container">
          <div className="showcase-form">
            <h2>Write Blog</h2>
            {/* Form.Item "name" goes to the DB */}
            <Form name="blogform" onFinish={onSubmit}>
              <Form.Item
                name="BCat"
                label={<div className="upload-label">Category</div>}
                rules={[{ required: true, message: "Please write Category" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Category"
                />
              </Form.Item>

              {/* <Form.Item
                name="BName"
                label={<div className="upload-label">Name</div>}
                rules={[{ required: true, message: "Please write Name" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Name"
                />
              </Form.Item> */}

              <Form.Item
                name="BTitle"
                label={<div className="upload-label">Title</div>}
                rules={[{ required: true, message: "Please write Title" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Title"
                />
              </Form.Item>

              <Form.Item
                className="upload-name"
                name="BDescription"
                label={<div className="upload-label">Description</div>}
                rules={[
                  { required: true, message: "Please write Description" },
                ]}
              >
                <Input.TextArea
                  size="large"
                  showCount
                  maxLength={300}
                  placeholder="Please write BDescription"
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

export default BlogForm;
