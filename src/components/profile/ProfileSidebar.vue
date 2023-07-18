<template>
  <div
    class="max-w-md py-6 flex flex-col justify-between space-y-8 relative sm:text-sm"
  >
    <div>
      <ProfileSidebarField>
        <template #icon>
          <img
            :src="
              imageUrl.includes('http')
                ? imageUrl
                : apiUrl + '/storage/' + imageUrl
            "
            alt="profile"
            class="w-14 h-14 rounded-full sm:w-8 sm:h-8"
            :class="
              route.name === 'profile' && 'border border-2 border-primary-red'
            "
          />
        </template>
        <template #text>
          <div class="text-white flex flex-col">
            <div class="">{{ username }}</div>
            <a href="/profile" class="">{{ $t("edit_your_profile") }}</a>
          </div>
        </template>
      </ProfileSidebarField>
    </div>
    <div>
      <ProfileSidebarField>
        <template #icon>
          <IconNewsFeed
            url="/news-feed"
            :color="route.name === 'news' ? '#E31221' : '#FFF'"
          />
        </template>
        <template #text>
          <RouterLink to="/news-feed" class="text-white cursor-pointer">
            {{ $t("news_feed") }}
          </RouterLink>
        </template>
      </ProfileSidebarField>
    </div>
    <div>
      <ProfileSidebarField>
        <template #icon>
          <IconMovies
            url="/movies"
            :color="route.name.includes('movie') ? '#E31221' : '#FFF'"
          />
        </template>
        <template #text>
          <RouterLink
            to="/movies"
            class="text-white flex flex-col cursor-pointer"
          >
            {{ $t("list_of_movies") }}
          </RouterLink>
        </template>
      </ProfileSidebarField>
    </div>
  </div>
</template>

<script setup>
import ProfileSidebarField from "@/components/profile/ProfileSidebarField.vue";
import IconMovies from "@/components/icons/IconMovies.vue";
import IconNewsFeed from "@/components/icons/IconNewsFeed.vue";
import { RouterLink, useRoute } from "vue-router";

defineProps({
  username: { type: String, required: true, default: "" },
  imageUrl: { type: String, required: true, default: "" },
  isActive: { type: Boolean, required: true, default: false },
});

const route = useRoute();
const apiUrl = import.meta.env.VITE_API_BASE_URL;
</script>
