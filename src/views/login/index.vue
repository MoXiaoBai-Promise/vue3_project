<template>
    <div id="login">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form :rules="rules" :model="loginFrom" ref="loginForms">
                    <h2>Hello</h2>
                    <h4>欢迎登录莫小白Vue3项目</h4>
                    <el-form-item prop="username">
                        <el-input
                            placeholder="请输入用户名"
                            v-model="loginFrom.username"
                            :prefix-icon="User"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="form_item" prop="password">
                        <el-input
                            placeholder="请输入密码"
                            v-model="loginFrom.password"
                            type="password"
                            class="password"
                            :prefix-icon="Lock"
                            show-password
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary "
                            @click="login"
                            class="loginbutton"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { User, Lock } from '@element-plus/icons-vue'
    import { useRouter, useRoute } from 'vue-router'
    import { ElNotification } from 'element-plus'
    import userStore from '@/store/user/index'
    import getTime from '@/utils/getTime'
    let loginFrom = reactive({
        username: '', //用户名
        password: '' //密码
    })

    //用户名自定义验证
    const validateUsername = (_rule: any, value: any, callback: any) => {
        if (value.length >= 4 && value.length <= 20) {
            callback()
        } else {
            callback(new Error('用户名必须在4——20位之间！'))
        }
    }
    //密码自定义验证
    const validatePassword = (_rule: any, value: any, callback: any) => {
        if (value.length >= 6 && value.length <= 20) {
            callback()
        } else {
            callback(new Error('密码必须在6——20位之间！'))
        }
    }
    //验证规则
    const rules = reactive({
        username: [
            {
                required: true,
                // min: 4,
                // max: 10,
                // message: '用户名必须在4——10位之间！',
                validator: validateUsername,
                trigger: 'change'
            }
        ],
        password: [
            {
                required: true,
                // min: 6,
                // max: 15,
                // message: '密码必须在6——15位之间！',
                validator: validatePassword,
                trigger: 'change'
            }
        ]
    })
    let loginForms = ref() //表单ref
    let $router = useRouter()
    let $route = useRoute()
    //登录按钮
    async function login() {
        await loginForms.value.validate() //表单验证

        await userStore().userLogin(loginFrom)

        //判断，如果query携带redirect，跳转至redirect，否则跳转至首页
        let redirect: any = $route.query.redirect
        $router.push({ path: redirect ? redirect : '/' })
        ElNotification({
            title: 'hi,' + getTime() + '好！',
            message: '登录成功',
            type: 'success'
        })
        window.location.reload()
    }
</script>

<style scoped lang="scss">
    #login {
        background: url('@/assets/images/background.jpg') no-repeat;
        height: 100vh;
        width: 100%;
        background-size: cover;

        .el-form {
            background: url('@/assets/images/login_form.png') no-repeat;
            background-size: cover;
            border-radius: 10px;
            width: 80%;
            position: relative;
            top: 35vh;
            padding: 10px;
            .el-form-item {
                padding: 0 5%;
                .password {
                    margin-top: 10px;
                }
            }
            h2 {
                color: white;
                font-size: 20px;
            }
            h4 {
                color: white;
                margin: 10px 0;
                font-size: 14px;
            }
            .loginbutton {
                width: 100%;
            }
        }
    }
</style>
