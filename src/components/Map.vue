<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              <span class="headline">Map Filters</span>
              <v-spacer></v-spacer>
              <v-btn @click="expand = !expand">{{ btnname }}</v-btn>
            </v-card-title>
            <v-card-text v-if="expand">
              <v-switch v-model="showGfp" dense :label="`GFP`"></v-switch>
              <v-row>
                <v-col>
              <v-switch
                v-model="showSnowDepth"
                dense
                :label="`Snow Depth`"
              ></v-switch>
              </v-col>
              <v-col>
                <v-btn @click="showImage = !showImage">Snow Depth Chart</v-btn>
                <div v-if="showImage">
                  <img src="Legend.png" alt="Snow Depth Map" />
                </div>
              </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-switch
                    v-model="showCachedSnowDepth"
                    dense
                    :label="`Cached Snow Depth`"
                  ></v-switch>
                </v-col>
                <v-col>
                  {{ snowDepthDate }}
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-switch
                    v-model="showNfsmvum"
                    dense
                    :label="`Road Map`"
                  ></v-switch>
                </v-col>
                <v-col class="pt-4 mt-4">
                  <input
                    type="date"
                    id="date-picker"
                    :disabled="!showNfsmvum"
                  />
                </v-col>
                <v-col></v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4">
                  <v-switch
                    v-model="showHarvestLocations"
                    dense
                    :label="`Harvest Locations`"
                  ></v-switch>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-switch
                    v-if="showHarvestLocations"
                    v-model="showHeatmap"
                    label="Heatmap"
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-autocomplete
                    v-if="showHarvestLocations"
                    v-model="selectedYears"
                    :items="years"
                    :multiple="true"
                    label="Years"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <!-- <input type="button" id="filterButton" value="Apply Above Filters" /> -->
    <div
      id="viewDiv"
      :width="'100%'"
      style="align-content: center; height: 80vh"
    ></div>
  </div>
</template>

<script>
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Locate from "@arcgis/core/widgets/Locate";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
//import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
//import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

//import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
//import MapImage from "@arcgis/core/layers/support/MapImage";
//import DatePicker from "@arcgis/core/widgets/support/DatePicker";
//import * as heatmapRendererCreator from "@arcgis/core/smartMapping/renderers/heatmap";
/* eslint-disable no-unused-vars */
//import * as harvestLayer from "../assets/harvestLocations.js";
/* eslint-enable no-unused-vars */
const gravel = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "blue",
  width: "1.5px",
  style: "solid",
};

const hwySym = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "green",
  width: "2",
  style: "solid",
};

const notCar = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "red",
  width: "1.5px",
  style: "solid",
};

const dirtForCar = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "#ef37ac",
  width: "1.5px",
  style: "solid",
};

