<template>
    <div class="option-container">
       <div class="result" :class="isActive?'active':''" @click="emitCustomEvent"  :value="value" :label="label">{{ label }} </div> 
       <img  v-show="isActive" src="../../../public/tick.svg" class="tick"/>
       <slot />
    </div>
         
 
   </template>
  <script>
  export default {
 
      name: "DropDownItems",
      props:{
        label:{
          type:String
        },
        value:{
          type:String
        },
        updatedValue:{
          type:String
        }
      },
      data(){
       return{
          isActive:false,
       };
      },
 
      watch:{
       updatedValue:function(new_value){
        
          if(new_value === this.value)
          {
             this.isActive = true; 
            
          }
          else{
             this.isActive = false;
          }
        },
        immediate: true,
      },  
      methods:{
        emitCustomEvent(event) {
            this.$emit("custom-event", event);
      },
      changeClass(value){
        if(value === this.value)
        {
           this.isActive = true; 
          
        }
        else{
           this.isActive = false;
        }
      }
    },
    mounted:function(){
        this.changeClass(this.updatedValue);
       
      }, 
  };
  </script>
  <style scoped>
 .result{
     padding: 7px 0 7px 10px;
     color: #777;
     display: flex;
     align-items: center;
     width: 100%;
     clear: both;
     font-weight: 400;
     text-align: inherit;
     white-space: nowrap;
     background-color: transparent;
     border: 0;
     font-size: 1 rem !important;
     margin: 2px 0;
     cursor: pointer;
 
 
 }
  .result:hover{
     background-color: #408dfb;;
     color: #fff;
     border-radius: 6px;   
     color:#fff; 
  }
  .active{
    background-color: #e9ebf3;
     color: #21263c;
     border-radius: 6px;    
  }
  .tick{
    height: 10px;
    width: 10px;
    color:#408dfb;
    position: absolute;
    right: 20px;
    top:13px;
  }
  .option-container{
    position: relative;
  }
  
  </style>