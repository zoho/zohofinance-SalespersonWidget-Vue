<template>
  <div class="home">
    <loader-vue v-if="isloading"></loader-vue>
    <div v-if="isVisible">
      <h4 class="heading">
        When do you wish to create the expenses Sales Person Commissions ?
      </h4>
      <div class="flex-row">
        <radiobutton-vue
          id="sent-radio"
          label="When an Invoice is Sent"
          :name="invoiceStatusRadioGroupName"
          :checked="status"
          value="sent"
          @update:selectedValue="status = $event"
        />
        <radiobutton-vue
          id="paid-radio"
          label="When an Invoice is Paid"
          :name="invoiceStatusRadioGroupName"
          :checked="status"
          value="paid"
          @update:selectedValue="status = $event"
        />
      </div>
      <div class="container">
        <div class="container">
          <h5 class="side-heading">Commission Type</h5>
          <div class="flex-row">
            <radiobutton-vue
              id="percentage-radio"
              label="Percentage"
              :name="comissionTypeRadioGroupName"
              :checked="type"
              value="Percentage"
              @update:selectedValue="type = $event"
            />
            <radiobutton-vue
              id="amount-radio"
              label="Amount"
              :name="comissionTypeRadioGroupName"
              :checked="type"
              value="Amount"
              @update:selectedValue="type = $event"
            />
          </div>
        </div>
        <div class="container">
          <h5 class="side-heading">Commission Rate</h5>
          <input-vue
            width="w-25"
            :label="type"
            v-model="commission"
            type="number"
          />
        </div>
        <div class="container" v-if="status === 'sent'">
          <h5 class="side-heading">
            Select the paid through account for expense created
          </h5>
          <dropdown-vue :title="paidAccountlabel" :width="dropdown_width">
            <dropdown-container-vue :max_height="dropdown_maxHeight">
              <dropdown-item-vue
                v-for="(option, index) in paidAccountArray"
                :key="index"
                :value="option.id"
                :label="option.text"
                @custom-event="handlePaidAccountCustomEvent"
                :updatedValue="paid_account_id"
              >
              </dropdown-item-vue>
            </dropdown-container-vue>
          </dropdown-vue>
        </div>
        <div class="container">
          <h5 class="side-heading">Select the expense account</h5>
          <dropdown-vue :title="expenseAccountlabel" :width="dropdown_width">
            <dropdown-container-vue :max_height="dropdown_maxHeight">
              <dropdown-item-vue
                v-for="(option, index) in expenseAccountArray"
                :key="index"
                :value="option.id"
                :label="option.text"
                @custom-event="handleExpenseAccountCustomEvent"
                :updatedValue="expense_account_id"
              >
              </dropdown-item-vue>
            </dropdown-container-vue>
          </dropdown-vue>
        </div>
        <div class="container">
          <h5 class="side-heading">Commission Specification</h5>
          <div class="flex-row">
            <radiobutton-vue
              id="subtotal-radio"
              label="Commission on SubTotal"
              :name="specificationRadioGroupName"
              :checked="specification_type"
              value="SubTotal"
              @update:selectedValue="specification_type = $event"
            />
            <radiobutton-vue
              id="total-radio"
              label="Commission on Total"
              :name="specificationRadioGroupName"
              :checked="specification_type"
              value="Total"
              @update:selectedValue="specification_type = $event"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import inputVue from "@/components/input.vue";
import radiobuttonVue from "@/components/radiobutton.vue";
import dropdownContainerVue from "@/components/Dropdown/dropdownContainer.vue";
import dropdownItemVue from "@/components/Dropdown/dropdownItem.vue";
import dropdownVue from "@/components/Dropdown/dropdown.vue";
import loaderVue from "@/components/loaderComponent.vue";

