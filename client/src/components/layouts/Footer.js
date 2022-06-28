import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-dark py-5">
        <div className="container flex">
            <div className="footerAddress">
                <p>	PO BOX 42 HOLMESGLEN VIC 3148</p>
                <p>111-222-3333</p>
            </div>
            <div className="footerSocialMedia m-1">
                <Link to="#"><i className="fab fa-github fa-2x"></i></Link>
                <Link to="#"><i className="fab fa-facebook fa-2x"></i></Link>
                <Link to="#"><i className="fab fa-instagram fa-2x"></i></Link>
                <Link to="#"><i className="fab fa-twitter fa-2x"></i></Link> 
            </div>
        </div>
    </footer>
  )
}

export default Footer