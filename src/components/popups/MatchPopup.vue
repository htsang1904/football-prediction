<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="match-popup"
        :showFooter="true"
        :title="title"
    >
    <div class="content">
        <div class="match-detail">
            <div class="flag">
                <img src="../../assets/img/vn.jpg" alt="">
                <span>Việt Nam</span>
            </div>
            <div class="time">
                <div>
                    {{ item.time }}
                </div>  
                <div>
                    {{ item.date }}
                </div>
            </div>
            <div class="flag">
                <img src="../../assets/img/tl.jpg" alt="">
                <span>Thái Lan</span>
            </div>
        </div>
        <div class="prediction">
            <div class="prediction-guide">
                <span>Chọn kết quả bạn nghĩ sẽ xảy ra trong 2 hiệp chính</span>
            </div>
            <div class="prediction-result">
                <div class="option" :class="{ active: activeOption === 'firstTeam' }" @click="selectOption('firstTeam')">
                    <img src="../../assets/img/vn.jpg" alt="">
                    <span>Thắng</span>
                    <span>Thưởng X10</span>
                    <i class="fas fa-caret-up"></i>
                </div>
                <div class="option" :class="{ active: activeOption === 'tie' }" @click="selectOption('tie')">
                    <img src="../../assets/img/tie.png" alt="" class="tie-game">
                    <span>Hòa</span>
                    <span>Thưởng X5</span>
                    <i class="fas fa-caret-up"></i>
                </div>
                <div class="option" :class="{ active: activeOption === 'secTeam' }" @click="selectOption('secTeam')">
                    <img src="../../assets/img/tl.jpg" alt="">
                    <span>Thắng</span>
                    <span>Thưởng X10</span>
                    <i class="fas fa-caret-up"></i>
                </div>
            </div>
        </div>
        <div class="rules">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="Hướng dẫn dự đoán" name="1">
                    <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
                    <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
                </el-collapse-item>
                </el-collapse>
        </div>
    </div>
    <transition name="fade">
        <PopupFooter v-if="showFooter" ref="popupFooter"/>
    </transition>
    </Popup>
</template>

<script>
import Popup from '../Popup.vue'
import PopupFooter from '../cards/ohters/PopupFooter.vue'
export default {
    components: {
        Popup,
        PopupFooter
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            isShow: true,
            activeNames: ['1'],
            activeOption: '',
            selectedOption: '',
            showFooter: false,
        }
    },
    mounted() {
        if (this.visible) {
            this.showDialog = true;
            console.log('mở')
        }
    },
    computed: {
        title() {
            return 'Dự đoán trận đấu'
        }
    },

    methods: {
        onClosed() {
            this.$emit('closed')
        },
        selectOption(value) {
            this.activeOption = value
            this.selectedOption = value
            this.showFooter = true
        }
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
<style lang="scss" scoped>
.match-popup {
    .el-dialog {
        .el-dialog__body {
            .content {
                padding: 0 20px 0 20px;
                .match-detail {
                    height: 130px;
                    margin: 30px 0;
                    display: flex;
                    justify-content: space-between;
                    .flag {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        filter: drop-shadow(0 2px 4px #000000);
                        img {
                            height: 60px;
                            border-radius: 4px;
                            border: 1px solid #fff;
                        }
                        span {
                            margin-top: 8px;
                            text-transform: uppercase;
                        }
                    }
                    .time {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        height: 40px;
                        font-weight: 600;
                        filter: drop-shadow(0 0 4px #000);
                    }
                }
                .prediction {
                    height: 200px;
                    margin-bottom: 40px;
                    display: flex;
                    flex-direction: column;
                    .prediction-guide {
                        height: 30px;
                        margin-bottom: 44px;
                        background-color: #fff;
                        position: relative;
                        border-radius: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &::after {
                            content: "";
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            margin-left: -5px;
                            border-width: 7px;
                            border-style: solid;
                            border-color: #00FF00 transparent transparent transparent;
                        }
                        span {
                            color: #04419d;
                            font-size: 13px;
                            font-weight: 600;
                        }
                    }
                    .prediction-result {
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        .option {
                            width: 30%;
                            border-radius: 8px;
                            border: 2px solid #fff;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: center;
                            background-color: #000000c2;
                            padding-bottom: 8px;
                            transition: transform 0.5s ease-in-out, background-color 0.5s ease-in-out;
                            position: relative;
                            img {
                                width: 100%;
                                border-radius: 8px;
                            }
                            .tie-game {
                                filter: invert(100%) grayscale(100%);
                            }
                            .fa-caret-up {
                                position: absolute;
                                bottom: -30px;
                                display: none;
                                color: #00FF00;
                                font-size: 18px;
                            }
                        }
                        .option.active {
                            transform: translateY(-14px);
                            background-color: #0343a3;
                            img {
                                background-color: #0951bd;
                                filter: none
                            }
                            .fa-caret-up {
                                animation: bounce 1s infinite;
                                display: block;
                            }
                        }
                    }
                }
                .rules {
                    ::v-deep .el-collapse {
                        border: none;
                        .el-collapse-item {
                            .el-collapse-item__header {
                                border: none;
                                padding: 10px;
                                height: 20px;
                                font-size: 14px;
                                font-weight: 600;
                                border-radius: 8px;
                            }
                            .el-collapse-item__wrap {
                                margin-top: 10px;
                                border-radius: 8px;
                                .el-collapse-item__content {
                                    padding: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s, transform 0.3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
</style>
