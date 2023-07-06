import axios from "@/plugins/axios/axios.js";

export const getQuotesList = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/all/quotes");
};

export const getUserQuotesList = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/quotes");
};

export const getUserQuote = async (quoteId) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/quotes/" + quoteId);
};

export const addQuote = async (data) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/quotes", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateQuote = async (data, quoteId) => {
  await axios.get("/sanctum/csrf-cookie");

  const formData = new FormData();

  formData.append("_method", "PUT");

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return await axios.post("/api/quotes/" + quoteId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteQuote = async (quoteId) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.delete("/api/quotes/" + quoteId);
};

export const addCommentOnQuote = async (quoteId, data) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/quotes/" + quoteId + "/comments", data);
};

export const toggleLikeOnQuote = async (quoteId) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.post("/api/quotes/" + quoteId + "/like");
};
