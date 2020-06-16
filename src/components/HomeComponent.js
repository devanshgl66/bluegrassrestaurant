import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from '../components/Loading'
function RenderCard(props) {
    var isLoading=props.isLoading,
        item=props.item,
        errMsg=props.errMsg
        console.log(props)
    if (isLoading)
        return(
            <Loading/>
        )
    else if (errMsg)
        return(
            <h4>{errMsg}</h4>
        )
    else 
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );

}

function Home(props) {
    console.log('home') 
    console.log(props)
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                        isLoading={props.isLoading} 
                        errMsg={props.errMsg}
                    />
                    {/* <p>{props.dish.name}</p> */}
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;