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
      <MovieInput
        type="text"
        labelName="Movie name:"
        name="title_en"
        :errorMessage="errorMessage"
        rules="required|min:5"
      />
      <MovieInput
        type="text"
        labelName="ფილმის სახელი:"
        name="title_ka"
        :errorMessage="errorMessage"
        rules="required|min:5"
      />
      <GenresInput :genres="genres" :initialValue="movie.genres" />
      <MovieInput
        type="text"
        labelName="წელი/Year:"
        name="release_date"
        :errorMessage="errorMessage"
        rules="required|numeric|min:4|max:4"
      />
      <MovieInput
        type="text"
        :labelName="$t('Director') + ':'"
        name="director_en"
        :errorMessage="errorMessage"
        rules="required|min:5"
      />
      <MovieInput
        type="text"
        labelName="რეჟისორი:"
        name="director_ka"
        :errorMessage="errorMessage"
        rules="required|min:5"
      />
      <MovieTextarea
        rules="required|min:30"
        labelName="Description:"
        name="description_en"
      />
      <MovieTextarea
        rules="required|min:30"
        labelName="აღწერა:"
        name="description_ka"
      />
      <MovieFileUpload :initialValue="movie.image" />
      <MovieSubmit name="Update movie" />
    </form>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import MovieInput from "@/components/ui/MovieInput.vue";
import MovieFileUpload from "@/components/ui/MovieFileUpload.vue";
import MovieTextarea from "@/components/ui/MovieTextarea.vue";
import MovieSubmit from "@/components/ui/MovieSubmit.vue";
import GenresInput from "@/components/ui/GenresInput.vue";
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

const { values, handleSubmit } = useForm({ initialValues: formValues });

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
    const { status, message } = error.response.data;
    if (!status) {
      errorMessage.value = message;
    }
  }
});

onBeforeMount(async () => {
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
