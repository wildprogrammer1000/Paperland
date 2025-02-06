import { Client } from "@heroiclabs/nakama-js";
import { createContext, useContext, useEffect, useState } from "react";
import { nakamaConfig } from "../constants/config";
import { setNkm } from "../api/functions";

const NakamaContext = createContext();

const NakamaProvider = ({ children }) => {
  const [client, setClient] = useState();
  const login = async (id, callback) => {
    const session = await client.authenticateCustom(id, true);
    const account = await client.getAccount(session);
    console.log(account);
    setNkm(client, session);
    callback(account);
  };
  useEffect(() => {
    const initialize = async () => {
      const client = new Client(
        nakamaConfig.serverkey,
        nakamaConfig.host,
        nakamaConfig.port,
        nakamaConfig.useSSL === "true"
      );
      setClient(client);
      console.log("nakama initialized");
    };
    initialize();
  }, []);

  return (
    <NakamaContext.Provider value={{ client, login }}>
      {children}
    </NakamaContext.Provider>
  );
};
export const useNakama = () => {
  const context = useContext(NakamaContext);
  if (!context) {
    throw new Error("useNakama must be used within a NakamaProvider");
  }
  return context;
};
export default NakamaProvider;
