#安装 
npm install vue-iosScroller

#main.js 安装全局指令 v-scroll

    import vueIosScroller from 'vue-iosScroller'

    Vue.use(vueIosScroller,{
        name:scroller, //可改变指令名称 这里使用v-scroller调用
        vertical:false //是否禁用垂直触顶/触顶滑动，默认false
    });

#Tips
本组件主要是通过 touchmove 的{passive:false}参数，禁用掉左右滑动，可选参数vertical来控制是否加入禁止触顶/触底滑动

可传入参数 false/true 来控制 开启/关闭 插件的功能

关闭插件功能:

    <container v-scroller='true'>

开启插件功能

    <container v-scroller>
    或者 
    <container v-scroller='false'>

container必须有固定的高度，并且需要加可的滑动样式

    overflow-y scroll
    -webkit-overflow-scrolling touch