export default {
  name: "HomeView",
  components: {
    inputVue,
    radiobuttonVue,
    dropdownVue,
    dropdownContainerVue,
    dropdownItemVue,
    loaderVue,
  },
  data() {
    return {
      isloading: true,
      isVisible: false,
      status: "sent",
      invoiceStatusRadioGroupName: "invoiceStatusGroup",
      type: "Percentage",
      comissionTypeRadioGroupName: "comissionTypeGroup",
      commission: "",
      paidAccountArray: [],
      expenseAccountArray: [],
      dropdown_width: "250px",
      dropdown_maxHeight: "180px",
      paidAccountlabel: "Select",
      expenseAccountlabel: "Select",
      paid_account_id: "",
      expense_account_id: "",
      specification_type: "SubTotal",
      specificationRadioGroupName: "specificationGroup",
    };
  },

  methods: {
    handlePaidAccountCustomEvent(event) {
      this.paid_account_id = event.target.getAttribute("value");
      this.paidAccountlabel = event.target.getAttribute("label");
    },
    handleExpenseAccountCustomEvent(event) {
      this.expense_account_id = event.target.getAttribute("value");
      this.expenseAccountlabel = event.target.getAttribute("label");
    },
  },
  created: async function () {
    let { organization } = JSON.parse(this.$appMeta.organizationMap);
    let domainURL = this.$appMeta.domainURL;
    let orgVariablePlaceholder = this.$appMeta.orgVariablePlaceholder;

    // Methods 

    // Error Notification 
    let showErrorNotification = async (msg) => {
      await window.ZFAPPS.invoke("SHOW_NOTIFICATION", {
        type: "error",
        message: msg,
      });
    };

    // GET Paid Through Account 
    let getPaidThroughAccount = async () =>{

      try {
        // GET the Paid Through Account
        let getPaidThroughAccount = {
          url: `${domainURL}/autocomplete/paidthroughaccountslist`,
          method: "GET",
          url_query: [
            {
              key: "organization_id",
              value: organization.organization_id,
            },
          ],
          connection_link_name: this.$appMeta.connection_link_name,
        };
        let {
          data: { body },
        } = await window.ZFAPPS.request(getPaidThroughAccount);
        let { results } = JSON.parse(body);
        this.paidAccountArray = results;
      } catch (err) {
        await showErrorNotification(err);
      }
    };

    // GET Expense Account 
    let getExpenseAccount = async ()=>{

      try {
        //GET Expense Account
        let getExpenseAccount = {
          url: `${domainURL}/autocomplete/expenseaccountslist`,
          method: "GET",
          url_query: [
            {
              key: "organization_id",
              value: organization.organization_id,
            },
          ],
          connection_link_name: this.$appMeta.connection_link_name,
        };
        let {
          data: { body },
        } = await window.ZFAPPS.request(getExpenseAccount);
        let { results } = JSON.parse(body);
        this.expenseAccountArray = results;
      } catch (err) {
        await showErrorNotification(err);

      }
    };

    //  GET Global Fields 
    let getOrgVariable = async ()=>{

      try {
        //Get the GlobalField
        let getOrgVariable = {
          url: `${domainURL}/settings/orgvariables/${orgVariablePlaceholder}`,
          method: "GET",
          url_query: [
            {
              key: "organization_id",
              value: organization.organization_id,
            },
          ],
          connection_link_name: this.$appMeta.connection_link_name,
        };
        let {
          data: { body },
        } = await window.ZFAPPS.request(getOrgVariable);
        let {
          orgvariable: { value },
        } = JSON.parse(body);
        if(value !==""){

          value = JSON.parse(value);
          let {
            status,
            commission,
            type,
            specification_type,
            paid_through_account,
            expense_account,
          } = value;
          Object.assign(this, {
            status,
            commission,
            type,
            specification_type,
            paid_through_account,
            expense_account,
          });
          this.paid_account_id = this.paid_through_account.id;
          this.paidAccountlabel = this.paid_through_account.text;
          this.expense_account_id = this.expense_account.id;
          this.expenseAccountlabel = this.expense_account.text;
        }
      } catch (err) {
        await showErrorNotification(err);
      }
    };


    await getPaidThroughAccount();
    await getExpenseAccount();
    await getOrgVariable();
    this.isloading = false;
    this.isVisible = true;

    // ON PRE SAVE CHECK
    window.zapp.instance.on("ON_SETTINGS_WIDGET_PRE_SAVE", async () => {
      if (this.commission !== undefined) {
        if (this.status === "paid") {
          let isError = await checkAccount("paid");
          if (isError) {
            return {
              prevent_save: true,
            };
          } else {
            await updateOrgVariable();
          }
        } else {
          let isError = await checkAccount("sent");
          if (isError) {
            return {
              prevent_save: true,
            };
          } else {
            await updateOrgVariable();
          }
        }
      } else {
        await showErrorNotification("Commission Rate cannot be empty");
        return {
          prevent_save: true,
        };
      }
    });

    let checkAccount = async (status) => {
      if (this.expense_account_id ==="") {
        await showErrorNotification("Please select the Expense Account");
        return true;
      }
      if (status !== "paid" && this.paid_account_id ==="") {
        await showErrorNotification("Please select the Paid Through Account");
        return true;
      }
    };
    // UPDATE Global Fields
    let updateOrgVariable = async () => {
      let value = {};
      let {
        status,
        expense_account,
        paid_through_account,
        type,
        commission,
        specification_type,
      } = this;
      Object.assign(value, {
        status,
        expense_account,
        type,
        commission,
        specification_type,
        paid_through_account,
      });
      let data = { value: value };
      window.ZFAPPS.request({
        url: `${domainURL}/settings/orgvariables/${orgVariablePlaceholder}`,
        method: "PUT",
        url_query: [
          {
            key: "organization_id",
            value: organization.organization_id,
          },
        ],
        body: {
          mode: "formdata",
          formdata: [
            {
              key: "JSONString",
              value: JSON.stringify(data),
            },
          ],
        },
        connection_link_name: this.$appMeta.connection_link_name,
      });
    };
  },
};
</script>
<style scoped>
.side-heading {
  font-weight: 400;
  font-size: 13px;
}
.side-heading:after {
  content: "*";
  color: red;
}
.heading {
  font-size: 16px;
  font-weight: 600;
}
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 30px !important;
}
.container {
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 0px !important;
}
</style>

