<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <span class="headline">Road Opening By Date</span>
            </v-card-title>
            <v-card-text>
             <!-- <v-switch v-model="atv"  :label="`ATV`"></v-switch>
              <v-switch v-model="car"  :label="`Car`"></v-switch>-->
              
              <v-row>
                <v-col><input type="date" id="date-picker" /></v-col>
                <v-col></v-col>
                </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- <v-col  cols="12" md="4">
          <v-card>
            <v-card-title>
              <span class="headline">Road Type</span>
            </v-card-title>
            <v-card-text>
              <div v-for="r in roadType" :key="r.value">
                <v-switch v-model="r.checked" :label="r.text"></v-switch>
              </div>
            </v-card-text>
          </v-card>
        </v-col> -->
        <v-col  cols="12" md="6">
          <v-card>
            <v-card-title>
              <span class="headline">Map Layers</span>
            </v-card-title>
            <v-card-text>
              <v-switch v-model="showGfp" dense :label="`GFP`"></v-switch>
              <v-switch
                v-model="showSnowDepth"
                dense
                :label="`Snow Depth`"
              ></v-switch>
              <v-switch
                v-model="showNfsmvum"
                dense
                :label="`Road Map`"
              ></v-switch> 
              <v-switch
              
                v-model="showHarvestLocations"
                dense
                :label="`Harvest Locations`"
              ></v-switch>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <input type="button" id="filterButton" value="Apply Above Filters" />
    
    <div
      id="viewDiv"
      :width="'100%'"
      style="align-content: center; height: 75vh"
    ></div>
  </div>
</template>

