import React, {Component} from 'react'
import './search.scss'
import axios from 'axios'
import swal from 'sweetalert2'

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            searchResults: [],
            toggleSearch: false
        }
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value,
            toggleSearch: false
        });
    };
    handleSearch() {
        if (this.state.username !== '') {
            axios.get(`/api/users?username=${this.state.username}`).then(res => {
                // console.log(res.data)
                this.setState({
                    searchResults: res.data,
                    toggleSearch: !this.state.toggleSearch
                })
            })
        } else {
            swal.fire({type: 'error' , text: 'Please input a username to search for user' , showConfirmButton: false, timer: 1000})
        }
    }
    handleAdd(user_id) {
        axios.post(`/api/friends/${+user_id}`).then(res => {
            swal.fire({type: 'info' , text: res.data.message.text , showConfirmButton: false, timer: 1000})
        })
    }
    render() {
        return(
            <div className='Search'>
                <div className="friendInput">
                <p>Search For Friends:</p>
                <div className="searchInput">
                    <input onChange={(e) => this.handleChange(e, "username")} type="text" placeholder="Search"/>
                    <button className='zulu' onClick={() => this.handleSearch()}>Search</button>
                </div>
                </div>
                {this.state.toggleSearch ? (
                    <div className="searchResults">
                    {
                        this.state.toggleSearch ? (
                            this.state.searchResults.map(searchResults => {
                                return (
                                    <div className='results'>
                            <div className="ListOfUsers">
                                {`${searchResults.username}`}
                                <button className='kilo' onClick={() => this.handleAdd(searchResults.user_id)}>Add Friend</button>
                            </div>
                        </div>
                        )
                    })
                    ) : null
                }
                    </div>
                ) : null
                }
        </div>
        )
    }
}
