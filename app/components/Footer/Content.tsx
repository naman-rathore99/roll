import React from "react";

export default function Content() {
  return (
    <div className="bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div className="flex justify-between items-end">
      <Item />
    </div>
  );
};

const Item = () => {
  return (
    <div className="flex shrink-0 gap-20 absolute items-center  top-[10%]">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
        <p>Home</p>
        <p>Projects</p>
        <p>Our Mission</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
        <p>News</p>
        <p>Learn</p>
        <p>Certification</p>
        <p>Publi acations</p>
      </div>
    </div>
  );
};
