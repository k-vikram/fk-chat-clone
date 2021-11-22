
export interface IChat {
    id: number;
    title: string;
    imageURL: string;
    orderId: string;
    latestMessageTimestamp: number;
    messageList: IMessage[];
}

export interface IMessage {
    messageId: string;
    message: string;
    timestamp: number;
    sender: "BOT" | "USER";
    messageType: "text" | "optionedMessage";
    options? : IOptions[];
}

export interface IOptions{
    optionText: string;
    optionSubText? : string;
}

export type IWindowProps = {
    selectedChat: IChat;
    setSelectedChat?: () => void;
    loaderText? : boolean;
    allChatItems?: IChat[];
    selectThisChat?: (chat: IChat) => void;
}
