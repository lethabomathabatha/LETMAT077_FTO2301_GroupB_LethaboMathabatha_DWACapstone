import '/src/pages/SearchStyles.css'
import '/src/pages/HomeStyles.css'

import BottomNav from "../components/BottomNav"

import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"


export default function Search() {


    return (
        <div className="search">
            Hello World

            <TextField
                className="home--search"
                
                color="secondary"
                
                placeholder="Search"
                size="small"

                InputProps={{ 
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />

                    </InputAdornment>
                ),
                }}
            /> 

            <BottomNav />
        </div>
    )
}