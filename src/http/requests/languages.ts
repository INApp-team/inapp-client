import axios from "axios";

export const translateLanguage = async (text: string, targetLang: string) => {
    const translatedText = axios.post<string>("http://localhost:5200/translate", {
        text,
        targetLang
    });

    return translatedText;
};

export const detectLanguage = async (text: string) => {
    const detectedText = axios.post<string>("http://localhost:5200/detectLanguage", {
        text
    });

    return detectedText;
};
