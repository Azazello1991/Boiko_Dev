import React from "react";
import { useTranslation } from 'react-i18next';
// redux
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeMail, changePhone, changeComment } from "../../redux/slices/formCollSlice";

const Form = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRefName = React.useRef(); // Хук для посилання
  const collFormData = useSelector((state) => state.formCollSlice.collFormData); // дані форми

  const patterns = {
    namePattern: /^[а-яА-ЯҐґЄєІіЇї'-]{2,}$/,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phonePattern: /^0\d{9}$/,
    passwordPattern: /^(?!.*\s).{8,}$/,
  };

  const [formData, setFormData] = React.useState({
    name: "",
    mail: "",
    phone: "",
    comment: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    mail: "",
    phone: "",
  });

  /* name */
  const onChangeName = (e) => {
    const { value } = e.target; // значення поля
    dispatch(changeName(value.trim())) // надсилаемо в redux

    if (!patterns.namePattern.test(value.trim())) {
      e.target.style.border = "1px solid red";

      setErrors((prevState) => ({
        ...prevState,
        name: "Ім'я повинне бути більше 2-х символів та написане кирилицею",
      }));
    } else {
      e.target.style.border = "1px solid #FFC700";
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  };

  /* mail */
  const onChangeMail = (e) => {
    const { value } = e.target;
    dispatch(changeMail(value.trim()))

    if (!patterns.emailPattern.test(value.trim())) {
      e.target.style.border = "1px solid red";

      setErrors((prevState) => ({
        ...prevState,
        mail: "Не вірно вказаний mail",
      }));
    } else {
      e.target.style.border = "1px solid #FFC700";
      setErrors((prevState) => ({
        ...prevState,
        mail: "",
      }));
    }
  };

  /* phone*/
  const onChangePhone = (e) => {
    const { value } = e.target;
    dispatch(changePhone(value))

    if (!patterns.phonePattern.test(value)) {
      e.target.style.border = "1px solid red";
      setErrors((prevState) => ({
        ...prevState,
        phone: "Не вірно вказаний номер",
      }));
    } else {
      e.target.style.border = "1px solid #FFC700";
      setErrors((prevState) => ({
        ...prevState,
        phone: "",
      }));
    }
  };

  /* comment*/
  const onChangeComment = (e) => {
    const { value } = e.target;
    dispatch(changeComment(value))

    if (value) {
      e.target.style.border = "1px solid #FFC700";
    } else {
      e.target.style.border = "1px solid transparent";
    }
  };

  return (
    <section className="section section-form">
      <div className="container">
        <h2 className="section-title">
          {t("form.titleOne")}<span className="section-title-slice">{t("form.titleTwo")}</span>
        </h2>
        <p className="section-text section-form__text">{t("form.subtitle")}</p>

        <div className="section-form__inner">
          <div className="section-form__data">
            <form className="form form-page" action="#" method="post">
              <ul className="form__list">
                
                <li className="form__item">
                  <label className="sr-only" for="formName">
                    Введіть Ваше ім'я
                  </label>
                  <input
                    value={collFormData.name}
                    ref={inputRefName}
                    onChange={onChangeName}
                    className="fild form__fild"
                    id="formName"
                    type="text"
                    placeholder={t("form.placeholders.name")}
                    required
                  />
                  {errors.name && <p className="form__error">{errors.name}</p>}
                </li>

                <li className="form__item">
                  <label className="sr-only" for="formMail">
                    Введіть Ваш email
                  </label>
                  <input
                    className="fild form__fild"
                    onChange={onChangeMail}
                    value={collFormData.mail}
                    id="formMail"
                    type="email"
                    placeholder={t("form.placeholders.mail")}
                    required
                  />
                  {errors.mail && <p className="form__error">{errors.mail}</p>}
                </li>

                <li className="form__item">
                  <label className="sr-only" for="formTel">
                    Введіть Ваш телефон
                  </label>
                  <input
                    className="fild form__fild"
                    onChange={onChangePhone}
                    value={collFormData.phone}
                    id="formTel"
                    type="tel"
                    placeholder={t("form.placeholders.phone")}
                    required
                  />
                  {errors.phone && (
                    <p className="form__error">{errors.phone}</p>
                  )}
                </li>

                <li className="form__item">
                  <label className="sr-only" for="formComment">
                    Введіть Вашу примітку
                  </label>
                  <textarea
                    className="fild form__fild form__textarea"
                    onChange={onChangeComment}
                    value={collFormData.comment}
                    name="comment"
                    id="formComment"
                    placeholder={t("form.placeholders.comment")}
                  ></textarea>
                </li>
              </ul>
              <div>
                <button className="btn form__btn" type="submit">
                  {t("form.formButton")}
                </button>
              </div>
            </form>

            <ul className="networks section-form__networks">
              <li className="networks__btn">
                <a
                  href="#"
                  className="networks__network networks__network--telegram"
                  title="Telegram"
                ></a>
                <span className="sr-only">Зв'язатися через телеграм</span>
              </li>

              <li className="networks__btn">
                <a
                  href="#"
                  className="networks__network networks__network--viber"
                  title="Viber"
                ></a>
                <span className="sr-only">Зв'язатися черезз вайбер</span>
              </li>
            </ul>
          </div>

          <div className="section-form__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97724.28023475384!2d36.20460175560365!3d49.936343070392816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a09f63ab0f8b%3A0x2d4c18681aa4be0a!2z0KXQsNGA0YzQutC-0LIsINCl0LDRgNGM0LrQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sua!4v1696703593067!5m2!1sru!2sua"
              width="535"
              height="500"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
