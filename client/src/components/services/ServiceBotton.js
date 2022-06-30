import axios from "axios";
// import the Link component
import { Link, useNavigate } from "react-router-dom";

const ServiceBotton = (serviceOne) => {
  const accessToken = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("isAdmin");
  console.log(accessToken);
  console.log(isAdmin);

  //When user logged in, but not admin (isAdmin is false)
  if (accessToken !== "" && isAdmin === false) {
    alert("ONLY admin can access. Please ask admin");
    document.location.href = "/layouts/NotFound";
  }
  //User don't login. then access denied
  if (!accessToken && !isAdmin) {
    alert("ONLY admin can access. Please ask admin");
    document.location.href = "/layouts/NotFound";
  }

  const navigate = useNavigate();
  const Delete = async (id) => {
    try {
      console.log("delete: " + id);
      // Add in code if you want to delete the contact
      alert("Are you sure?");

      const res = await axios.delete(`/api/service/${id}`);

      if (res.data.success) {
        alert(res.data.msg);
      }
      navigate("/services");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mainServicesBtn  py-2">
      <button className="btn btn-secondary">
        <Link to={`/service/edit/${serviceOne.id}`}>Edit</Link>
      </button>
      <button className="btn dark-color">
        <Link to="" onClick={(e) => Delete(serviceOne.id)}>
          Delete
        </Link>
      </button>
    </div>
  );
};

export default ServiceBotton;
