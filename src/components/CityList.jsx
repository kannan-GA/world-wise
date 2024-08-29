import Cityitem from "./Cityitem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

/* eslint-disable react/prop-types */
function CityList({ useCities }) {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {cities && cities.map((city) => <Cityitem city={city} key={city.id} />)}
    </ul>
  );
}

export default CityList;
