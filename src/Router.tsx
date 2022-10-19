import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SurveyStart from "pages/SurveyStart/SurveyStart";
import SurveyContents from "pages/SurveyContents/SurveyContents";
import SurveyCompletion from "pages/SurveyCompletion/SurveyCompletion";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyStart />} />
        <Route path="/contents" element={<SurveyContents />} />
        <Route path="/completion" element={<SurveyCompletion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
