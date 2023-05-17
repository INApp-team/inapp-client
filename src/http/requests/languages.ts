import $api from "../index";

export const translateLanguage = async (text: string, targetLang: string) => {
    const translatedText = $api.post<string>(`${process.env.REACT_APP_API_URL}/translate`, {
        text,
        targetLang
    });

    return translatedText;
};

export const detectLanguage = async (text: string) => {
    const detectedText = $api.post<string>(`${process.env.REACT_APP_API_URL}/detectLanguage`, {
        text
    });

    return detectedText;
};
