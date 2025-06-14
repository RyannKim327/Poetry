import { useEffect, useState } from "react";
import type { Poems } from "./types";
import axios from "axios";

function App() {
  const [poems, setPoems] = useState<Poems[]>([]);
  const [poem, setPoem] = useState<Poems>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.github.com/gists/eb870458fadf06fdf48255005d378c2d",
      );
      const d = JSON.parse(data.files["poetry.json"].content);
      setPoems(d.reverse());
    })();
  }, []);

  useEffect(() => {
    setPoem(poems[0]);
  }, [poems]);

  return (
    <div className="flex h-dvh w-dvw bg-[#FFF1E6] text-[#5C3A21] box-border">
      <div className="flex flex-col w-1/3 md:w-3/12 gap-1 p-2 overflow-y-scroll box-border">
        {/* TODO: Poem list */}
        {poems.map((p, i) => {
          return (
            <div
              onClick={() => {
                setPoem(poems[i]);
              }}
              className="bg-[#F2D7D9] p-[3px] rounded cursor-pointer"
            >
              {p.title}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center w-full bg-[#F2D7D9] m-2 box-border">
        <p className="text-lg md:text-5xl font-serif">{poem?.title}</p>
        <p className="overflow-y-scroll text-wrap w-full px-2 md:px-6 whitespace-pre-wrap">
          <pre className="whitespace-pre-wrap">{poem?.content}</pre>
        </p>
      </div>
    </div>
  );
}

export default App;
