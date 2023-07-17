import '/src/pages/SearchStyles.css'
import '/src/pages/HomeStyles.css'

import BottomNav from "../components/BottomNav"

import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"


export default function Search() {


    return (
        <div className="search--page">
            <p className="search--header">Search For The Next <strong>Best Podcast </strong>You've Ever Heard</p>

            <TextField
                className="home--search-field"
                color="secondary"
                placeholder="Search"
                size="medium"
                variant="standard"
                InputProps={{ 
                startAdornment: (
                    <SearchIcon />
                ),
                }}
            /> 

            <BottomNav />
        </div>
    )
}