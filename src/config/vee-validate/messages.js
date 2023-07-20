import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "{field} is required",
        min: "{field} should contain minimum 0:{min} symbols",
        max: "{field} should contain maximum 0:{max} symbols",
        georgian: "{field} should contain only georgian alphabet characters",
        english: "{field} should contain only english alphabet characters",
        email: "Your provided {field} is not correct",
        lowerCaseAndNum:
          "This should contain be lowercase and only with digits",
        numeric: "{field} should be numeric",
      },
      names: {
        login: "Email",
        password: "Password",
        email: "Email",
        title_en: "Title in english",
        title_ka: "Title in georgian",
        release_date: "Release date",
        director_en: "Director in english",
        director_ka: "Director in georgian",
        description_en: "Description in english",
        description_ka: "Description in georgian",
        password_confirmation: "Confirm password",
        name: "Name",
        image: "Image",
        genreIds: "Genres",
      },
    },
    ka: {
      messages: {
        required: "მოცემული ველი სავალდებულოა",
        min: "{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს",
        max: "{field} უნდა შეიცავდეს მაქსიმუმ 0:{max} სიმბოლოს",
        georgian: "{field} ველი უნდა შეიცავდეს მხოლოდ ქართული ანბანის ასოებს",
        english: "{field} ველი უნდა შეიცავდეს მხოლოდ ინგლისური ანბანის ასოებს",
        email: "თქვენ მიერ შეყვანილი {field} არასწორია",
        lowerCaseAndNum:
          "უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის სიმბოლოებს და ციფრებს",
        numeric: "{field} უნდა შეიცავდეს მხოლოდ ციფრებს",
      },
      names: {
        login: "მეილი",
        password: "პაროლი",
        email: "მეილი",
        title_en: "სათაური ინგლისურად",
        title_ka: "სათაური ქართულად",
        release_date: "გამოცემის თარიღი",
        director_en: "რეჟისორი ინგლისურად",
        director_ka: "რეჟისორი ქართულად",
        description_en: "აღწერა ინგლისურად",
        description_ka: "აღწერა ქართულად",
        password_confirmation: "გაიმეორე პაროლი",
        name: "სახელი",
        image: "ფოტო",
        genreIds: "ჟანრები",
      },
    },
  }),
});
