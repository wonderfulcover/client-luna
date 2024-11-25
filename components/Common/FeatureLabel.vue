<template>
    <div class="feature-label">
        <span><slot /></span>
    </div>
</template>

<style lang="scss" scoped>

.feature-label {
    isolation: isolate;
    overflow: hidden;
    align-items: center;
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    border-radius: 32px;
    box-shadow: inset 0 -7px 11px #a48fff1f;
    display: flex;
    margin: 0 auto 12px;
    padding: 6px 14px 6px 15px;
    position: relative;
    width: -moz-max-content;
    width: max-content;
    &::after {
        background: linear-gradient(90.01deg, rgba(229, 156, 255, .24) .01%, rgba(186, 156, 255, .24) 50.01%, rgba(156, 178, 255, .24) 100%);
        border-radius: inherit;
        content: "";
        inset: 0;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        padding: 1px;
        pointer-events: none;
        position: absolute;
    }     

    span {
        background: linear-gradient(0deg, rgba(255, 255, 255, .4), rgba(255, 255, 255, .4)), linear-gradient(90.01deg, #e59cff .01%, #ba9cff 50.01%, #9cb2ff 100%);
        background-blend-mode: normal, screen;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

</style>