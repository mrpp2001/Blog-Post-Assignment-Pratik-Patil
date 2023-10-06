import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({ articles: [] });
  const [error, setError] = useState(null);

  const apikey = "11a3729769e54869b556075c005abb97";
  const domains = "techcrunch.com";

  const url = `https://newsapi.org/v2/everything?domains=${domains},thenextweb.com&apiKey=${apikey}`;

  useEffect(() => {
    GrabNews();
  }, [url]);

  const GrabNews = () => {
    axios
      .get(url)
      .then((response) => {
        console.clear();
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return (
    <section className="py-20">
      <h1 className="mb-12 text-center font-sans text-5xl font-bold">
        News App
      </h1>
      {error ? (
        <p>Error: Unable to fetch data from the API.</p>
      ) : (
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {data &&
            data.articles.map((article, index) => (
              <article
                className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2"
                key={index}
              >
                <a href={article.url} className="block h-full w-full">
                  <img
                    className="max-h-40 w-full object-cover"
                    alt="featured image"
                    src={article.urlToImage}
                  />
                  <div className="w-full bg-white p-4">
                    <div className="flex justify-between">
                      <p className="text-md font-medium text-indigo-500">
                        {article.source.name}
                      </p>
                      <p className="text-md font-medium text-indigo-500">
                        {formatDistanceToNow(new Date(article.publishedAt))} ago
                      </p>
                    </div>
                    <p className="mb-2 text-xl font-medium text-gray-800">
                      {article.title}
                    </p>
                    <p className="text-md font-light text-gray-400">
                      {article.description}
                    </p>
                    <div className="justify-end mt-4 flex flex-wrap items-center ">
                      <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-2.5 px-6 text-sm text-gray-600 hover:bg-sky-500 hover:text-white">
                        Read More
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
        </div>
      )}
    </section>
  );
}
