import { object, string, url, email, required, number, date, InferType } from 'yup';

export let contactYup = object({
    fullname: string("نام شما باید به صورت رشته وارد شود").required("نام الزامی می باشد"),
    photo: string("آدرس تصویر به صورت رشته وارد شود").url("آدرس تصویر باید به صورت یک آدرس اینترنتی باشد").required("آدرس تصویر الزامی می باشد"),
    mobile: number("شماره تلفن به صورت عدد وارد شود").required("شماره تلفن الزامی می باشد"),
    email: string("آدرس ایمیل به صورت رشته وارد شود").email("آدرس ایمیل اشتباه است").required("آدرس ایمیل الزامی می باشد"),
    job: string("شغل به صورت رشته وارد شود").nullable(),
    group: string("گروه اشتباه است").required("انتخاب گروه الزامی می باشد")
})