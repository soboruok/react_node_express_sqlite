import React from 'react'

const Team = () => {
  return (
    <div>
        <section className="subBanner bg-secondary py-3">
            <div className="container flex">
                <div className="subBannerdes">
                    <h2 className="md b800">TEAM</h2>
                </div>
            </div>
        </section>

        <section className="team">
            <div className="container flex">
                <div className="teamDes card">
                    <h3>Bob</h3>
                    <p>Position: Owner</p>
                    <img src="img/team.jpg" alt="" />
                    <p>Originally from Marlborough, Gary has been a technician for 11 years, 
                        completing his apprenticeship  
                    </p>
                </div>
                <div className="teamDes card">
                    <h3>Gary</h3>
                    <p>Position: Mechanic</p>
                    <img src="img/team.jpg" alt="" />
                    <p>Originally from Marlborough, Gary has been a technician for 11 years, 
                        completing his apprenticeship
                    </p>
                </div>
                <div className="teamDes card">
                    <h3>Tim</h3>
                    <p>Position: Mechanic</p>
                    <img src="img/team.jpg" alt="" />
                    <p>Originally from Marlborough, Gary has been a technician for 11 years, 
                        completing his apprenticeship 
                    </p>
                </div>
                <div className="teamDes card">
                    <h3>Jenny</h3>
                    <p>Position: receptionist</p>
                    <img src="img/team.jpg" alt=""/>
                    <p>Originally from Marlborough, Gary has been a technician for 11 years, 
                        completing his apprenticeship 
                    </p>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Team