import { Config } from "@carp-dk/client";
import {CarpClient} from "@carp-dk/client/client";

// Carp adapter
const carpConfig: Config = {
  baseUrl: import.meta.env.VITE_BASE_URL,
};

const carpApi = new CarpClient(carpConfig);

export default carpApi;
