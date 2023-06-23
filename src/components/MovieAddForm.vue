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
    <Form @submit="(values) => handleAddMovie(values)">
      <MovieInput
        type="text"
        placeholder="Movie name"
        name="title_en"
        :errorMessage="errorMessage"
        rules="required"
      />
      <MovieInput
        type="text"
        placeholder="ფილმის სახელი"
        name="title_ka"
        :errorMessage="errorMessage"
        rules="required"
      />
      <GenresInput :genres="genres" />
      <MovieInput
        type="text"
        placeholder="წელი/Year"
        name="release_date"
        :errorMessage="errorMessage"
        rules="required"
      />
      <MovieInput
        type="text"
        placeholder="Director"
        name="director_en"
        :errorMessage="errorMessage"
        rules="required"
      />
      <MovieInput
        type="text"
        placeholder="რეჟისორი"
        name="director_ka"
        :errorMessage="errorMessage"
        rules="required"
      />
      <MovieTextarea
        rules="required"
        placeholder="Description"
        name="description_en"
      />
      <MovieTextarea
        rules="required"
        placeholder="აღწერა"
        name="description_ka"
      />
      <MovieFileUpload />
      <MovieSubmit name="Add movie" />
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import MovieInput from "@/components/ui/MovieInput.vue";
import MovieFileUpload from "@/components/ui/MovieFileUpload.vue";
import MovieTextarea from "@/components/ui/MovieTextarea.vue";
import MovieSubmit from "@/components/ui/MovieSubmit.vue";
import GenresInput from "@/components/ui/GenresInput.vue";
import { addMovie } from "@/services/movies";
import { onMounted, ref } from "vue";
import { getMovieGenres } from "@/services/movies";
import { useRouter } from "vue-router";

defineProps({
  username: { type: String, required: true, default: "" },
  profileImageUrl: { type: String, required: true, default: "" },
});

const router = useRouter();

const errorMessage = ref("");
const genres = ref([]);

const handleAddMovie = async (data) => {
  try {
    const res = await addMovie(data);
    if (res.status === 200) {
      router.push({ name: "movies" });
    }
  } catch (error) {
    const { status, message } = error.response.data;
    if (!status) {
      errorMessage.value = message;
    }
  }
};

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
