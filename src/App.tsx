import { useEffect, useState } from "react";
import type { Poems } from "./types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Poem from "./components/poem";
import env, { FetchGist } from "./gist";

function App() {
  const [poems, setPoems] = useState<Poems[]>([]);
  const [poem, setPoem] = useState<Poems>();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [defaultList, setDefaultList] = useState<Poems[]>([]);
  const [selected, setSelected] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const data = await FetchGist()
      const d = JSON.parse(data.files[env.VITE_GIST_FILE].content);
      setPoems(d.reverse());
      setDefaultList(d);
    })();
  }, []);

  useEffect(() => {
    document.title = poem?.title || "";
  }, [poem]);

  useEffect(() => {
    setPoem(poems[0]);
    setLoading(false);
  }, [poems]);

  useEffect(() => {
    switch (sort) {
      case "a":
        setPoems(
          [...defaultList].sort((a, b) => a.title.localeCompare(b.title)),
        );
        break;
      case "d":
        setPoems(
          [...defaultList].sort((a, b) => b.title.localeCompare(a.title)),
        );
        break;
      default:
        setPoems(defaultList);
    }
  }, [sort]);

  const setSortList = () => {
    switch (sort) {
      case "a":
        setSort("d");
        break;
      case "d":
        setSort("");
        break;
      default:
        setSort("a");
    }
  };

  return (
    <div className="flex h-dvh w-dvw bg-[#F5ECD9] text-[#2e2e2e] box-border select-none">
      <div
        onClick={() => {
          setSelected(false);
        }}
        className={`${selected ? "flex z-10 md:z-0 backdrop-blur-xs bg-[#cd333333] md:bg-[#F5ECD9]" : "hidden"} md:flex flex-col md:backdrop-blur-none h-full w-full absolute md:static text-[#3B2F2F] md:w-3/12 gap-1 p-2 box-border`}
      >
        <div className="flex flex-col bg-[#F5ECD9] w-1/2 h-full md:w-full box-border gap-1">
          {/* TODO: Poem list */}
          <p
            onClick={() => setSortList()}
            className="bg-[#F5ECD9] text-center p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid"
          >
            Poems List{" "}
            <span className="text-[10px] mr-2">[{poems.length}]</span>
            <FontAwesomeIcon
              icon={sort == "a" ? faSortUp : sort == "d" ? faSortDown : faSort}
            />
          </p>
          <div className="flex flex-col overflow-y-scroll">
            {loading ? (
              <p className="bg-[#F5ECD9] p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid">
                Please Wait
              </p>
            ) : (
              ""
            )}
            {poems.map((p, i) => {
              return p.title ? (
                <div
                  onClick={() => {
                    setPoem(poems[i]);
                    setSelected(false);
                  }}
                  className={`${p.title.charCodeAt(0) > 255 ? "baybayin" : "font-serif"} bg-[#F5ECD9] p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid`}
                >
                  {p.title}
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
      <Poem setSelected={setSelected} poem={poem} />
    </div>
  );
}

export default App;
