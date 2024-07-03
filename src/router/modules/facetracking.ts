export default {
  path: "/facetracking",
  redirect: "/facetracking/index",
  meta: {
    icon: "iconamoon:neutral-face-fill",
    title: "人脸追踪"
  },
  children: [
    {
      path: "/facetracking/index",
      name: "FaceTracking",
      component: () => import("@/views/facetracking.vue"),
      meta: {
        title: "人脸追踪"
      }
    }
  ]
} satisfies RouteConfigsTable;
