import { useEffect, useState } from "react"
import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY

const Weather = ( {weather, countryName} ) => {
  if (weather) {
    console.log(weather)
    return (
      <div>
        <h2>
          Weather in {countryName}
        </h2>
        <p>Temperature: {weather.main.temp} </p>
        <p>Weather: {weather.weather[0].description} </p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon of the weather"/>
      </div>
    )
  }
  return null
}

const CountryList = ({ countries, search, country, setCountry }) => {

  const [weather, setWeather] = useState(null)

  if (search === '') return <div><p> Do search </p></div>

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  
  const handleClick = (country) => {
    setCountry(country)
    const [lat, lng] = country.latlng
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
      .then(response => setWeather(response.data))
  }

  if (countriesToShow.length > 10) {
    return (
      <div>
        <p> Too many matches specify another filter </p>
      </div>
    )
  }
  else {
    if (country) {
      const languages = Object.values(country.languages)
      return (
        <div>
          <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital} </p>
            <p>FIFA: {country.fifa} </p>
            <p>Area Code: {country.area}</p>
          </div>
          <div>
            <h2>Languages</h2>
            <ul>
              {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
          </div>
          <div>
            <img src={country.flags.png} alt="flag of the country" />
          </div>
          <Weather weather={weather} countryName={country.name.common}/>
        </div>
      )
    }
    return (
      <div>
        {countriesToShow.map(country => (
          <div key={country.name.official}>
            <p>{country.name.common} </p>
            <button onClick={() => handleClick(country)}> Show </button> 
          </div>
        ))}
      </div>
    )
    
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCountry(null)
  }

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then(response => {
      setCountries(response.data)})
  }, [])

  return (    
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <CountryList countries={countries} search={search} country={country} setCountry={setCountry} />
    </div>
  )
}

export default App
