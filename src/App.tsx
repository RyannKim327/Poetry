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

function App() {
  const [poems, setPoems] = useState<Poems[]>([]);
  const [poem, setPoem] = useState<Poems>();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [defaultList, setDefaultList] = useState<Poems[]>([]);
  const [selected, setSelected] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.github.com/gists/eb870458fadf06fdf48255005d378c2d",
      );
      const d = JSON.parse(data.files["poetry.json"].content);
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
        className={`${selected ? "flex z-10 md:z-0" : "hidden"} md:flex flex-col w-1/2 absolute md:static md:w-1/3 bg-[#F5ECD9] text-[#3B2F2F] md:w-3/12 gap-1 p-2 box-border`}
      >
        {/* TODO: Poem list */}
        <p
          onClick={() => setSortList()}
          className="bg-[#F5ECD9] text-center p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid"
        >
          Poems List <span className="text-[10px] mr-2">[{poems.length}]</span>
          <FontAwesomeIcon
            icon={sort == "a" ? faSortUp : sort == "d" ? faSortDown : faSort}
          />
        </p>
        <div className="flex flex-col overflow-y-scroll gap-1">
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
      <Poem setSelected={setSelected} poem={poem} />
    </div>
  );
}

export default App;
