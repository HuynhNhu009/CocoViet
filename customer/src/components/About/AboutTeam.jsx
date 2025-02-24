//import React from 'react';

const AboutTeam = () => {
    const teamMembers = [
        {
            name: "Thành viên 1",
            role: " Vai trò và đóng góp trong team",
            avatar: "",
            description: "Giới thiệu sơ lược, chém gió các kiểu, bla bla...",
        },
        {
            name: "Thành viên 2",
            role: " Vai trò và đóng góp trong team",
            avatar: "",
            description: "Giới thiệu sơ lược, chém gió các kiểu, bla bla...",
        }, 
        {
            name: "Thành viên 3",
            role: " Vai trò và đóng góp trong team",
            avatar: "",
            description: "Giới thiệu sơ lược, chém gió các kiểu, bla bla...",
        }
    ];
    return (
        <div
            className="w-full lg:h-[600px]  bg-white py-16 px-8">
            <h2 className="text-3xl font-bold text-center">Về phía đội ngũ phát triển</h2>
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-10">
                {teamMembers.map(({ name, role, avatar, description }, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <img src={avatar} alt={`Thành viên ${index}`} className="w-28 h-28 rounded-full shadow-md" />
              <h3 className="mt-4 text-xl font-semibold">{name}</h3>
              <p className="text-gray-600 text-lg">{role}</p>
              <p className="text-gray-500 text-sm mt-2">{description}</p>
            </div>
            ))}
            </div>
        </div>
    );
};

export default AboutTeam;