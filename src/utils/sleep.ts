
export const sleep = async (timeSec: number): Promise<boolean> => {
    return new Promise(resolve => setTimeout(resolve, timeSec * 1000));
}