import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContent = createContext();
const initialValue = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  // console.log(state, action);
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        // here we are sync Remote state (from api) with UI state
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action Type");
  }
}

function CitiesContext({ children }) {
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentCity, setCurrentState] = useState({});

  const [state, dispatch] = useReducer(reducer, initialValue);
  const { cities, isLoading, currentCity, error } = state;
  const BASE_URL = "http://localhost:3000";

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `Error deleting city: ${error.message}`,
        });
      }
    }

    fetchCities();
  }, []);

  const getCities = useCallback(
    async function getCities(id) {
      //id geting from url so it always give string so we have to convert TO NUMBER

      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `Error deleting city: ${error.message}`,
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });

      console.log(data);
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `Error deleting city: ${error.message}`,
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      dispatch({ type: " city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `Error deleting city: ${error.message}`,
        error,
      });
    }
  }

  return (
    <div>
      <CitiesContent.Provider
        value={{
          cities: cities,
          isLoading: isLoading,
          currentCity: currentCity,
          getCities: getCities,
          createCity: createCity,
          deleteCity: deleteCity,
        }}
      >
        {children}
      </CitiesContent.Provider>
    </div>
  );
}

function useCities() {
  const context = useContext(CitiesContent);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesContext, useCities };
