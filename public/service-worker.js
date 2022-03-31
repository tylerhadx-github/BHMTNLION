const urlsToCache = [
    'https://apps.fs.usda.gov/fsgisx05/rest/services/wo_nfs_gtac/GTAC_IVMQuery_01/MapServer/1?f=json',
    'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer?f=json',
    'https://apps.fs.usda.gov/fsgisx05/rest/services/wo_nfs_gtac/GTAC_IVMQuery_01/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=PASSENGERVEHICLE_DATESOPEN&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=PASSENGERVEHICLE_DATESOPEN&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=true&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson',
    ];
    const staticCacheName = "bhmtnlion";
    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(staticCacheName).then(function(cacheV) {
          return cacheV.addAll(
            urlsToCache
          );
        })
      );
    });  
    