<template>
    <div class="box" @click="showUsers" >
      <!-- toggler -->

      <button class="form-control selected" :style="style" >{{ title }}</button>
  
      <!-- Content Container -->
  
      <slot />
  
    </div>
  </template>

<script>
import { provide, ref } from "vue";
export default {
    name: "DropDown",
    props:{
        title: String,
        width:
        {
            type:String,
            defalut:""
        }
    },
    computed: {
      style() 
      {
        return ("width:"+this.size);
      }
    },
    setup(props) {
        const usersToggle = ref(false);

        const showUsers = () => {
            usersToggle.value = !usersToggle.value;

        };
     
        provide("usersToggle", usersToggle);
        provide("dropDownWidth", props.width);

        return {
            usersToggle,
            showUsers,
        };
    },
    data(){
        return{
            size:this.width,
        };
    },
    

};
</script>
<style scoped>
.box{
    box-sizing: border-box;
}
.selected{
    cursor: pointer;
    text-align: left;
    height: 34px;
    overflow: hidden;
    align-items: center;
    white-space: nowrap;
    line-height: 28px;
    color: #21263c;
    text-decoration: none;
    border-radius: 6px;
    border: 1px solid #d7d5e2;
    background-clip: padding-box;
    user-select: none;
}
.form-control
{
    display: block;
    width: 100%;
    padding: 5px 8px;
    font-size: 13px;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #408dfb;
    outline: 0;
    box-shadow: 0 0 0 3px rgba(64,141,251,0.16);
}
</style>