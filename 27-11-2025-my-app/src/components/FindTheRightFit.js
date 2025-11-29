"use client";

import Image from "next/image";

function FindTheRightFit() {
  const doors = [
    { title: "Single Doors", img: "/images/RightFit/5.png" },
    { title: "Single Doors with One Sidelite", img: "/images/RightFit/6.png" },
    { title: "Single Door with Two Sidelites", img: "/images/RightFit/7.png" },
    { title: "Double Doors", img: "/images/RightFit/8.png" },
  ];

  return (
    <div className="rightfit-wrapper">
        <hr></hr>
      <h2 className="rightfit-heading">Find the Right Fit</h2>
      <p className="rightfit-subheading">
        Click on the door configuration below that matches what you are looking
        for to find the perfect solution for your project.
      </p>
      <hr></hr>

      <div className="rightfit-grid">
        {doors.map((door, index) => (
          <div key={index} className="rightfit-card">
            <div className="rightfit-imageWrapper">
              <Image
                src={door.img}
                alt={door.title}
                width={250}
                height={300}
                className="rightfit-image"
              />
            </div>

            <button className="rightfit-button">{door.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindTheRightFit;
