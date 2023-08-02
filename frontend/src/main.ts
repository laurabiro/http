import "./style.css";
import http from "axios";
import { z } from "zod";

const CharacterResponseScheme = z.object({
  info: z.object({
    next: z.string(),
  }),
  results: z
    .object({
      name: z.string(),
    })
    .array(),
});

type CharacterResponse = z.infer<typeof CharacterResponseScheme>;

/* type CharacterResponse = {
  info: {
    next:string
  },
  results: {
    name:string
  }[]
} */
const load = async (): Promise<CharacterResponse | null> => {
  const response = await http.get("https://rickandmortyapi.com/api/character");
  /* const data = response.data as CharacterResponse */
  const data = response.data;
  const result = CharacterResponseScheme.safeParse(data);
  if (!result.success) {
    console.log("result.error");
    return null;
  }
  return result.data;
  /*  const name = result.data.results[0].name
   console.log(name) */
};
const init = async () => {
  const characters = await load();
  if (characters)
    document.getElementById("app")!.innerHTML = characters!.results[0].name;
};

document.getElementById("load-button")!.addEventListener("click", init);

document
  .getElementById("app")!
  .insertAdjacentHTML("afterend", "<p class=bg-pink-300>demo</p>");
