module.exports = {
    publicPath: '/BHMTNLION/',
    pwa: {
      name: "Black Hills Mountain Lion",
      msTileColor: "#000000",
      // configure the workbox plugin
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: "/src/registerServiceWworker.js", //path to your own service-worker file
        // ...other Workbox options...
      },
    },
}