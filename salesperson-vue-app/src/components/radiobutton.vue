<template>
    <div>
        <input class="form-check-input"
          :id="id"
          type="radio"
          :name="name"
          :value="value"
          :checked="value === checked"          
          @change="updateSelectedValue"
        />
        <label :for="id" class="form-check-label">{{label}}</label>
    </div>
</template>

<script>
export default {
  name: "radioButton",
  props: {
    name:{
        type:String,
        default:""
    },     
    id:{
        type:String,
        default:""
    },    
    label:{
        type:String,
        default:""
    }, 
    value: {
        type:String,
        default:""
    }, 
    checked:{
      type:String

    },
    selectedValue: {
        type:String,
        default:""
    },
    
},
methods: {
    updateSelectedValue() {
      this.$emit("update:selectedValue", this.value); // Emit an event to update selectedValue in the parent component    
    },
  },
};
</script>


<style scoped>

input[type=radio]:checked {
  background-color: #408dfb !important;
  border-color: #408dfb !important;
}

input[type=radio] {
  cursor: pointer;
  width: 14px !important;
  height: 14px !important;
  vertical-align: top !important;
  background-color: #fff !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: contain !important;
  border: 1px solid #00000040 !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
 
}
input[type=radio]:hover:enabled {
  border-color: #408dfb !important;
  outline: 0 !important;
  box-shadow: 0 0 0 3px rgba(64,141,251,.16) !important;
}

input[type=radio]:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 3px rgba(64,141,251,0.16) !important;
}

.form-check-label {
  margin-left: 4px !important;
  margin-bottom: 0 !important;
  cursor: pointer !important;
}
</style>
