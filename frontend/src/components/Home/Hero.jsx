import React from "react";
import file from "/file.png";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row">
      <div className="w-full lg:w-3/6 flex flex-col items-center md:items-start  justify-center md:order-1 order-2">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-start">
          Dicover Your Next Great Read
        </h1>
        <p className="mt-4 text-zinc-300 text-xl text-center lg:text-start">
          Uncover captivating stories, enriching knowledge and endless
          inspiration in our curated collection of books.
        </p>

        <div className="mt-8">
          <Link to='/all-books' className="text-yellow-100 font-semibold rounded-full text-2xl px-10 py-3 border border-yellow-100 hover:bg-zinc-800">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h[100%] flex justify-center items-center md:order-2 order-1 ">
        <img
          className="h-[410px] md:h-[530px] md:w-[700px] w-[full] "
          src={file}
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