export default {
  components: {},
  name: "Map",
  props: {},
  data: function () {
    return {
      showImage: false,
      //roadDate: new Date(),
      expand: localStorage.getItem("expand")
        ? JSON.parse(localStorage.getItem("expand"))
        : true,
      map: null,
      view: null,
      nfsmvum: null,
      snowDepth: null,
      graphicLayer: null,
      gfp: null,
      harvestLocations: null,
      showNfsmvum: true,
      showSnowDepth: true,
      showCachedSnowDepth: true,
      showGfp: true,
      showHarvestLocations: true,
      vehicleTypes: ["Car", "ATV"],
      roadRender: {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        legendOptions: {
          title: "Road Type",
        },

        field: "SBS_SYMBOL_NAME",
        uniqueValueInfos: [
          {
            value: "Gravel Road, Suitable for Passenger Car", // code for interstates/freeways
            symbol: gravel,
            label: "Gravel Road",
          },
          {
            value: "Paved Road", // code for U.S. highways
            symbol: hwySym,
            label: "Paved Road",
          },
          {
            value: "Road, Not Maintained for Passenger Car", // code for U.S. highways
            symbol: notCar,
            label: "Not Maintained",
          },
          {
            value: "Dirt Road, Suitable for Passenger Car", // code for U.S. highways
            symbol: dirtForCar,
            label: "Dirt Road",
          },
        ],
      },
      showHeatmap: false,
      loading: false,
      valSelect: {},
      roadOpenings: [],
      atv: false,
      car: true,
      semi: false,
      bus: false,
      typeOfRoad: [],
      roadType: [
        {
          text: "Gravel Road",
          value: "Gravel Road, Suitable for Passenger Car",
          checked: true,
        },
        {
          text: "Paved Road",
          value: "Paved Road",
          checked: true,
        },
        {
          text: "Not Maintained for car",
          value: "Road, Not Maintained for Passenger Car",
          checked: true,
        },
        {
          text: "Dirt Road",
          value: "Dirt Road, Suitable for Passenger Car",
          checked: true,
        },
      ],
      snowDepthDate: null,
      years: [2017, 2016, 2015, 2014, 2013, 2012], //,2018,2019,2020
      selectedYears: [2017, 2016, 2015, 2014, 2013, 2012],
      markerExtent: {
        xmin: -105.2229798227514,
        xmax: -101.16627816259711,
        ymin: 42.929128673950856,
        ymax: 45.20055201379351,
      },
      imageUrl:
        "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A1%2C2%2C3%2C5%2C6%2C7&bbox=-11713368.533619583%2C5349926.441082417%2C-11261778.57051098%2C5602780.130649659&bboxSR=102100&imageSR=4326&size=1477%2C827&f=image",
      renderer: {
        type: "heatmap",
        colorStops: [
          { color: "rgba(63, 40, 102, 0)", ratio: 0 },
          { color: "#472b77", ratio: 0.083 },
          { color: "#4e2d87", ratio: 0.166 },
          { color: "#563098", ratio: 0.249 },
          { color: "#5d32a8", ratio: 0.332 },
          { color: "#6735be", ratio: 0.415 },
          { color: "#7139d4", ratio: 0.498 },
          { color: "#7b3ce9", ratio: 0.581 },
          { color: "#853fff", ratio: 0.664 },
          { color: "#a46fbf", ratio: 0.747 },
          { color: "#c29f80", ratio: 0.83 },
          { color: "#e0cf40", ratio: 0.913 },
          { color: "#ffff00", ratio: 1 },
        ],
        maxPixelIntensity: 25,
        minPixelIntensity: 0,
      },
      simplerRenderer: {
        type: "simple",
        symbol: {
          type: "picture-marker",
          url: "mtl.png",
          width: 8,
          height: 4,
        },
      },
      
    };
  },
  mounted() {

    this.LoadDates();
    this.LoadData();
    this.cacheSnowDepth();

  },
  methods: {
    LoadData() {
      var component = this;

      esriConfig.apiKey =
        "AAPKfe0695aa5c18433e899f8170f7fb03d5LJ9EfdgSvRhqZaT2Ldm4cCPMrHxGha7GztsZ_hVGZ6BK5HOdGt5CxAqTWO71Qlmg";

      // Add a map to the view
      this.map = new Map({
        basemap: "arcgis-imagery",
      });
      /* eslint-disable no-unused-vars */
      this.view = new MapView({
        container: "viewDiv",
        map: this.map,
        center: [-103.780928, 44.00853],
        zoom: 9,
      });
      /* eslint-enable no-unused-vars */

    
      this.nfsmvum = new GeoJSONLayer({
        url: "./nfsmvum.geojson",
        outFields: ["*"], // Return all fields so it can be queried client-side
        opacity: 0.5,
        renderer: this.roadRender,
      });
      this.snowDepth = new MapImageLayer({
        opacity: 0.5,
        url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer",
      });

      const point = new Point({
        x: -103.19455082423462,
        y: 44.070438441736194,
      });
      var useImage = false;
      if (localStorage.getItem("snowDepthImage")) {
        var snowImageBase64 = localStorage.getItem("snowDepthImage");
        useImage = true;
      }

      const symbolMarker = {
        type: "picture-marker",
        url: useImage ? snowImageBase64 : this.imageUrl,
        width: 1477,
        height: 827,
      };
      const graphicPoint = new Graphic({
        geometry: point,
        symbol: symbolMarker,
      });
      this.graphicLayer = new GraphicsLayer({
        graphics: [graphicPoint],
        opacity: 0.5,
      });

      this.gfp = new VectorTileLayer({
        opacity: 0.5,
        url: "https://tiles.arcgis.com/tiles/jWPBXspaQsJStWX8/arcgis/rest/services/Public_Lands/VectorTileServer",
      });

      this.harvestLocations = new GeoJSONLayer({
        url: "./harvestLocations.geojson",
        renderer: this.showHeatmap ? this.renderer : this.simplerRenderer,
      });

      if (localStorage.getItem("showGfp")) {
        this.showGfp = JSON.parse(localStorage.getItem("showGfp"));
      } else {
        localStorage.setItem("showGfp", this.showGfp);
      }

      if (localStorage.getItem("showSnowDepth")) {
        this.showSnowDepth = JSON.parse(localStorage.getItem("showSnowDepth"));
      } else {
        localStorage.setItem("showSnowDepth", this.showSnowDepth);
      }
      if (localStorage.getItem("showCachedSnowDepth")) {
        this.showCachedSnowDepth = JSON.parse(
          localStorage.getItem("showCachedSnowDepth")
        );
      } else {
        localStorage.setItem("showCachedSnowDepth", this.showCachedSnowDepth);
      }

      if (localStorage.getItem("showHarvestLocations")) {
        this.showHarvestLocations = JSON.parse(
          localStorage.getItem("showHarvestLocations")
        );
      } else {
        localStorage.setItem("showHarvestLocations", this.showHarvestLocations);
      }

      if (localStorage.getItem("showNfsmvum")) {
        this.showNfsmvum = JSON.parse(localStorage.getItem("showNfsmvum"));
      } else {
        localStorage.setItem("showNfsmvum", this.showNfsmvum);
      }

      if (localStorage.getItem("showHeatmap")) {
        this.showHeatmap = JSON.parse(localStorage.getItem("showHeatmap"));
      } else {
        localStorage.setItem("showHeatmap", this.showHeatmap);
      }

      if (this.showGfp) {
        this.map.add(this.gfp);
      }
      if (this.showSnowDepth) {
        this.map.add(this.snowDepth);
      }
      if (this.showCachedSnowDepth) {
        this.map.add(this.graphicLayer);
      }

      if (this.showNfsmvum) {
        if(localStorage.getItem("fsFilter")){
          this.nfsmvum.definitionExpression = localStorage.getItem("fsFilter");
        }
        this.map.add(this.nfsmvum);
      }

      if (this.showHarvestLocations) {
        this.map.add(this.harvestLocations);
      }

      this.AddDatePicker();
      
      var popupTrailheads = {
        title: "<b>Name:</b> {NAME}",
        content: this.contentChange,
      };

      this.nfsmvum.popupTemplate = popupTrailheads;

      var locateBtn = new Locate({
        view: this.view,
      });
      var searchWidget = new Search({
        view: this.view,
        popupOpenOnSelect: false,
      });

      this.view.ui.add(locateBtn, {
        position: "top-left",
      });
      this.view.ui.add(searchWidget, {
        position: "top-right",
      });
      var basemapGallery = new BasemapGallery({
        view: this.view,
        container: document.createElement("div"),
      });

      var bgExpand = new Expand({
        view: this.view,
        content: basemapGallery,
      });

      basemapGallery.watch("activeBasemap", function () {
        var mobileSize =
          this.view.heightBreakpoint === "xsmall" ||
          this.view.widthBreakpoint === "xsmall";

        if (mobileSize) {
          bgExpand.collapse();
        }
      });

      this.view.ui.add(bgExpand, "top-right");
      component.loading = false;

      const legend = new Legend({
        view: this.view,
        layerInfos: [
          {
            layer: this.snowDepth,
          },
        ],
      });
      if (!component.isMobile()) {
        this.view.ui.add(legend, "bottom-left");
      }
      var _this = this;
      this.view.watch("stationary", (newValue) => {
        if (newValue == true) {
          _this.adjustMarker();
        }
      });
    },
    async LoadDates() {
      var _this = this;
      var skip = 0;
      var doLoop = true;
      var values = [];
      while (doLoop) {
        await fetch(
          "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_MVUM_01/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=PASSENGERVEHICLE_DATESOPEN&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=PASSENGERVEHICLE_DATESOPEN&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=true&resultOffset=" +
            skip +
            "&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
          {
            method: "GET",
          }
        )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              return res.json();
            } else {
              return null;
            }
          })
          .then((response) => {
            if (!response.exceededTransferLimit) {
              doLoop = false;
            }
            skip += response.features.length;
            values = values.concat(response.features);
          })
          .catch((x) => {
            doLoop = false;
            console.log(x);
          });
      }
      if(values.length ==0){
        _this.extraParsing(JSON.parse(localStorage.getItem("fsData")), _this);      
      }else{
      localStorage.setItem("fsData", JSON.stringify(values));
      _this.extraParsing(values, _this);     
      }
      this.nfsmvum.definitionExpression = this.buildTypeStatement(new Date());
      
    },
    extraParsing(items, _this) {
      items.forEach((x) => {
        var y = x.attributes.PASSENGERVEHICLE_DATESOPEN;
        if (y) {
          //check for comma
          if (y.includes(",")) {
            var multi = y.split(",");
            multi.forEach((z) => {
              _this.parseDate(z, y);
            });
          } else {
            _this.parseDate(y, y);
          }
        }
      });
    },
       parseDate(str, fullString) {
      var d = new Date();
      //01/15-05-30
      if (str && str.includes("/")) {
        var all = str.split("-");
        var start = all[0] + "/" + d.getFullYear();
        var end = all[1] + "/" + d.getFullYear();
        var l = {
          StartDate: start,
          EndDate: end,
          FullString: fullString,
        };
        this.roadOpenings.push(l);
      }
    },

    adjustMarker() {
      const topRightScreenPt = this.view.toScreen({
        x: this.markerExtent.xmax,
        y: this.markerExtent.ymax,
        spatialReference: {
          wkid: 4326,
        },
      });
      const bottomLeftScreenPt = this.view.toScreen({
        x: this.markerExtent.xmin,
        y: this.markerExtent.ymin,
        spatialReference: {
          wkid: 4326,
        },
      });
      const newWidth = Math.abs(topRightScreenPt.x - bottomLeftScreenPt.x);
      const newHeight = Math.abs(bottomLeftScreenPt.y - topRightScreenPt.y);

      var useImage = false;
      if (localStorage.getItem("snowDepthImage")) {
        var snowImageBase64 = localStorage.getItem("snowDepthImage");
        useImage = true;
      }

      this.graphicLayer.graphics.items[0].symbol = {
        type: "picture-marker",
        url: useImage ? snowImageBase64 : this.imageUrl,
        width: newWidth > 0 ? newWidth + "px" : 1,
        height: newHeight > 0 ? newHeight + "px" : 1,
      };
    },
    setFeatureLayerFilter(expression) {
      this.nfsmvum.definitionExpression = "";
      this.nfsmvum.definitionExpression = expression;
      localStorage.setItem("fsFilter", expression);
    },
    AddDatePicker() {
      var _this = this;
      /* eslint-disable no-unused-vars */

      const observer = new MutationObserver((mutations, obs) => {
          const dp = document.getElementById("date-picker");
          if(dp){
var MyDate = new Date();
        var MyDateString;
        MyDate.setDate(MyDate.getDate());

        MyDateString =
          MyDate.getFullYear() +
          "-" +
          ("0" + (MyDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + MyDate.getDate()).slice(-2);
      dp.value = MyDateString;
      dp.defaultValue = MyDateString;

       dp.addEventListener("change", function (event) {
        //update year
        var d = new Date(event.target.value);
        _this.updateYear(d);
        var where = _this.buildTypeStatement(d);
        _this.setFeatureLayerFilter(where);
      });
          }
      });
      observer.observe(document, {
  childList: true,
  subtree: true
});
/* eslint-enable no-unused-vars */

     
    },
 
    buildTypeStatement(filterDate) {
      var str = "";
      //TWOWD_GT50INCHES
      //TRACKED_OHV_LT50INCHES
      //TRACKED_OHV_GT50INCHES
      //PASSENGERVEHICLE
      //OTHER_OHV_LT50INCHES
      //OTHER_OHV_GT50INCHES
      //OTHERWHEELED_OHV
      //MOTORHOME
      //MOTORCYCLE
      //HIGHCLEARANCEVEHICLE
      //FOURWD_GT50INCHES

      if (this.typeOfRoad && this.typeOfRoad.length > 0) {
        str = "(";
        this.typeOfRoad.forEach((x) => {
          if (str.length > 1) {
            str += " or ";
          }
          str += "SBS_SYMBOL_NAME = '" + x + "'";
        });
        str += ")";
      }

      if (this.atv) {
        if (str.length > 0) {
          str += " and ";
        }
        var finished = this.buildWhereByType("ATV_DATESOPEN", filterDate);
        str += "ATV = 'open' and " + finished;
      }

      if (this.bus) {
        if (str.length > 0) {
          str += " and ";
        }
        var finished1 = this.buildWhereByType("BUS_DATESOPEN", filterDate);
        str += "BUS = 'open' and " + finished1;
      }

      if (this.car) {
        if (str.length > 0) {
          str += " and ";
        }
        var finished2 = this.buildWhereByType(
          "PASSENGERVEHICLE_DATESOPEN",
          filterDate
        );
        str += "PASSENGERVEHICLE = 'open' and " + finished2;
      }

      if (this.semi) {
        if (str.length > 0) {
          str += " and ";
        }
        var finished3 = this.buildWhereByType("TRUCK_DATESOPEN", filterDate);
        str += "TRUCK = 'open' and " + finished3;
      } 

      return str;
    },
    buildWhereByType(type, filterDate) {
      var w = "(";
      // if (this.roadOpenings.length == 0 && localStorage.getItem("this.roadOpenings")) {
      //   this.roadOpenings = JSON.parse(localStorage.getItem("this.roadOpenings"));
      // }
      var todayFilter = this.roadOpenings.filter(
        (x) =>
          new Date(x.StartDate) <= filterDate &&
          new Date(x.EndDate) >= filterDate
      );
      todayFilter.forEach((x) => {
        w += type + " = '" + x.FullString + "' or ";
      });
      w = w.slice(0, -3);
      w = w + ")";
      return w;
    },
    updateYear(d) {
      // if (this.roadOpenings.length == 0 && localStorage.getItem("this.roadOpenings")) {
      //   this.roadOpenings = JSON.parse(localStorage.getItem("this.roadOpenings"));
      // }
      this.roadOpenings.forEach((x) => {
        x.StartDate = x.StartDate.slice(0, -4) + d.getFullYear();
        x.EndDate = x.EndDate.slice(0, -4) + d.getFullYear();
      });
    },
 
    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    contentChange() {
      return "<b>Road Number: {FIELD_ID}</b> \
                                <br><b>Miles: {GIS_MILES}</b> \
                                <br><b>ATV: {ATV}</b> \
                                <br><b>ATV Dates Open: {ATV_DATESOPEN}</b> \
                                <br><b>Car: {PASSENGERVEHICLE}</b> \
                                <br><b>Car Dates Open: {PASSENGERVEHICLE_DATESOPEN}</b> \
                                <br><b>Bus: {BUS}</b> \
                                <br><b>Bus Dates Open: {BUS_DATESOPEN}</b> \
                                <br><b>Semi: {TRUCK}</b> \
                                <br><b>Semi Dates Open: {TRUCK_DATESOPEN}</b> \
                                <br><b>Road Type: {SURFACETYPE}</b> \
                                <br><b>SBS_SYMBOL_NAME: {SBS_SYMBOL_NAME}</b> \
                                <br><b>Difficulty: {OPERATIONALMAINTLEVEL}</b><br>";
    },
    cacheSnowDepth() {
      if (localStorage.getItem("snowDepthDate")) {
        this.snowDepthDate = localStorage.getItem("snowDepthDate");
      } else {
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setDate(yesterday.getDate() - 1);
        this.snowDepthDate = yesterday;
      }

      if (!this.isToday(this.snowDepthDate)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          localStorage.setItem("snowDepthImage", base64data);
          localStorage.setItem("snowDepthDate", new Date());

          console.log(base64data);
        };

        (async () => {
          const response = await fetch(this.imageUrl);
          const imageBlob = await response.blob();
          reader.readAsDataURL(imageBlob);
        })();
      }
    },
    isToday(dateParameter) {
      var today = new Date();
      dateParameter = new Date(dateParameter);
      return (
        dateParameter.getDate() === today.getDate() &&
        dateParameter.getMonth() === today.getMonth() &&
        dateParameter.getFullYear() === today.getFullYear()
      );
    },
  },
  watch: {
    roadType() {
      this.typeOfRoad = [];
      this.roadType
        .filter((x) => x.checked == true)
        .forEach((x) => {
          this.typeOfRoad.push(x.value);
        });
    },
    showGfp() {
      localStorage.setItem("showGfp", JSON.stringify(this.showGfp));
      if (this.showGfp && this.map != null) {
        this.map.add(this.gfp);
        return true;
      } else {
        this.map.remove(this.gfp);
        return false;
      }
    },
    showNfsmvum() {
      localStorage.setItem("showNfsmvum", JSON.stringify(this.showNfsmvum));
      if (this.showNfsmvum && this.map != null) {
        this.map.add(this.nfsmvum);
        return true;
      } else {
        this.map.remove(this.nfsmvum);
        return false;
      }
    },
    showSnowDepth() {
      localStorage.setItem("showSnowDepth", JSON.stringify(this.showSnowDepth));
      if (this.showSnowDepth && this.map != null) {
        this.map.add(this.snowDepth);
        return true;
      } else {
        this.map.remove(this.snowDepth);
        return false;
      }
    },
    showHarvestLocations() {
      localStorage.setItem(
        "showHarvestLocations",
        JSON.stringify(this.showHarvestLocations)
      );
      if (this.showHarvestLocations && this.map != null) {
        this.map.add(this.harvestLocations);
        return true;
      } else {
        this.map.remove(this.harvestLocations);
        return false;
      }
    },
    showCachedSnowDepth() {
      localStorage.setItem(
        "showCachedSnowDepth",
        JSON.stringify(this.showCachedSnowDepth)
      );
      if (this.showCachedSnowDepth && this.map != null) {
        const topRightScreenPt = this.view.toScreen({
          x: this.markerExtent.xmax,
          y: this.markerExtent.ymax,
          spatialReference: {
            wkid: 4326,
          },
        });
        const bottomLeftScreenPt = this.view.toScreen({
          x: this.markerExtent.xmin,
          y: this.markerExtent.ymin,
          spatialReference: {
            wkid: 4326,
          },
        });
        const newWidth = Math.abs(topRightScreenPt.x - bottomLeftScreenPt.x);
        const newHeight = Math.abs(bottomLeftScreenPt.y - topRightScreenPt.y);
        const point = new Point({
          x: -103.19455082423462,
          y: 44.070438441736194,
        });
        var useImage = false;
        if (localStorage.getItem("snowDepthImage")) {
          var snowImageBase64 = localStorage.getItem("snowDepthImage");
          useImage = true;
        }

        const symbolMarker = {
          type: "picture-marker",
          url: useImage ? snowImageBase64 : this.imageUrl,
          width: newWidth > 0 ? newWidth + "px" : 1,
          height: newHeight > 0 ? newHeight + "px" : 1,
        };

        const graphicPoint = new Graphic({
          geometry: point,
          symbol: symbolMarker,
        });
        this.graphicLayer = new GraphicsLayer({
          graphics: [graphicPoint],
          opacity: 0.5,
        });
        this.map.add(this.graphicLayer);
        return true;
      } else {
        this.map.remove(this.graphicLayer);
        return false;
      }
    },
    showHeatmap() {
      localStorage.setItem("showHeatmap", JSON.stringify(this.showHeatmap));

      if (this.showHeatmap && this.map != null) {
        this.harvestLocations.renderer = this.renderer;
      } else {
        this.harvestLocations.renderer = this.simplerRenderer;
      }
    },
    selectedYears() {
      var buildcsv = "(";
      this.selectedYears.forEach((x, i) => {
        if (i !== 0) {
          buildcsv += " or ";
        }
        buildcsv += "Year = '" + x + "'";
      });
      buildcsv += ")";
      this.harvestLocations.definitionExpression = buildcsv; // "( Year in (" + buildcsv.substring(0,buildcsv.length -1)+ ")";
    },
    expand() {
      localStorage.setItem("expand", JSON.stringify(this.expand));
    },
    roadOpenings(){

    },

  },
  computed: {
    btnname: function () {
      if (this.expand) {
        return "Collapse";
      } else {
        return "Expand";
      }
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
