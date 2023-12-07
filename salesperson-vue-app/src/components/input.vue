<template>
    <div >
        <input 
        v-bind="$attrs" 
        class="mx-5 my-4 form-control" 
        :class="width" 
        :placeholder="label" 
        :value="value"
        @input="$emit('input', $event.target.value)"
        />
        
    </div>
</template>

<script>
export default {
     name: "inputField",
     props: {
        width: {
            type:String,
            defalut:""
        },
        label:{
            type:String,
            default:""
        },
        value:{
            type:[String,Number],
            default:""
        }
    },
   
};
</script>

<style scoped>
.form-control{
    
    display: block;
    width: 50% !important;
    padding: .375rem .75rem;
    font-size: 13px !important;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    height: 34px !important;
    margin-left: 0px !important;
    margin-top: 0px !important;

}

.form-control:focus {
    color: #495057 !important;
    background-color: #fff !important;
    border-color: #408dfb !important;
    outline: 0 !important;
    box-shadow: 0 0 0 3px rgba(64,141,251,0.16) !important;
}
</style>