import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from '../components/Loading'
import { BaseUrl } from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components'
function RenderCard(props) {
    var isLoading=props.isLoading,
        item=props.item,
        errMsg=props.errMsg;
    if (isLoading)
        return(
            <Loading/>
        )
    else if (errMsg)
        return(
            <h4>{errMsg}</h4>
        )
    else if(item){
        return(
            <FadeTransform in  
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg src={BaseUrl + item.image} alt={item.name}/>
                <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }
    else{
        return(<div></div>)
    }

}

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading} 
                        errMsg={props.dishErrMess}
                    />
                    {/* <p>{props.dish.name}</p> */}
                </div>
                <div className="col-12 col-md m-1">
                <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} 
                        isLoading={props.leaderLoading}
                        errMsg={props.leaderMsg}/>
                </div>
            </div>
        </div>
    );
}

export default Home;