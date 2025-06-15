import { useEffect, useState } from "react";
import type { Poems } from "./types";
import axios from "axios";

function App() {
  const [poems, setPoems] = useState<Poems[]>([]);
  const [poem, setPoem] = useState<Poems>();
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [poems]);

  return (
    <div className="flex h-dvh w-dvw bg-[#FFF1E6] text-[#5C3A21] box-border select-none">
      <div className="flex flex-col w-1/3 bg-[#FFF1E6] md:w-3/12 gap-1 p-2 box-border">
        {/* TODO: Poem list */}
        <p className="bg-[#F2D7D9] text-center p-[3px] rounded cursor-pointer border-[#C3BABA] border-2 border-solid">
          Poems List
        </p>
        <div className="flex flex-col overflow-y-scroll gap-1">
          {loading ? (
            <p className="bg-[#F2D7D9] p-[3px] rounded cursor-pointer border-[#C3BABA] border-2 border-solid">
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
                }}
                className="bg-[#F2D7D9] p-[3px] rounded cursor-pointer border-[#C3BABA] border-2 border-solid"
              >
                {p.title}
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
      <div className="flex flex-col border-[#C3BABA] border-2 border-solid rounded justify-start items-center w-full bg-[#F2D7D9] m-2 box-border">
        <p className="text-[#C49991] text-lg md:text-5xl font-serif">
          {poem?.title}
        </p>
        <p className="overflow-y-scroll text-wrap w-full px-2 pb-4 md:px-6">
          {poem?.content.map((c, i) => {
            return (
              <p
                className={`${i % 4 == 0 && poem.content.length > 5 ? "mt-4 md:mt-10" : ""}`}
              >
                {c}
              </p>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default App;
