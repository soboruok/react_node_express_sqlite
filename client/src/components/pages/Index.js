import React from 'react'

const Index = () => {
  return (
    <div>
        <section className="mainBanner bg-secondary py-3">
            <div className="container flex">
                <div>
                    <h1 className="xl">Excellent service</h1>
                    <p className="lead">
                        Bob’s workshop that fixes and services you car.
                    </p>
                </div>
                <i className="fas fa-car fa-7x"> </i>
            </div>
        </section>

        <section className="mainAbout">
            <div className="container">
                <h2 className="md my-2">Our Services</h2>
                <p className="lead my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio nulla recusandae qui, optio modi fuga, quos quidem 
                    similique doloremque, harum soluta. Id consequatur facilis 
                    illo quo error, ut molestiae, beatae assumenda pariatur, 
                    ea sapiente. Eveniet minus debitis sunt dicta eaque.
                </p>
            </div>
        </section>

        <section className="mainServices">
            <div className="container flex">
                <div className="card">
                    <img src="img/mechanical.jpg" alt="" />
                    <p className="sm b800">Mechanical</p>
                </div>
                <div className="card">
                    <img src="img/electric.jpg" alt="" />
                    <p className="sm b800">Auto Electrical</p>
                </div>
                <div className="card">
                    <img src="img/aircon.jpg" alt="" />
                    <p className="sm b800">Air Conditioning</p>
                </div>
                <div className="card">
                    <img src="img/tire.jpg" alt="" />
                    <p className="sm b800">Wheels and Tyres</p>
                </div>
                <div className="card">
                    <img src="img/logbook.jpg" alt="" />
                    <p className="sm b800">LogBook</p>
                </div>
                <div className="card">
                    <img src="img/repair.jpg" alt="" />
                    <p className="sm b800">Car Detailing</p>
                </div>
            </div>
        </section>

        <section className="mainFeedbacks my-5">
            <div className="container">
                <div className="mainFeedback flex">
                    <div className="mainFeedbackDes m-2">
                        <h3>Tom</h3>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Illum quae minus debitis, quo delectus placeat natus vitae 
                        distinctio hic? Veritatis laudantium hic exercitationem 
                        mollitia minima ea eligendi sapiente et impedit!</p>
                </div>
                <div className="mainFeedback">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Illum quae minus debitis, quo delectus placeat natus vitae 
                        distinctio hic? Veritatis laudantium hic exercitationem 
                        mollitia minima ea eligendi sapiente et impedit!</p>
                    <div className="mainFeedbackDes m-2">
                        <h3>Tom</h3>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Index