<script>
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
//import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
//import MapImage from "@arcgis/core/layers/support/MapImage";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Locate from "@arcgis/core/widgets/Locate";
//import DatePicker from "@arcgis/core/widgets/support/DatePicker";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

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
      map: null,
      view: null,
      nfsmvum: null,
      snowDepth: null,
      gfp: null,
      harvestLocations: null,
      showNfsmvum: true,
      showSnowDepth: true,
      showGfp: true,
      showHarvestLocations: true,
      vehicleTypes:['Car','ATV'],
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

    };
  },
  mounted() {
    this.LoadDates();
    this.LoadData();
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

      //this.nfsmvum = new FeatureLayer({
      //  url: "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_MVUM_01/MapServer/1",
      //  //url: "https://apps.fs.usda.gov/fsgisx05/rest/services/wo_nfs_gtac/GTAC_IVMQuery_01/MapServer/1",
      //  outFields: ["*"], // Return all fields so it can be queried client-side
      //  opacity: 0.5,
      //  renderer: this.roadRender,
      //});
      this.nfsmvum = new GeoJSONLayer({
        url: "./nfsmvum.geojson",
        outFields: ["*"], // Return all fields so it can be queried client-side
        opacity: 0.5,
        renderer: this.roadRender,
      })
      this.snowDepth = new MapImageLayer({
        opacity: 0.5,
        url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer",
      });
      //mapimage in 4.0 is not added to adding to imagelayer :(
      //this.snowDepthImage = new MapImage({
      //  url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer/export?dpi=96&transparent=true&format=png32&layers=show:3&bbox=-11718273.723811839,5348624.255024849,-11266683.760703236,5601477.944592091&bboxSR=102100&imageSR=102100&size=1477,827&f=image",
      //});
      //this.snowDepth.addImage(this.snowDepthImage);

      this.gfp = new VectorTileLayer({
        opacity: 0.5,
        url: "https://tiles.arcgis.com/tiles/jWPBXspaQsJStWX8/arcgis/rest/services/Public_Lands/VectorTileServer",
      });

      this.harvestLocations = new GeoJSONLayer({
        url: "./harvestLocations.geojson",
      });

      this.map.add(this.snowDepth);
      this.map.add(this.gfp);
      this.map.add(this.nfsmvum);
      this.map.add(this.harvestLocations);

      this.AddFilterButton();
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
    },
    LoadDates() {
      var _this = this;
      fetch(
        //"https://apps.fs.usda.gov/fsgisx05/rest/services/wo_nfs_gtac/GTAC_IVMQuery_01/MapServer/1
        //https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_MVUM_01/MapServer/1
        "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_MVUM_01/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=PASSENGERVEHICLE_DATESOPEN&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=PASSENGERVEHICLE_DATESOPEN&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=true&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson",
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
          response.features.forEach((x) => {
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

          var d = new Date();
          _this.updateYear(d);
          _this.buildTypeStatement(d);
        })
        .catch((error) => {
          throw Error(error);
        });
    },

    AddFilterButton() {
      var _this = this;
      var btn = document.getElementById("filterButton");
      btn.setAttribute("class", "esri-widget esri-button");
      btn.setAttribute(
        "style",
        "width: 200px; font-family: Avenir Next W00; font-size: 1em;"
      );
      this.view.ui.add(btn, "top-right");
      btn.addEventListener("click", function () {
        var d = new Date(document.getElementById("date-picker").value);
        _this.updateYear(d);
        var where = _this.buildTypeStatement(d);
        _this.setFeatureLayerFilter(where);
      });
    },
    setFeatureLayerFilter(expression) {
      this.nfsmvum.definitionExpression = expression;
    },
    AddDatePicker() {
      var _this = this;

      var dp = document.getElementById("date-picker");
      dp.setAttribute("class", "esri-widget esri-date-picker");
      dp.setAttribute(
        "style",
        "width: 200px; font-family: Avenir Next W00; font-size: 1em;"
      );
      var d = new Date();

      dp.value = this.formatDate(d);

      dp.addEventListener("change", function (event) {
        //update year
        var d = new Date(event.target.value);
        _this.updateYear(d);
        _this.buildTypeStatement(d);
      });
      //this.view.ui.add(dp, "top-right");
    },

    buildTypeStatement(filterDate) {
      var str = "";
      this.nfsmvum.definitionExpression = str;
      this.map.remove(this.nfsmvum);
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
        // str += ")";
      } else {
        //str += "ATV <> 'open'";
      }
      if (this.bus) {
        if (str.length > 0) {
          str += " and ";
        }
        var finished1 = this.buildWhereByType("BUS_DATESOPEN", filterDate);
        str += "BUS = 'open' and " + finished1;
      } else {
        //if (str.length > 0) {
        //    str += " and ";
        //}
        //str += "BUS <> 'open'";
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
        //str += ")";
      } else {
        //if (str.length > 0) {
        //    str += " and ";
        //}
        //str += "PASSENGERVEHICLE <> 'open'";
      }

      if (this.semi) {
        if (str.length > 0) {
          str += " and ";
        }
        var finished3 = this.buildWhereByType("TRUCK_DATESOPEN", filterDate);
        str += "TRUCK = 'open' and " + finished3;
        //str += ")";
      } else {
        //if (str.length > 0) {
        //    str += " and ";
        //}
        //str += "TRUCK <> 'open'";
      }
      
      this.nfsmvum.definitionExpression = str;
      this.map.add(this.nfsmvum);
    },
    buildWhereByType(type, filterDate) {
      var w = "(";
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
      this.roadOpenings.forEach((x) => {
        x.StartDate = x.StartDate.slice(0, -4) + d.getFullYear();
        x.EndDate = x.EndDate.slice(0, -4) + d.getFullYear();
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
    formatDate(date) {
      return [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join("-");
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
      if (this.showGfp && this.map != null) {
        this.map.add(this.gfp);
        return true;
      } else {
        this.map.remove(this.gfp);
        return false;
      }
    },
    showNfsmvum() {
      if (this.showNfsmvum && this.map != null) {
        this.map.add(this.nfsmvum);
        return true;
      } else {
        this.map.remove(this.nfsmvum);
        return false;
      }
    },
    showSnowDepth() {
      if (this.showSnowDepth && this.map != null) {
        this.map.add(this.snowDepth);
        return true;
      } else {
        this.map.remove(this.snowDepth);
        return false;
      }
    },
    showHarvestLocations() {
      if (this.showHarvestLocations && this.map != null) {
        this.map.add(this.harvestLocations);
        return true;
      } else {
        this.map.remove(this.harvestLocations);
        return false;
      }
    },
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
