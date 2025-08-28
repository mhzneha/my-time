"use client";
import Loading from "@/app/component/loading";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type MovieDetailType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
};

export default function WatchNow() {
  const params = useParams();
  const { imdbID } = params;
  const [movieData, setMovieData] = useState<MovieDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getMovieData() {
    // if (!imdbID) return;

    const api = `https://www.omdbapi.com/?apikey=447257d7&i=${imdbID}&plot=full`;

    try {
      const res = await axios.get(api);
      console.log(res.data);
      setMovieData(res.data);
    } catch (err) {
      console.error(err, "there is an error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMovieData();
  }, [imdbID]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-9">
        <Loading />
      </div>
    );
  }

  //   if (!movieData) return <p>Movie not found</p>;

  return (
    <div className="p-18 grid grid-cols-[1fr_3fr] gap-7 bg-[#F9F6F3]">
      <div>
        <img
          src={movieData?.Poster}
          alt={movieData?.Title}
          className="w-80 rounded-xl mb-4"
        />
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-4 text-gray-700 p-2">
          {movieData?.Title}
        </h2>
        <div className="text-[20px] p-5">
          <p className=" tracking-wider pb-1">
            <strong className="text-gray-700 text-2xl">Genre:</strong>{" "}
            {movieData?.Genre}
          </p>
          <p className=" tracking-wider pb-1">
            <strong className="text-gray-700 text-2xl">Runtime:</strong>{" "}
            {movieData?.Runtime}
          </p>
          <p className=" tracking-wider pb-1">
            <strong className="text-gray-700 text-2xl">Director:</strong>{" "}
            {movieData?.Director}
          </p>
          <p className=" tracking-wider pb-1">
            <strong className="text-gray-700 text-2xl">Actors:</strong>{" "}
            {movieData?.Actors}
          </p>
          <p className="mt-5 tracking-wider pb-1">
            <strong className="text-gray-700 text-2xl">Plot:</strong>{" "}
            {movieData?.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}
