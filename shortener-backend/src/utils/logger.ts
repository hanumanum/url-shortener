//TODO: implement logging to a file or external log collector like graylog, 
//second one will better if we will run multiple instances of this server

export const logData = (title: string, data: any = {}) => {
    console.log(Date.now(), title, JSON.stringify(data));
    return data;
}

export const logError = (title: string, error: Error = new Error(''), data: any = {}) => {
    console.error(Date.now(), title, error.toString(), JSON.stringify(data));
    return data;
}

export default {
    logData,
    logError
}