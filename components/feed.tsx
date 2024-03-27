import React, { useState, useEffect } from "react";
import FeedCard from "./feed-card";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function Feed({ channel }: any) {
  const [feed, setFeed] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");

  async function fetchData(nextPage: any, initialLoad: boolean) {
    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const data = JSON.stringify({
        channel: channel,
        nextPage: nextPage,
      });
      const feedData = await fetch("/api/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const feed = await feedData.json();
      const isEmbedValid = (item: any) => item.castAddBody.embeds[0]?.url;
      const isUrlValid = (item: any) =>
        !item.castAddBody.embeds[0]?.url.includes("stream.warpcast.com");

      const filteredFeed = feed.filter(
        (item: any) =>
          isEmbedValid(item) && isUrlValid(item)
      );

      setFeed((prevFeed: any) => [...prevFeed, ...filteredFeed]);
      setNextPageToken(feed[0].pageToken);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function refetchData() {
    fetchData(nextPageToken, false);
  }

  useEffect(() => {
    setFeed([]); // Clear the feed state
    fetchData("", true);
  }, [channel]);

  return (
    <div className="mt-4 flex flex-wrap min-h-screen items-start justify-center gap-4">
      {loading ? (
        <Loader2 className="h-16 w-16 animate-spin" />
      ) : (
        feed.map((item: any, index: any) => (
          <FeedCard
            key={index}
            image={item?.castAddBody?.embeds[0]?.url}
            author={item?.fid || "anon"}
            text={item?.castAddBody?.text} item={undefined}          />
        ))
      )}
      {loadingMore ? (
        <Button disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="secondary" onClick={refetchData}>
          More
        </Button>
      )}
    </div>
  );
}
