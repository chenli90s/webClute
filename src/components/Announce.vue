<template>
    <div id="announce">
        <announceEditor></announceEditor>
    </div>
</template>

<script>
import announceEditor from './announce/AnnounceEditor'

export default {
    name: 'announce',
    
    components: {
        announceEditor: announceEditor
    }
}    
</script>
