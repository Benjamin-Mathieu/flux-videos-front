<template>
    <div class="stream">
        <router-link :to="{name:'ViewStream',params:{id:stream.id}}">
            <img src="https://via.placeholder.com/400x300/09f/fff.png" alt="">
            <div class="detail-stream">
                <div class="avatar"></div>
                <div>
                    <span>{{stream.title}}</span><br>
                    <span>{{stream.id_user}}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['stream'],
    mounted()
    {
        
    }
}

</script>

<style lang="scss" scoped>
    .stream {
        .avatar {
            background-color: #CCC; border-radius: 50%; height: 50px; width: 50px;
            margin-right: 1em;
            z-index: 1;
        }

        .img {
            width: 100%; height: 100%;
        }

        .detail-stream {
            display: flex; align-items: flex-start;
        }
    }
</style>