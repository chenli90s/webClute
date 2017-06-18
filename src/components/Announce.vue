<template>
    <div id="announce">
        <announceEditor></announceEditor>
        <announcelist></announcelist>
    </div>
</template>

<script>
import announceEditor from './announce/AnnounceEditor'
import announcelist from './announce/AnnounceList'
export default {
    name: 'announce',
    
    components: {
        announceEditor: announceEditor,
        announcelist: announcelist
    }
}    
</script>
