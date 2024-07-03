export default {
  path: "/videocryption",
  redirect: "/videocryption/index",
  meta: {
    icon: "iconamoon:folder-video-fill",
    title: "视频加解密"
  },
  children: [
    {
      path: "/videocryption/index",
      name: "Videocryption",
      component: () => import("@/views/videocryption.vue"),
      meta: {
        title: "视频加解密"
      }
    }
  ]
} satisfies RouteConfigsTable;
