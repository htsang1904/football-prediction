<template>
    <el-dialog
        :visible.sync="showDialog"
        :fullscreen="isFullScreen"
        @open="onShowing"
        @opened="onOpened"
        @closed="onClosed"
        :show-close="false"
        append-to-body
        :modal="true"
        :lock-scroll="true"
        :close-on-click-modal="false"
        id="popup">
     <template slot="title">
        <span class="el-dialog__title" v-if="title">{{ title }}</span>
        <div class="left-btn" v-if="isShowLeftBtn">
            <el-button plain @click="showDialog = false">
                <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-12.98 -12.98 51.41 51.41" xml:space="preserve" stroke="#ffffff" transform="rotate(0)" stroke-width="1.7815699999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.865334"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c185_triangle"> <path d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005 c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41 s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"></path> </g> <g id="Capa_1_58_"> </g> </g> </g></svg>
            </el-button>
        </div>
        <slot name="title"></slot>
    </template>
    <slot></slot>

    <div slot="footer">
        <slot name="footer"></slot>
    </div>
     </el-dialog>
 </template>
 
 <script>
 export default {
     components: {
     },
     props: {
        visible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "Popup",
        },
        isFullScreen: {
            type: Boolean,
            default: true
        },
        isShowLeftBtn: {
            type: Boolean,
            default: true
        },
     },
 
     data() {
         return {
            showDialog: true,
            isScrolled: false
        }
    },
     mounted() {
        if (this.visible) {
            this.showDialog = true;
        }
    },
     computed: {
     },
 
     methods: {
         onShowing() {
             this.$emit("opening");
         },
 
         onOpened() {
             this.$emit("opened");
         },
         
         onClosed() {
             this.$emit("closed");
             this.$emit("update:visible", false);
         },
     },
     watch: {
         visible(val) {
             if (val) {
                 this.showDialog = true;
             } else {
                 this.showDialog = false;
             }
         },
     },
 }
 </script>
 <style lang="scss">
    .el-dialog {
        width: 100%;
        margin-top: 0;
        margin-bottom: 0 !important;
        overflow: auto;
        box-sizing: border-box;
        background: url('../assets/img/full-stadium.jpg') no-repeat top/contain,#000520;
        position: relative;
        z-index: 1;
        box-shadow: none;
        &::after {
                content: "";
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, rgba(51, 51, 51, 0) 28%, #000520 38%);
                z-index: -2;
            }
        .el-dialog__header {
            padding: 20px 20px 10px;
            text-align: center;
            font-weight: bold;
            position: fixed;
            width: 100%;
            height: 60px;
            background: transparent;
            box-sizing: border-box;
            z-index: 1000;
            .el-dialog__title {
                color: #fff;
                filter: drop-shadow(0 2px 2px #3333338b);
            }
            .left-btn {
                position: absolute;
                left: 10px;
                top: 14px;
                .el-button {
                    padding: 0;
                    width: 34px;
                    height: 34px;
                    font-size: 14px;
                    border: 2px solid #fff;
                    background-color: rgba(0, 0, 0, 0.558);
                    border-radius: 50%;
                    svg {
                        width: 28px;
                        vertical-align: top;
                        margin-right: 2px;
                    }
                }
            }

        }
        .el-dialog__body {
            padding: 50px 0 30px 0;
            color: #fff;
            padding-bottom: 100px;
        }
    }
 </style>
 