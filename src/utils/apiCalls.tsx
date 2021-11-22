import Config from "../constants/app_constants.json";
import { IChat } from "./viewModels";

export const fetchChatsInfo = async () : Promise<IChat[]> => {
    const rawResp = await fetch(Config.API_URL);
    const chatInfo: IChat[] = await rawResp.json();
    return chatInfo;
}
