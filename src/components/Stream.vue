<template>
    <div class="stream">
        <router-link :to="{name:'ViewStream',params:{id:stream.id}}">
            <img src="https://via.placeholder.com/400x300/09f/fff.png" alt="">
            <div class="detail-stream">
                <div class="avatar">
                    <img v-if="stream.anonymous == 0" class="gravatar" :src="'https://avatars.dicebear.com/api/bottts/'+stream.creator.mail+'.svg'" alt="Avatar" width="20px">
                    <img v-else class="gravatar" :src="'https://avatars.dicebear.com/api/bottts/imAnAnonymeUserIncroyable.svg'" alt="Avatar" width="20px">
                </div>
                <div>
                    <span>{{stream.title}}</span><br>
                    <span v-if="stream.anonymous == 0">{{stream.creator.username}}</span>
                    <span v-else>Anonymous User</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['stream'],
    data() {
        return {
            
        }
    },
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
            div.avatar{
                img{
                    width:50px;
                }
            }
        }
    }
        
    
</style>