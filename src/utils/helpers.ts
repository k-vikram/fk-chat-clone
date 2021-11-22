import { IMessage } from "./viewModels";

export const getLatestChatMessage = (messageList: IMessage[]): string => {
    const messageLength = messageList.length;
    return messageList.sort((a, b) => a.timestamp - b.timestamp)[messageLength - 1]?.message || "";
}


export const gethhmmFormat = (timestamp: number): string => {
    const dateObj = new Date(timestamp);
    const hrVal = dateObj.getHours();

    let mmVal: string = (dateObj.getMinutes() + 1).toString();
    mmVal = mmVal.length === 1 ? '0' + mmVal : mmVal;

    let amOrPm = 'am';
    let hhVal: string | number = hrVal;
    if (hrVal > 12) {
        hhVal = hrVal - 12;
        amOrPm = 'pm'
    } else if(hrVal.toString().length === 1){
        hhVal = '0' + hrVal;
    }
    return `${hhVal}:${mmVal} ${amOrPm}`;
}