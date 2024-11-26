<script lang="ts" setup>
import { useLandingStore } from '~/stores/landing'

const landingStore = useLandingStore()
const { landingPageData } = storeToRefs(landingStore)

</script>

<template>
    <section id="utility" class="max-w-screen-xl utility flex flex-col justify-start items-center gap-20 pb-10 pt-32 md:pb-32" >
        <div v-if="landingPageData?.utilityLabel">
            <CommonFeatureLabel>
                <span class="text-sm">{{ landingPageData?.utilityLabel }}</span>
            </CommonFeatureLabel>
        </div>
        <div class="relative" v-if="landingPageData?.utilityList && landingPageData?.utilityList.length > 0">
            <div 
                class="utility__list grid grid-cols-2 md:grid-cols-4 card-grid w-full h-full">
                <CommonUtilityCard 
                    v-for="(item, index) in landingPageData?.utilityList"
                    :key="index"
                    :title="item.title"
                    :description="item.caption"
                    class="card-grid__item transition-all ease-in-out duration-150"> 
                    <div class="text-white fill-white">
                        <SanityImage :asset-id="item?.image.asset?._ref" class=" w-8 h-8 fill-white" />                                                       
                    </div>    
                </CommonUtilityCard>                
            </div>
            <div class="utility__grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </section>  
</template>

<style lang="scss" scoped>

.utility {
    .card-grid {
        &::selection {
            background: rgba(147, 130, 255, .5);
            color: #fff;
            -webkit-text-fill-color: #fff;
        }

        &__item {
            overflow: hidden;
            padding: 24px 32px 36px;
            position: relative;

            @screen lg {
                &:before {
                    background-color: #ffffff3d;
                    content: "";
                    display: block;
                    height: 16px;
                    left: 0px;
                    position: absolute;
                    top: 88px;
                    width: 1px;
                }
                &:after {
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .06) 100%);
                    content: "";
                    height: 100%;
                    left: 0;
                    opacity: 0;
                    pointer-events: none;
                    position: absolute;
                    top: 0;
                    transition: .45s cubic-bezier(.6,.6,0,1) opacity;
                    width: 100%;
                }
                &:nth-child(1n+5):after {
                    background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .06) 100%);
                }

                &:hover {
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .06) 100%);
                }
                &:nth-child(1n+5):hover {
                    background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .06) 100%);
                }
                
                position: relative;
                background-color: $color-background;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
        }
    }

    &__grid {
        display: flex;
        height: 100%;
        justify-content: space-between;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 100%;

        div {
            height: 100%;
            width: 1px;
        }

        @screen lg {
            div:nth-child(odd) {
                background: linear-gradient(180deg, rgba(255, 255, 255, .12) -.89%, rgba(255, 255, 255, 0) 100%);
            }

            div:nth-child(even) {
                background: linear-gradient(0,rgba(255,255,255,.12) -.89%,rgba(255,255,255,0) 100%);
            }

            div:last-child {
                background: linear-gradient(90deg, rgba(255, 255, 255, 0) -.89%, rgba(255, 255, 255, .08) 24.33%, rgba(255, 255, 255, .08) 49.55%, rgba(255, 255, 255, .08) 74.78%, rgba(255, 255, 255, 0) 100%);
                height: 1px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
            }
        }
        
    }
}

</style>