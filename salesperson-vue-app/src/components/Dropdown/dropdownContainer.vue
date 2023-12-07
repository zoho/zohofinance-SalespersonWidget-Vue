<template>
    <div v-show="usersToggle" class="content-continer">
        <div class="select-result" :style="style" >
            <slot />
        </div>
    </div>
</template>
<script>
import { inject } from "vue";
export default {
    name: "DropDownContent",
    inject:["dropDownWidth"],
    props:{
        
        max_height:{
            type:String,
            default:""
        }
    },
    data(){
        return{
            size:this.dropDownWidth,
            maxHeight:this.max_height,
        };
    },

    setup() {
        const usersToggle = inject("usersToggle");

        return {
            usersToggle,
        };
    },
    computed: {
      style() 
      {
        return {"width":this.size, "max-height":this.maxHeight};
      }
    },
   
};
</script>
<style scoped>
.content-continer{
    z-index: 9999;
    margin-top: 6px;    
    top: 100%;
    width: 100%;
}
.select-result{
    position: absolute;
    display: block;
    min-height: 0;
    max-height: 280px;
    min-width: 0;
    overflow-x: hidden;
    margin: 0;
    padding: 4px;
    border-radius: 0 0 6px 6px;
    border-top: none;
    border-bottom: none;
    background-color: #fff;
    border: 1px solid #ebeaf2;
    border-radius: 8px;
    box-shadow: 0 4px 12px 0 #d7d5e2;
    width: 100%;

 }
 ::-webkit-scrollbar {
    width: 8px;
    height : 8px;
}

::-webkit-scrollbar-track {
      background-color:#F3F3F3;
      border-radius: 50px;

}

::-webkit-scrollbar-thumb {
      background-color: #E0E0E0;
      border-radius: 50px;

}

</style>