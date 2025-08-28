"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
type MovieDataType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
type movieContextType = {
  moviedata: MovieDataType[];
  isLoading: boolean;
};
const movieContext = createContext<movieContextType>({
  moviedata: [],
  isLoading: true,
});
export default function MovieApiContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [moviedata, setMovieData] = useState<MovieDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const api =
    "https://www.omdbapi.com/?i=tt3896198&apikey=447257d7&s=titanic&page=1";

  const getMovie = async () => {
    try {
      const res = await axios.get(api);
      console.log(res.data.Search);
      setMovieData(res.data.Search);
    } catch (error) {
      console.log(error, "there is error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <movieContext.Provider value={{ moviedata, isLoading }}>
      {children}
    </movieContext.Provider>
  );
}
export function useMovieApi() {
  const useMovieContext = useContext(movieContext);
  return useMovieContext;
}
