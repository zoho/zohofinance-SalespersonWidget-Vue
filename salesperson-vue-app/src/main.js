import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;

async function initializeApp() {  
  if (window.ZFAPPS) {
    window.ZFAPPS.extension.init().then(async (zapp) => {
      window.ZFAPPS.invoke("RESIZE", { width: "550px", height: "600px" });
      const organizationMap = await window.ZFAPPS.get("organization");
      const { organization: { api_root_endpoint } } = organizationMap;
      window.zapp = zapp;
      // Store the data globally 
      Vue.prototype.$appMeta = {
        organizationMap:JSON.stringify(organizationMap),
        domainURL: api_root_endpoint,
        connection_link_name:"salesperson_commission_books",// created in the sigma developer portal
        orgVariablePlaceholder:"vl__u76nt_data_store", // paste the placeholder created in the sigma developer portal 
      };
      new Vue({
        zapp: zapp,
        router,
        ZFAPPS: window.ZFAPPS,
        render: h => h(App),
      

      }).$mount("#app");
    });
  }
}
initializeApp();


