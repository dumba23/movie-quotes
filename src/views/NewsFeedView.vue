<template>
  <TheLoggedInHeader />
  <div class="flex justify-between text-xl text-white px-20">
    <div class="translate-x-[-1rem] w-[30%]">
      <ProfileSidebar
        :username="userStore.user.username"
        :imageUrl="userStore.user.avatar"
      />
    </div>
    <div class="relative w-full">
      <div class="flex my-6 w-[70%]">
        <button
          class="flex bg-secondary-black py-4 space-x-4 px-4 rounded-xl"
          :class="!isSearchExpanded ? 'w-full' : 'min-w-[14rem]'"
          @click="handleOpenQuoteModal"
        >
          <IconPencil /><span>Write new quote</span>
        </button>
        <NewsFeedModal v-if="paginationStore.modalName === 'newsfeed'" />
        <div
          class="flex justify-center items-center space-x-4 ml-4"
          :class="isSearchExpanded && 'w-full '"
        >
          <IconSearch />
          <input
            :placeholder="
              isSearchExpanded
                ? 'Enter @ to search movies, Enter # to search quotes'
                : 'Search by'
            "
            class="bg-transparent focus:outline-none"
            :class="isSearchExpanded ? 'w-full ' : 'max-w-[6rem]'"
            @input="handleSearchInput"
            @focus="toggleSearchExpand"
            @blur="toggleSearchExpand"
          />
        </div>
      </div>
      <div class="space-y-8" v-if="searchTerm.length === 0">
        <NewsFeedCard
          v-for="quote in quotesStore.allQuotes"
          :key="quote.id"
          :data="quote"
          :user="quote.movie.user"
        />
      </div>
      <div class="space-y-8" id="pu" v-else>
        <NewsFeedCard
          v-for="quote in searchedQuotes"
          :key="quote.id"
          :data="quote"
          :user="quote.movie.user"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheLoggedInHeader from "@/components/shared/TheLoggedInHeader.vue";
import ProfileSidebar from "@/components/ProfileSidebar.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import NewsFeedCard from "@/components/NewsFeedCard.vue";
import { useMoviesStore } from "@/store/movies";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import { useNotificationsStore } from "@/store/notifications";
import { usePaginationStore } from "@/store/pagination";
import { onMounted } from "vue";
import { ref, onBeforeUnmount } from "vue";
import { onClickOutside } from "@vueuse/core";
import { addNotification } from "@/services/notification";
import NewsFeedModal from "../components/NewsFeedModal.vue";

const userStore = useUserStore();
const quotesStore = useQuotesStore();
const moviesStore = useMoviesStore();
const paginationStore = usePaginationStore();
const notificationsStore = useNotificationsStore();

const isModalOpen = ref(false);
const isSearchExpanded = ref(false);
const target = ref(null);
const searchTerm = ref("");
const searchedQuotes = ref([]);

const toggleSearchExpand = () => {
  isSearchExpanded.value = !isSearchExpanded.value;
};

const handleSearchInput = (event) => {
  const input = event.target.value.trim();
  searchTerm.value = input;

  if (input.length > 1) {
    searchedQuotes.value = [
      ...search(input, moviesStore.movies, quotesStore.allQuotes),
    ];
  }
};

const search = (input, movies, quotes) => {
  let newQuotesArray = [];

  if (input.startsWith("@")) {
    const searchTerm = input.slice(1);
    let filteredMovies = [];
    movies.forEach((movie) => {
      if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredMovies = [...filteredMovies, movie];
      }
    });
    newQuotesArray = quotes.filter((quote) => {
      return (
        quote.movie_id ===
        filteredMovies.find((movie) => movie.id === quote.movie_id)?.id
      );
    });
  }

  if (input.startsWith("#")) {
    const searchTerm = input.slice(1);
    newQuotesArray = quotes.filter((quote) => {
      return quote.title.en.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return newQuotesArray;
};

onClickOutside(
  target,
  (event) => event.target.id !== "modal" && (isModalOpen.value = false)
);

const handleOpenQuoteModal = () => {
  paginationStore.updateModalName({ name: "newsfeed" });
};

onMounted(async () => {
  await userStore.initializeUserData();
  quotesStore.initializeAllQuotesData();
  moviesStore.initializeAllMoviesData();

  const channel = window.Echo.private(`post.${userStore.user.id}`);

  channel.listen("NewLikeEvent", async (event) => {
    if (event.like) {
      const newNotification = {
        sender_id: event.user.id,
        quote_id: event.quote.id,
        type: "like",
        message: "Reacted to your quote",
      };

      try {
        const res = await addNotification(newNotification);
        if (res.status === 200) {
          notificationsStore.initializeNotificationsData();
          quotesStore.initializeAllQuotesData();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      notificationsStore.initializeNotificationsData();
      quotesStore.initializeAllQuotesData();
    }
  });

  channel.listen("NewCommentEvent", async (event) => {
    const newNotification = {
      sender_id: event.user.id,
      quote_id: event.quote.id,
      type: "comment",
      message: "Commented to your quote",
    };

    try {
      const res = await addNotification(newNotification);
      if (res.status === 200) {
        notificationsStore.initializeNotificationsData();
        quotesStore.initializeAllQuotesData();
      }
    } catch (error) {
      console.error(error);
    }
  });
});

onBeforeUnmount(() => {
  moviesStore.clearMovieData();
});
</script>
