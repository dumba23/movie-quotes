import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "@/plugins/axios/axios";

export default async function instantiatePusher() {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
    broadcaster: "pusher",
    key: "74548f405a4559cbf797",
    forceTLS: true,
    cluster: ["eu"],
    encrypted: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(
              `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              { withCredentials: true }
            )
            .then((response) => {
              callback(null, response.data);
            })
            .catch((error) => {
              callback(error);
            });
        },
      };
    },
  });

  return true;
}
