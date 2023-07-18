import React from 'react'
import './footer.css'
// Images
import github from "../../Images/icons/github.png"
import linkedin from "../../Images/icons/linkedin.png"


const Footer = () => {
    return (
        <footer id='Footer'>
                <p className="copyrigth" > 
                    Made with <img className='heart' src="https://i.pinimg.com/originals/9a/84/c8/9a84c82ffa2654937e8aa8f715450961.gif" alt="Heart gift" />  &copy; Alexis Aguilar - 2023 
                </p>
                <div className="iconsWebs" >
                    <a href="https://github.com/Alexis-1999" > 
                        <img 
                            src={ github } 
                            alt="Github"
                            class = "contactMe"
                        /> 
                    </a> 
                    <a href="https://www.linkedin.com/"> 
                        <img 
                            src={ linkedin } 
                            alt="linkedin"
                            class = "contactMe"
                        /> 
                    </a> 
                </div>
        </footer>
    )
}

export default Footer