// components/SignupPage.js
import React, { useState } from "react";
import Input from "../../components/input";
// import sendConfirmationCode from "../../utils/Mailer";
import BackendSimulation from "../../utils/BackEnd";
import Page from "../../components/page";
import BackButton from "../../components/backbutton";
import Button from "../../components/button";
import "./index.css";

import { useAuth } from "../../utils/AuthContext";

import PasswordInput from "../../components/input-password";
import Break from "../../components/break";

const SettingsPage = () => {
  const auth = useAuth();
  const { authContextData, userData } = auth || {};
  const { logout } = authContextData || {};

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [errorMessage1, setErrorMessage1] = useState("");
  const [successMessage1, setSuccessMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [successMessage2, setSuccessMessage2] = useState("");
  const backend = BackendSimulation();

  const { updateUserData } = useAuth();

  const validatePassword = (value) => {
    // Перевірка пароля
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const validateEmail = (value) => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleLogOut = async () => {
    logout();
  };

  const handleChangePassword = async () => {
    console.log({ userData });
    // Перевірка пароля
    const isPasswordValid = validatePassword(password3);
    setIsValidPassword(isPasswordValid);

    if (!isPasswordValid) {
      setErrorMessage2("Помилка введених даних");
      setSuccessMessage2("");
      return;
    }

    // Перевірка наявності користувача в базі
    const changePasswordResult = backend.changepassword(password2, password3);

    if (!changePasswordResult.success) {
      setErrorMessage2(changePasswordResult.message);
      setSuccessMessage2("");
      return;
    }

    console.log(email, userData);
    setErrorMessage2("");
    setPassword2("");
    setPassword3("");
    setSuccessMessage2(changePasswordResult.message);
  };

  const handleChangeMail = async () => {
    // Перевірка пароля

    // Перевірка емейла
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    if (!isEmailValid) {
      setErrorMessage1("Помилка введених даних");
      setSuccessMessage1("");
      return;
    }

    // Перевірка наявності користувача в базі
    const changeMailResult = backend.changemail(email, password1);

    if (!changeMailResult.success) {
      setErrorMessage1(changeMailResult.message);
      setSuccessMessage1("");
      return;
    }

    // Перехід на сторінку підтвердження
    // Ви можете передати дані користувача та код через navigate або контекст
    const newUserData = { email };
    updateUserData(newUserData);
    userData.email = email;

    console.log(email, userData);
    setErrorMessage1("");
    setEmail("");
    setPassword1("");
    setSuccessMessage1(changeMailResult.message);
  };

  return (
    <Page>
      <BackButton />
      <div className="settings__title">
        <h2>Settings</h2>
      </div>

      <div className="settings__form">
        <div className="settings__subtitle">Change email</div>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Емейл"
          isValid={isValidEmail}
        />
        <PasswordInput
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Старий Пароль"
          isValid={true}
        />

        <Button onClick={handleChangeMail} type="button-white button-small">
          Save Email
        </Button>
        {errorMessage1 && (
          <div className="settings__error">{errorMessage1}</div>
        )}
        {successMessage1 && (
          <div className="settings__success">{successMessage1}</div>
        )}
      </div>
      <Break />
      <div className="settings__form">
        <div className="settings__subtitle">Change password</div>
        <PasswordInput
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Старий Пароль"
          isValid={true}
        />
        <PasswordInput
          type="password"
          value={password3}
          onChange={(e) => setPassword3(e.target.value)}
          placeholder="Новий Пароль"
          isValid={isValidPassword}
        />

        <Button onClick={handleChangePassword} type="button-white button-small">
          Save Password
        </Button>
        {errorMessage2 && (
          <div className="settings__error">{errorMessage2}</div>
        )}
        {successMessage2 && (
          <div className="settings__success">{successMessage2}</div>
        )}
      </div>
      <Break />
      <Button onClick={handleLogOut} type="button-danger button-small">
        Log Out
      </Button>
    </Page>
  );
};

export default SettingsPage;
