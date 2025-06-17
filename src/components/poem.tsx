import type { Poems } from "../types";

interface props {
    poem: Poems | undefined
}

export default function Poem(props: props){
    const title = props.poem?.title ?? "a"
    return (
        <div className="flex flex-col border-[#3B2F2F] rounded justify-start items-center w-full bg-[#F5ECD9] m-2 box-border shadow-[0_0_10px_#A58D7F]">
        <p className={`${title.charCodeAt(0) > 255 ? "baybayin" : "font-serif"} text-[#3B2F2F] text-lg md:text-5xl pb-4 md:pb-6`}>
          {props.poem?.title}
        </p>
        <div className="overflow-y-scroll text-wrap w-full pb-4">
          {props.poem?.content.map((c, i) => {
            return (
              <div>
                {i % 4 == 0 && i > 0 ? (
                  <p className={`px-4 md:px-6 border-b-1 border-solid border-b-[#A58D7F] text-lg text-transparent`}>
                    Fault Line
                  </p>
                ) : (
                  ""
                )}
                <p
                  className={`${c.charCodeAt(0) > 255 ? "baybayin italic" : "dancing-script"} px-4 md:px-6 border-b-1 border-solid border-b-[#A58D7F] text-lg`}
                >
                  {c}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
}