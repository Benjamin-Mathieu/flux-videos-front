<template>
    <div>
        <router-link :to="{name:'ViewStream',params:{id:stream.id}}">{{stream.id}}</router-link>
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