import {AsyncPaginate} from "react-select-async-paginate";
import {useState} from "react";
// import {loadOptions} from "@babel/core";
import {GEO_API_URL, geoApiOptions} from "../../api";

const Search = ({onSearchChange}) =>{

    const [search, setSearch] = useState(null);

    const loadOptions =  (inputValue) =>{
        return fetch(
                `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
                geoApiOptions)
            .then((response) => response.json())
                .then((response) => {
                    return {
                        options: response.data.map((city) => {
                            return {
                                value: `${city.latitude} ${city.longitude}`,
                                label: `${city.name}, ${city.countryCode}`,
                            }
                        })
                    }
                })
                .catch(error => console.log(error));

    }

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;