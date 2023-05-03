import './stretched_menu.css';
import React from "react";
import icon from './icons/Vectorhome.svg';
import icon2 from './icons/Groupprofile.svg';
import icon3 from './icons/Groupfriends.svg';
import icon4 from './icons/Chat_alt_2_light.svg';

export default function StretchedMenu() {
    return (
    
          <div className="smenu">
            <h1>k.</h1>
            <div className="sgrid_wrapper">
            <div className="sgrid_container">
              <div class="sgrid-item">
                <img src={icon}></img>
              
              </div>
              <div className="sgrid-item">
                <img src={icon2}></img>
        
              </div>
              <div className="sgrid-item">
                <img src={icon3}></img>
       
              </div>
              <div className="sgrid-item">
                <img src={icon4} style={{marginLeft : -5 + 'px' }}></img>

              </div>
            </div>
            </div>
          </div>
        );
    }
