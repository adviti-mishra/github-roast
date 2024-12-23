"use client";

import { Button, Avatar, Autocomplete, AutocompleteItem, Alert } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { ChevronRight, Github, Star } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [repo, setRepo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [isUsernameSearch, setIsUsernameSearch] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertShowing, setAlertShowing] = useState(false);

  const list = useAsyncList({
    async load({ signal, filterText }) {
      if (!filterText) {
        return { items: [] };
      }

      try {
        const res = await fetch(`/api/userSearch?q=${filterText}`, { signal });
        if (!res.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const { items } = await res.json();

        return { items: items };
      } catch (error) {
        console.error("Error fetching users:", error);
        return { items: [] };
      }
    },
  });

  const handleInputChange = async (val) => {
    setInputValue(val);
    list.setFilterText(val);

    if (isUsernameSearch) {
      if (val.includes("/")) {
        const split = val.split("/");
        setUsername(split[0]);
        setInputValue("");
        setIsUsernameSearch(false);

        try {
          const res = await fetch(`/api/repoSearch?user=${split[0]}`);
          if (!res.ok) {
            throw new Error("Failed to fetch repository data.");
          }
          const data = await res.json();
          setRepos(data.items);
        } catch (err) {
          displayAlert("Error fetching user repositories.")
          console.error("Error fetching repositories:", err);
        }
      }
    } else {
      const split = val.split("/");
      setRepo(val);
      setInputValue(split[1]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && !inputValue && !isUsernameSearch) {
      setIsUsernameSearch(true);
      setInputValue(username + "/");
      list.setFilterText(username)
      setRepos([]);
    }
  };

  const handleSubmit = async () => {
    if (!repo) {
      displayAlert("Input is empty. Please provide a valid Github Repo URL.")
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/metrics/all", {
        method: "POST",
        body: JSON.stringify({ url: inputValue }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to submit URL.");
      }

      const data = await res.json();
      console.log("Submission successful:", data);
    } catch (err) {
      displayAlert("Error submitting Github URL. Try again later.")
      console.error("Error submitting URL:", err);
    }
  };

  const displayAlert = (msg) => {
    setAlertMsg(msg)
    setAlertShowing(true)
    setTimeout(() => {
      setAlertShowing(false);
      setAlertMsg("")
    }, 4000)
  }

  return (
    <div className="h-screen flex justify-center flex-col items-center space-y-7">
      <div className="text-center space-y-1">
        <h1 className="font-bold text-7xl">Roast Your Repository</h1>
        <p className="text-lg opacity-75">
          Think your Github repo is high quality? It's time for a reality check.
        </p>
      </div>

      <div className="w-1/3 flex items-end space-x-3">
        <Autocomplete
          label="Github Repo URL"
          labelPlacement="outside"
          placeholder={isUsernameSearch ? "adviti-mishra/github-roast" : ""}
          startContent={
            <div className="flex flex-row items-center space-x-1 whitespace-nowrap">
              <Github size={20} />
              <span className="text-default-400 text-small">
                github.com/{isUsernameSearch ? "" : `${username}/`}
              </span>
            </div>
          }
          variant="bordered"
          inputValue={inputValue}
          isLoading={list.isLoading}
          defaultInputValue=""
          items={isUsernameSearch ? list.items : repos}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
        >
          {(item) =>
            isUsernameSearch ? (
              <AutocompleteItem key={item.login + "/"} textValue={item.login + "/"}>
                <div className="flex flex-row items-center space-x-3">
                  <Avatar src={item.avatar_url} />
                  <p className="text-md">{item.login}</p>
                </div>
              </AutocompleteItem>
            ) : (
              <AutocompleteItem key={item.full_name} textValue={item.full_name}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-md">{item.name}</p>
                    <p className="text-sm ml-0 opacity-50">{item.description ? item.description : 'No description...'}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={15}/>
                    <p className="text-md">{item.stargazers_count}</p>
                  </div>
                </div>
              </AutocompleteItem>
            )
          }
        </Autocomplete>

        <Button color="warning" size="md" variant="ghost" onPress={handleSubmit}>
          <ChevronRight size={30} />
        </Button>
      </div>
      <div className={`absolute bottom-10 right-10 ${alertShowing ? "" : "hidden"}`}>
        <Alert color="danger" title={alertMsg} variant="faded"/>
      </div>
    </div>
  );
}
