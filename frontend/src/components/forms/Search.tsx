import React, {useContext} from 'react';
import {InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {HeaderContext} from "../Context";

const Search = () => {
    const {search, setSearch} = useContext(HeaderContext);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <TextField
            fullWidth
            id="search"
            label="Search"
            type="search"
            variant="filled"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default Search;
