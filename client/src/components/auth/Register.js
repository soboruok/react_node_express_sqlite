import React from "react";
//npm install antd to use form.
import { Form, Input, Button } from "antd";
import axios from "axios";
//Redirect
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initalValues = {
    name: "",
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    axios
      .post("/api/register", values)
      .then((result) => {
        console.log(result);
        // redirect to /
        navigate("/");
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
            <h2 className="md b800">REGISTER</h2>
          </div>
        </div>
      </section>

      <section className="mainAbout my-5">
        <div className="container">
          <div className="showcase-form card">
            <h2>Register Member</h2>
            {/* Form.Item "name" goes to the DB */}
            <Form name="Registerform" onFinish={onSubmit}>
              <Form.Item
                name="name"
                label={<div className="upload-label">name</div>}
                rules={[{ required: true, message: "Please write name" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write name"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<div className="upload-label">email</div>}
                rules={[{ required: true, message: "Please write email" }]}
              >
                <Input
                  className="upload-name"
                  size="large"
                  placeholder="Please write email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<div className="upload-label">password</div>}
                rules={[{ required: true, message: "Please write password" }]}
              >
                <Input
                  type="password"
                  className="upload-name"
                  size="large"
                  placeholder="Please write password"
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

export default Register;
