import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
// const CityList = lazy(() => import("./components/CityList"));
// const CountryList = lazy(() => import("./components/CountryList"));
// const City = lazy(() => import("./components/City"));
// const Form = lazy(() => import("./components/Form"));
// const NotFound = lazy(() => import("./components/NotFound"));
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import { CitiesContext, useCities } from "./context/CitiesContext";
import { FakeAuthContext } from "./context/FakeAuthContext";
import RouteProtected from "./pages/RouteProtected";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <div>
      <FakeAuthContext>
        <BrowserRouter>
          <CitiesContext>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="app"
                  element={
                    <RouteProtected>
                      <AppLayout />
                    </RouteProtected>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="cities" />}
                  ></Route>
                  <Route
                    path="cities"
                    element={<CityList useCities={useCities} />}
                  ></Route>
                  <Route path="cities/:id" element={<City />} />
                  <Route
                    path="countries"
                    element={<CountryList useCities={useCities} />}
                  ></Route>
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </CitiesContext>
        </BrowserRouter>
      </FakeAuthContext>
    </div>
  );
}

export default App;
