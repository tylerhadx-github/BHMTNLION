module.exports = {
    publicPath: '/BHMTNLION/',
    pwa: {
      name: "my-pwa-app",
      themeColor: "#624040",
      msTileColor: "#000000",
      // configure the workbox plugin
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: "service-worker.js", //path to your own service-worker file
        // ...other Workbox options...
      },
    },
}