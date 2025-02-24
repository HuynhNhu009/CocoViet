import React from 'react';
import AboutIntro from '../components/About/AboutIntro';
import AboutConfes from '../components/About/AboutConfes';
import AboutInfor from '../components/About/AboutInfor';
import AboutTeam from '../components/About/AboutTeam';


const AboutUs = () => {
    return (
        <div className="w-full">
            <AboutIntro></AboutIntro>
            <AboutConfes></AboutConfes>
            <AboutInfor></AboutInfor>
            <AboutTeam></AboutTeam>
        </div>
    );
};

export default AboutUs;