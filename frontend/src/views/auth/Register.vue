<script setup>
import { useAuth } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required("Phone field is required"),
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string()
    .required("password confirmation is a required field")
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const auth = useAuth();
const { errors } = storeToRefs(auth);
const showPassword = ref(false);
const router = useRouter();
const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
const onSubmit = async (values, { setErrors }) => {
  // console.log(actions);
  let res = await auth.register(values);
  if (res.data) {
    sendOtp.value = true;
    // router.push({ name: "index.page" });
    // alert("login success");
    ElNotification({
      title: "Success",
      message: "Register Success",
      position: "top-left",
      type: "success",
    });
  } else {
    setErrors(res);
  }
};
//send otp
const schemaOtpVerify = yup.object({
  otp_code: yup.number().required("Input Your Otp Code").min(4),
});
const sendOtp = ref(false);
const otpVerify = async (values) => {};
</script>
<template>
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2 v-if="otpVerify">Verify Your Phone</h2>
                <h2 v-else>Customer Register</h2>
                <p>Use your credentials to access</p>
              </div>
              <div class="user-form-group" id="axiosForm" v-if="!sendOtp">
                <Form
                  class="user-form"
                  @submit="onSubmit"
                  :validation-schema="schema"
                  v-slot="{ errors, isSubmitting }"
                >
                  <!--v-if-->
                  <div class="form-group">
                    <Field
                      name="name"
                      type="text"
                      class="form-control"
                      placeholder="name"
                      :class="{ 'is-invalid': errors.name }"
                    />

                    <span class="text-danger" v-if="errors.name">{{
                      errors.name
                    }}</span>
                  </div>
                  <div class="form-group">
                    <Field
                      name="email"
                      type="email"
                      class="form-control"
                      placeholder="email"
                      :class="{ 'is-invalid': errors.email }"
                    />

                    <span class="text-danger" v-if="errors.email">{{
                      errors.email
                    }}</span>
                  </div>

                  <div class="form-group">
                    <Field
                      name="phone"
                      type="text"
                      class="form-control"
                      placeholder="phone no"
                      :class="{ 'is-invalid': errors.phone }"
                    />
                    <!-- <ErrorMessage name="phone" /> -->
                    <span class="text-danger" v-if="errors.phone">{{
                      errors.phone
                    }}</span>
                  </div>
                  <div class="form-group">
                    <Field
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="password"
                      :class="{ 'is-invalid': errors.password }"
                    /><span class="view-password" @click="toggleShow"
                      ><i
                        class="fas text-success"
                        :class="{
                          'fa-eye-slash': showPassword,
                          'fa-eye': !showPassword,
                        }"
                      ></i
                    ></span>
                    <!-- <ErrorMessage name="password" /> -->
                    <span class="text-danger" v-if="errors.password">{{
                      errors.password
                    }}</span>
                  </div>
                  <div class="form-group">
                    <Field
                      name="password_confirmation"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Re Type Password"
                      :class="{ 'is-invalid': errors.password_confirmation }"
                    /><span class="view-password" @click="toggleShow"
                      ><i
                        class="fas text-success"
                        :class="{
                          'fa-eye-slash': showPassword,
                          'fa-eye': !showPassword,
                        }"
                      ></i
                    ></span>

                    <span
                      class="text-danger"
                      v-if="errors.password_confirmation"
                      >{{ errors.password_confirmation }}</span
                    >
                  </div>

                  <div class="form-button">
                    <button type="submit" :disabled="isSubmitting">
                      Register
                      <span
                        v-show="isSubmitting"
                        class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                    <p>
                      Forgot your password?<a
                        href="reset-password.html"
                        class=""
                        >reset here</a
                      >
                    </p>
                  </div>
                </Form>
              </div>
              <div class="user-form-group" v-else>
                <Form
                  class="user-form"
                  @submit="otpVerify"
                  :validation-schema="schemaOtpVerify"
                  v-slot="{ errors, isSubmitting }"
                >
                  <div class="form-group">
                    <Field
                      name="otp_code"
                      type="text"
                      class="form-control"
                      placeholder="otp code"
                      :class="{ 'is-invalid': errors.otp_code }"
                    />

                    <span class="text-danger" v-if="errors.otp_code">{{
                      errors.otp_code
                    }}</span>
                  </div>
                  <div class="form-button">
                    <button type="submit" :disabled="isSubmitting">
                      Verify
                      <span
                        v-show="isSubmitting"
                        class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                  </div>
                </Form>
              </div>
            </div>

            <div class="user-form-footer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import "@/assets/css/user-auth.css";
</style>
