import axios from "@/plugins/axios/axios.js";

export const switchLanguage = async (lang) => {
  return axios.get(`/api/language/${lang}`, {
    headers: {
      "Accept-language": lang,
    },
  });
};
