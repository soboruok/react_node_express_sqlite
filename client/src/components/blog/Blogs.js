// rafcp
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import the Link component
import { Link } from "react-router-dom";

const Blog = () => {
  //Only loggedin person can access.
  // useEffect(() => {
  //   if (!AuthState.status) {
  //     document.location.href = "/auth/login";
  //   }
  // }, []);

  const [blogs, setBlogs] = useState(null);
  //grab which user logged in.

  //네트워크 통신을 한번만 실행하기위해서 useEffect사용. 재렌더링 방지.
  useEffect(() => {
    axios
      .get("/api/blogs")
      .then(function (result) {
        const blogs = result.data;
        console.log(blogs);
        setBlogs(blogs);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (blogs == null) {
    return <h1> Loading ..... </h1>;
  }

  //delete blog
  const deleteBlog = (id) => {
    console.log(id);
    axios.delete(`/api/blogs/${id}`).then(() => {
      alert("OK");
      document.location.href = "/blog";
    });
  };

  return (
    <section className="mainAbout my-5">
      <div className="container">
        <div className="showcase-form">
          <h2>BLOG</h2>
          <table className="text-center">
            <thead>
              <tr>
                <th>Title</th>
                <th>Memo</th>
                <th>Writer</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, key) => {
                return (
                  <tr key={key}>
                    <td className="b700 lead">{blog.BCat}</td>
                    <td>
                      <p className="b700 sm">{blog.BTitle}</p>
                      {blog.BDescription}

                      {/* <p>
                        <Link to="#" onClick={(e) => deleteBlog(blog.B_id)}>
                          <span className="px-1 ssm b600"> Delete</span>
                        </Link>
                      </p> */}
                    </td>
                    <td>
                      <span className="b800 ssm">{blog.BName}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button className="btn btn-primary">
            <Link to="/blogform">Write Blog</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
