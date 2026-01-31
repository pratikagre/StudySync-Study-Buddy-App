<template>
  <div>
    <h2>🎵 Music Recommendation</h2>

    <select v-model="mood" @change="fetchMusic">
      <option value="study">Study</option>
      <option value="happy">Happy</option>
      <option value="sad">Sad</option>
    </select>

    <p v-if="loading">Loading tracks...</p>
    <p v-if="error" style="color:red">{{ error }}</p>

    <ul v-if="tracks.length">
      <li v-for="track in tracks" :key="track.spotify_url">
        <strong>{{ track.name }}</strong> — {{ track.artist }}
        <br />

        <!-- Spotify player -->
        <iframe
          v-if="track.spotify_url"
          :src="embedUrl(track.spotify_url)"
          width="100%"
          height="80"
          frameborder="0"
          allow="encrypted-media"
        ></iframe>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      mood: "study",
      tracks: [],
      loading: false,
      error: null,
    };
  },

  mounted() {
    this.fetchMusic();
  },

  methods: {
    async fetchMusic() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get(`/music?mood=${this.mood}`);
        this.tracks = response.data;
      } catch (err) {
        this.error = "Failed to load music recommendations";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    embedUrl(spotifyUrl) {
      // Convert normal spotify link → embed link
      return spotifyUrl.replace(
        "https://open.spotify.com/",
        "https://open.spotify.com/embed/"
      );
    },
  },
};
</script>
