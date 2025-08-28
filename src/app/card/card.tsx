import React, { useEffect, useState } from "react";

type MovieDataType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
type Props = { movieData: MovieDataType };
export default function Card({ movieData }: Props) {
  const { Poster, imdbID } = movieData;
  return (
    <div className="">
      <li className="list-none m-0 p-0">
        <div className="rounded-2xl shadow-[4px_8px_15px_rgba(0,0,0,0.3)] w-[300px] h-[450px] flex flex-col justify-between">
          <div>
            <img
              src={Poster}
              className="h-96 w-full object-cover rounded-t-2xl"
              alt={imdbID}
            />
          </div>
          <div className="p-3 text-center text-2xl font-bold bg-[#61C0BF] rounded-b-2xl h-full">
            <a href={`/dashboard/movie/${imdbID}`}>
              <button className="text-white">Watch Now</button>
            </a>
          </div>
        </div>
      </li>
    </div>
  );
}
