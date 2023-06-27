import axios from "@/plugins/axios/axios.js";

export const getUserMoviesList = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/movies");
};

export const getUserMovie = async (movieId) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/movies/" + movieId);
};

export const addMovie = async (data) => {
  await axios.get("/sanctum/csrf-cookie");

  return axios.post(`/api/movies`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateMovie = async (data, movieId) => {
  await axios.get("/sanctum/csrf-cookie");

  const formData = new FormData();

  formData.append("_method", "PUT");

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "object") {
      data[key].forEach((value) => {
        formData.append(`${key}[]`, value);
      });
    } else formData.append(key, data[key]);
  });

  return await axios.post("/api/movies/" + movieId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteMovie = async (movieId) => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.delete("/api/movies/" + movieId);
};

export const getMovieGenres = async () => {
  await axios.get("/sanctum/csrf-cookie");
  return await axios.get("/api/genres");
};
