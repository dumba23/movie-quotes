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
    <form @submit.prevent="submitForm">
      <InputMovie
        type="text"
        labelName="Movie name:"
        name="title_en"
        :errorMessage="errorMessage"
        rules="required|min:5|english"
      />
      <InputMovie
        type="text"
        labelName="ფილმის სახელი:"
        name="title_ka"
        :errorMessage="errorMessage"
        rules="required|min:5|georgian"
      />
      <InputGenres :genres="genres" :initialValue="movie.genres" />
      <InputMovie
        type="text"
        labelName="წელი/Year:"
        name="release_date"
        :errorMessage="errorMessage"
        rules="required|numeric|min:4|max:4"
      />
      <InputMovie
        type="text"
        labelName="Director:"
        name="director_en"
        :errorMessage="errorMessage"
        rules="required|min:5|english"
      />
      <InputMovie
        type="text"
        labelName="რეჟისორი:"
        name="director_ka"
        :errorMessage="errorMessage"
        rules="required|min:5|georgian"
      />
      <TextareaMovie
        rules="required|min:30|english"
        labelName="Description:"
        name="description_en"
      />
      <TextareaMovie
        rules="required|min:30|georgian"
        labelName="აღწერა:"
        name="description_ka"
      />
      <FileUploadMovie :initialValue="movie.image" />
      <SubmitMovie type="submit" name="Update movie" />
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
import { updateMovie } from "@/services/movies";
import { onBeforeMount, ref } from "vue";
import { getMovieGenres } from "@/services/movies";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  username: { type: String, required: true, default: "" },
  profileImageUrl: { type: String, required: true, default: "" },
  movie: { type: Object, required: true, default: () => {} },
});

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const route = useRoute();
const router = useRouter();
const formValues = {
  title_en: props.movie.title.en,
  title_ka: props.movie.title.ka,
  director_en: props.movie.director.en,
  director_ka: props.movie.director.ka,
  description_en: props.movie.description.en,
  description_ka: props.movie.description.ka,
  release_date: props.movie.release_date,
};

const { values, handleSubmit } = useForm({
  initialValues: formValues,
});

const errorMessage = ref("");
const genres = ref([]);

const submitForm = handleSubmit(async () => {
  const {
    params: { id },
  } = route;
  const data = values;

  if (data.image == undefined) {
    delete data.image;
  }

  try {
    const res = await updateMovie(data, id);
    if (res.status === 200) {
      router.push({ name: "movies" });
    }
  } catch (error) {
    return;
  }
});

onBeforeMount(async () => {
  try {
    const res = await getMovieGenres();
    if (res.status === 200) {
      genres.value = res.data.data;
    }
  } catch (error) {
    return;
  }
});
</script>
