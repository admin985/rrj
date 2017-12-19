<template>
    <div class="container">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">


            <div v-for="group in data">
                {{group.title}}
                <ul>
                    <li v-for="item in group.data"><img :src="host+item" alt=""></li>
                </ul>
            </div>

            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
        </mt-loadmore>

    </div>
</template>
<script>
    const host = 'http://test.renrenjiakeji.com';
    import BScroll from 'better-scroll';
    import axios from 'axios';
    export default {

        data() {
            return {
                host,//host:host
                topStatus: '',
                data: [],
                page: 0,
                title: '-'
            }

        },
        beforeCreate() {

        },
        updated() {
            // this.scroll.refresh();
        },
        created() {
            this.initData();
            // this.page = page++;

        },
        methods: {
            initData() {
                this.getData(1)
                    .then(res => {
                        console.log(res)
                        this.data = res;

                    })
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop() {

                this.getData(10)
                    .then(res => {

                        this.data = this.data.concat(res);
                        this.topStatus = false;
                        this.$refs.loadmore.onTopLoaded();
                    })
            },
            getData(id) {
                const page = this.page = this.page + 1;
                return axios.post(`${host}/prog/Mobilecms/newsList_m`, `type=${id}&page=${page}`)
                    .then(res => {
                        const data = this.formateData(res.data.data);
                        console.log(data, 999)
                        return Promise.resolve(data);
                    })
                    .catch(e => {
                        console.log(e)
                    })


            },
            formateData(data) {
                // const d = data.map(item => {
                //     return item.img_id
                // });

                // let result = [];
                // d.forEach(item => {
                //     result = result.concat(item)
                // });
                // return result;
                return data.map(item => {
                    return {
                        title: item.title,
                        data: item.img_id
                    }
                })
            }
            
        }
    }
</script>
<style>
</style>