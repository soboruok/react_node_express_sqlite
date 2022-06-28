import React from "react";
//npm install antd to use form.
import { Form, Input, Button } from "antd";
import axios from "axios";
//Redirect
import { useNavigate } from "react-router-dom";

const FBForm = () => {
  const navigate = useNavigate();

  //로그인후 토큰을 두개로 만들었다. (accessToken, isAdmin)
  const accessToken = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("isAdmin");
  const email = localStorage.getItem("email");
  console.log(accessToken);
  console.log(isAdmin);

  //User don't login. then access denied
  if (!accessToken && !isAdmin) {
    alert("Please register and login");
    document.location.href = "/register";
  }

  //FName, FEmail, FTitle,FDescription
  const onSubmit = (values) => {
    console.log(values);

    axios
      .post(
        "/api/feedback/add",
        {
          FEmail: email,
          FName: values.FName,
          FTitle: values.FTitle,
          FDescription: values.FDescription,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((result) => {
        if (result.data.error) {
          console.log(result.data.error);
          alert("Please Login IN");
          navigate("/feedbackform");
        } else {
          navigate("/feedbacks");
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
            <h2 className="md b800">Feedback Form</h2>
          </div>
        </div>
      </section>

      <section className="mainAbout my-5">
        <div className="container">
          <div className="showcase-form">
            <h2>Write Feedback</h2>
            {/* Form.Item "name" goes to the DB */}
            <Form name="feedbackform" onFinish={onSubmit}>
              <Form.Item
                name="FName"
                label={<div className="upload-label">Name</div>}
                rules={[{ required: true, message: "Please write Title" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Title"
                />
              </Form.Item>

              {/* <Form.Item
                name="FEmail"
                label={<div className="upload-label">Email</div>}
                rules={[{ required: false, message: "Please write Title" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write Title"
                />
              </Form.Item> */}

              <Form.Item
                name="FTitle"
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
                name="FDescription"
                label={<div className="upload-label">Description</div>}
                rules={[
                  { required: true, message: "Please write Description" },
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

export default FBForm;
