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
    <div className="flex h-dvh w-dvw bg-[#F5ECD9] text-[#2e2e2e] box-border select-none">
      <div className="flex flex-col w-1/3 bg-[#F5ECD9] text-[#3B2F2F] md:w-3/12 gap-1 p-2 box-border">
        {/* TODO: Poem list */}
        <p className="bg-[#F5ECD9] text-center p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid">
          Poems List <span className="text-[10px]">[{poems.length}]</span>
        </p>
        <div className="flex flex-col overflow-y-scroll gap-1">
          {loading ? (
            <p className="bg-[F5ECD9] p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid">
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
                className="bg-[#F5ECD9] p-[3px] rounded cursor-pointer border-[#3B2F2F] border-1 border-solid"
              >
                {p.title}
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
      <div className="flex flex-col border-[#3B2F2F] rounded justify-start items-center w-full bg-[#F5ECD9] m-2 box-border shadow-[0_0_10px_#A58D7F]">
        <p className="text-[#3B2F2F] text-lg md:text-5xl font-serif pb-4 md:pb-6">
          {poem?.title}
        </p>
        <p className="overflow-y-scroll text-wrap w-full pb-4">
          {poem?.content.map((c, i) => {
            return (
              <div>
                {i % 4 == 0 && i > 0 ? (
                  <p className="px-4 md:px-6 dancing-script border-b-1 border-solid border-b-[#A58D7F] text-lg text-transparent">
                    .{" "}
                  </p>
                ) : (
                  ""
                )}
                <p
                  className={`px-4 md:px-6 dancing-script border-b-1 border-solid border-b-[#A58D7F] text-lg`}
                >
                  {c}
                </p>
              </div>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default App;
