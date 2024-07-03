export default {
  path: "/camera",
  redirect: "/camera/index",
  meta: {
    icon: "ph:video-camera-fill",
    title: "摄像头"
  },
  children: [
    {
      path: "/camera/index",
      name: "Camera",
      component: () => import("@/views/camera.vue"),
      meta: {
        title: "摄像头"
      }
    }
  ]
} satisfies RouteConfigsTable;
