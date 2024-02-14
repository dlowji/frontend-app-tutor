import React, { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import AuthService from "./api/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { storeAccessToken, storeRefreshToken } from "./store/slices/authSlice";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainContent from "./components/layout/MainContent";
import SendEmailPage from "./pages/SendEmailPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const authService = new AuthService();
    const tokenData = await authService.getTokens();
    console.log(tokenData);
    if (!tokenData) return;
    const { access_token, refresh_token } = tokenData;
    dispatch(storeAccessToken(access_token));
    dispatch(storeRefreshToken(refresh_token));
  });
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/send-email">
          <Route path=":id" element={<SendEmailPage />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />}></Route>
    </Routes>
  );
};
export default App;
