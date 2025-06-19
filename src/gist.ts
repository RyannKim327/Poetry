/*
 * TODO: To create some read and write access with security
 */

import { z } from "zod";
// import type { Poems } from "./types";
import axios from "axios";

const envSchema = z.object({
  // VITE_GIST_TOKEN: z.string(),
  VITE_GIST_ID: z.string(),
  VITE_GIST_FILE: z.string(),
});

const env = envSchema.parse(import.meta.env);

export default env;

export async function FetchGist() {
  const { data } = await axios.get(
    `https://api.github.com/gists/${env.VITE_GIST_ID}`,
  );
  console.log(data);
  return data;
}

// INFO: Commented for now
// export async function UpdateGist(poem: Poems) {
//   const poems: Poems[] = await FetchGist();
//   if (!poem.title || !poem.content) {
//     return {
//       error: "Mission Failed",
//     };
//   }
//   poems.push(poem);
//   try {
//     const url = `https://api.github.com/gists/${env.VITE_GIST_ID}`;
//     const { data } = await axios.patch(
//       url,
//       {
//         files: {
//           ["poetry.json"]: { content: JSON.stringify(poems) },
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${env.VITE_GIST_TOKEN}`,
//           Accept: "application/vnd.github+json",
//           "X-GitHub-Api-Version": "2022-11-28",
//         },
//       },
//     );
//     return data;
//   } catch (e) {
//     return e;
//   }
// }
