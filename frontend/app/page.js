"use client";

import { Button, Input } from "@nextui-org/react";
import { ChevronRight } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url) {
      return;
    }
    fetch("http://localhost:8000/metrics/all", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div className="w-screen">
      <div className="w-1/3 mt-10 ml-10 flex items-center space-x-3">
        <Input
          label="Github Repo URL"
          placeholder="https://github.com/test"
          type="url"
          isClearable
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button color="primary" onPress={handleSubmit}>
          <ChevronRight size={30} />
        </Button>
      </div>
    </div>
  );
}