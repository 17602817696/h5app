<template>
    <div>
        <!-- 我叫:{{$store.state.name}} -->
        我叫:{{name}}
        <button @click="changeName">点击修改</button>
    </div>
</template>

<script>
    export default {
        mounted () {
            console.log(this.$store.state.name);

        },
        methods:{
            changeName(){
                this.$store.commit('changeName',{name:'阿飞'})
            }
        },
        computed:{
            // 推荐的方式，优化性能
            name(){
                return this.$store.state.name;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>