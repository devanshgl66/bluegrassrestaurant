import React, { useState } from 'react'
import Container from 'reactstrap/lib/Container'
import Book from './Book'
import Main from './Main'
import NavBar from './Navbar'
import Thankyou from './Thankyou'

const BookingMainPage = () => {
    const [page, setpage] = useState(1)
    return (
        <Container>
            <NavBar setpage={setpage}/>
            {page===0?<Main setpage={setpage}/>:null}
            {page===1?<Book setpage={setpage}/>:null}
            {page===2?<Thankyou/>:null}
        </Container>
    )
}

export default BookingMainPage
