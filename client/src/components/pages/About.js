import React from 'react'

const About = () => {
  return (
    <div>
        <section className="subBanner bg-secondary py-3">
            <div className="container flex">
                <div className="subBannerdes">
                    <h2 className="md b800">ABOUT</h2>
                </div>
            </div>
        </section>

        <section className="mainAbout">
            <div className="container m-5 p-3">
                <h2 className="md my-2">About</h2>
                <div className="mainAboutDes">
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Odio nulla recusandae qui, optio modi fuga, quos quidem 
                        similique doloremque, harum soluta. Id consequatur facilis 
                        illo quo error, ut molestiae, beatae assumenda pariatur, 
                        ea sapiente. Eveniet minus debitis sunt dicta eaque.
                    </p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About