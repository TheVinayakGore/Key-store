import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600  body-font">
        <div className="border-t border-gray-200 bg-white">
          <div className="container py-8 flex flex-wrap mx-auto items-center">
            <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
              <p className="leading-7 font-medium text-2xl text-[#5c1cf1]">
                Thanks for visiting !
              </p>
            </div>
            <div className="inline-flex lg:ml-auto text-gray-500 lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
              <a className=""></a>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-[#8f5fff] text-white h-20">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-center sm:text-left">
              © 2020 {"< Key.Store />"} — @keystore
            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center">Created with by ❤️ Vinayak Gore</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
