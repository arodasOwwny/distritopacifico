<template>
  <div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    let utm_source = url.searchParams.get("utm_source") || '';
    let utm_medium = url.searchParams.get("utm_medium") || '';
    let utm_campaign = url.searchParams.get("utm_campaign") || '';
    let utm_id = url.searchParams.get("utm_id") || '';
    let utm_term = url.searchParams.get("utm_term") || '';
    let utm_content = url.searchParams.get("utm_content") || '';
    const payload = {
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_id: utm_id,
      utm_term: utm_term,
      utm_content: utm_content,
    };
    this.$store.commit("ui/UTMS", payload);
  },
};
</script>

<style lang="css">
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #d9d1c6;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1c3b6d;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1c3b6d;
}
</style>