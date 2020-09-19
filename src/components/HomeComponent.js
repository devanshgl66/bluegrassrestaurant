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
        let height=4;
        if(item.designation)
            height--;
        return(
            <Card >
                <FadeTransform in  
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <CardImg style={{height:'275px',objectFit:'cover'}}
                    src={BaseUrl + item.image} alt={item.name}/>
                    <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>: null }
                    <CardText 
                    style={{overflow:"hidden",WebkitLineClamp:height,textOverflow:"ellipsis",display:"-webkit-box",WebkitBoxOrient:"vertical"}}
                    >
                        {item.description}
                    </CardText>
                    </CardBody>
                </FadeTransform>
             </Card>
           
        );
    }
    else{
        return(<div></div>)
    }

}

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start card-deck">
                <RenderCard item={props.dish}
                    isLoading={props.dishesLoading} 
                    errMsg={props.dishErrMess} 
                    className="col-12 col-md m-1"
                />
                <RenderCard className="col-12 col-md m-1" 
                    item={props.promotion}
                    isLoading={props.promoLoading} 
                    errMess={props.promoErrMess}
                />
                <RenderCard item={props.leader}  
                    className="col-12 col-md m-1"
                    isLoading={props.leaderLoading}
                    errMsg={props.leaderMsg}
                />
            </div>
        </div>
    );
}

export default Home;