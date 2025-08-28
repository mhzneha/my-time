"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../card/card";
import Loading from "@/app/component/loading";
import { getPost } from "@/app/api/postApi";
import { useRouter } from "next/navigation";
import { useMovieApi } from "@/app/context/movieApi/movieApiContext";
type MovieDataType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
export default function Movie() {
  const [data, setData] = useState<MovieDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingTask, setPendingTask] = useState(0);
  const router = useRouter();
  const api =
    "https://www.omdbapi.com/?i=tt3896198&apikey=447257d7&s=titanic&page=1";
  async function getMovieData() {
    try {
      const res = await axios.get(api);
      // setIsLoading(true);
      console.log(res.data?.Search);
      setData(res.data.Search); //store data
    } catch (err) {
      console.error(err, "there is a error");
    } finally {
      setIsLoading(false);
    }
  }
  // if (isLoading) {
  //   return <div>Loading.....</div>;
  // }
  useEffect(() => {
    getMovieData();
  }, []);

  // const { moviedata, isLoading } = useMovieApi();
  useEffect(() => {
    async function checkTask() {
      try {
        const res = await getPost();
        const todo = res?.data;
        const pending = todo.filter((p: any) => !p.completed);
        setPendingTask(pending.length);
      } catch (error) {
        console.log(error, "there is a error");
      }
    }
    checkTask();
  }, []);
  if (pendingTask > 2) {
    return (
      <div>
        <p>There are some task left to complete</p>
      </div>
    );
  }
  function onMovieClicked() {
    router.push("/dashboard/movie/movieDetail");
  }
  return (
    <div className="h-screen bg-[#F9F6F3]">
      <h2 className="text-5xl text-center  font-bold mb-4 p-5  text-gray-700 ">
        Movies
      </h2>
      {isLoading && (
        <div className="flex justify-center p-9">
          <Loading />
        </div>
      )}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-10 p-3">
          {data.map((currentData) => {
            return <Card key={currentData.imdbID} movieData={currentData} />;
          })}
        </div>
      </div>
    </div>
  );
}
