<template>
    <div>
        详情
    </div>
</template>

<script>
    export default {
        data(){
            return{
                personList:[
                    {id:0,name:'阿三',age:20},
                    {id:1,name:'阿四',age:21},
                    {id:2,name:'阿五',age:22},
                ]
            }
        },
        computed:{
            persons(){
                return this.personList.filter((item)=>item.age>21)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>