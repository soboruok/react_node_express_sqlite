import "antd/dist/antd.min.css";
import "./App.css";
import React from "react";
//Router : npm install react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Import custom components
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Index from "./components/pages/Index";
import About from "./components/pages/About";
import Team from "./components/pages/Team";
import Service from "./components/services/Service";
import Services from "./components/services/Services";
import ServiceForm from "./components/services/ServiceForm";
import ServiceFormEdit from "./components/services/ServiceFormEdit";
import FBForm from "./components/feedbacks/FBForm";
import Feedbacks from "./components/feedbacks/Feedbacks";
import Feedback from "./components/feedbacks/Feedback";

import BlogForm from "./components/blog/BlogForm";

import Blogs from "./components/blog/Blogs";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import NotFound from "./components/layouts/NotFound";

function App() {
  return (
    <Router>
      <Header branding="BOB WORKSHOP" />
      {/* The Routes allow for the changing of pages */}

      <Routes>
        <Route path="about" element={<About />} />
        <Route path="index" element={<Index />} />
        <Route path="/" element={<Index />} />
        <Route path="team" element={<Team />} />

        <Route path="service/edit/:id" element={<ServiceFormEdit />} />
        <Route path="serviceform" element={<ServiceForm />} />

        <Route path="feedbackform" element={<FBForm />} />

        <Route path="service/:id" element={<Service />} />
        <Route path="services" element={<Services />} />
        <Route path="feedbacks" element={<Feedbacks />} />
        <Route path="feedback/:id" element={<Feedback />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="blogform" element={<BlogForm />} />
        <Route path="blog" element={<Blogs />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
