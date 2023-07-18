<template>
  <div class="p-10">
    <div class="flex items-center mb-8">
      <img
        :src="
          profileImageUrl.includes('http')
            ? profileImageUrl
            : apiUrl + '/storage/' + profileImageUrl
        "
        alt="profile"
        class="w-14 h-14 rounded-full mr-3"
      />
      <div>{{ username }}</div>
    </div>
    <form @submit.prevent="handleAddMovie">
      <InputMovie
        type="text"
        placeholder="Movie name"
        name="title_en"
        rules="required|min:5"
      />
      <InputMovie
        type="text"
        placeholder="ფილმის სახელი"
        name="title_ka"
        rules="required|min:5|georgian"
      />
      <InputGenres :genres="genres" />
      <InputMovie
        type="text"
        placeholder="წელი/Year"
        name="release_date"
        rules="required|numeric"
      />
      <InputMovie
        type="text"
        placeholder="Director"
        name="director_en"
        rules="required|min:5"
      />
      <InputMovie
        type="text"
        placeholder="რეჟისორი"
        name="director_ka"
        rules="required|min:5|georgian"
      />
      <TextareaMovie
        rules="required|min:30"
        placeholder="Description"
        name="description_en"
      />
      <TextareaMovie
        rules="required|min:30|georgian"
        placeholder="აღწერა"
        name="description_ka"
      />
      <FileUploadMovie />
      <SubmitMovie :name="$t('add_movie')" />
    </form>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import InputMovie from "@/components/ui/InputMovie.vue";
import FileUploadMovie from "@/components/ui/FileUploadMovie.vue";
import TextareaMovie from "@/components/ui/TextareaMovie.vue";
import SubmitMovie from "@/components/ui/SubmitMovie.vue";
import InputGenres from "@/components/ui/InputGenres.vue";
import { addMovie } from "@/services/movies";
import { onMounted, ref } from "vue";
import { getMovieGenres } from "@/services/movies";
import { useRouter } from "vue-router";
import { useMoviesStore } from "@/store/movies";
import i18n from "@/plugins/i18";

defineProps({
  username: { type: String, required: true, default: "" },
  profileImageUrl: { type: String, required: true, default: "" },
});

const emit = defineEmits(["closeModal"]);

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    email: "",
    title_en: "",
    title_ka: "",
    release_date: "",
    description_en: "",
    description_ka: "",
    director_en: "",
    director_ka: "",
    genreIds: "",
    image: "",
  },
});

const moviesStore = useMoviesStore();

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const router = useRouter();

const genres = ref([]);

const handleAddMovie = handleSubmit(async () => {
  try {
    const res = await addMovie(values);
    if (res.status === 201) {
      router.push({ name: "movies" });
      emit("closeModal");
      moviesStore.initializeMoviesData();
    }
  } catch (error) {
    if (!error.response.data.errors) {
      setFieldError(
        "login",
        error.response.data.message?.[i18n.global.locale.value]
      );
    } else {
      Object.keys(error.response.data.errors).forEach((key) => {
        setFieldError(key, error.response.data.errors[key]);
      });
    }
  }
});

onMounted(async () => {
  try {
    const res = await getMovieGenres();
    if (res.status === 200) {
      genres.value = res.data;
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
