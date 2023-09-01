import "./style.css";
import http from "axios";
import { z } from "zod";


const ResponseScheme = z.string()
type CharacterResponse = z.infer<typeof ResponseScheme>;

/* type CharacterResponse = {
  info: {
    next:string
  },
  results: {
    name:string
  }[]
} */
const load = async (v1: string, v2: string): Promise<CharacterResponse | null> => {
  const response = await http.get("http://localhost:3333", {params: {v1:v1, v2:v2}});
  
  /* const data = response.data as CharacterResponse */
  const data = response.data;
  const result = ResponseScheme.safeParse(data);

  if (!result.success) {
    console.log(result.error);
    return null;
  }

  return result.data;
  /*  const name = result.data.results[0].name
   console.log(name) */
};

const init = async () => {
  const value1 = (document.getElementById("elso") as HTMLInputElement).value
  const value2 = (document.getElementById("masodik") as HTMLInputElement).value
  const data = await load(value1, value2);
  if (data)
    document.getElementById("app")!.innerHTML = data
};

document.getElementById("load-button")!.addEventListener("click", init);

document
  .getElementById("app")!
  .insertAdjacentHTML("afterend", "<p class=bg-pink-300>demo</p>");
