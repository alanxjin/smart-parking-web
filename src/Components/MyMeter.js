import React , { Component } from 'react';
import { Segment, Card, Image, Icon} from 'semantic-ui-react';
import mapImage from "../map.png"

export default class MyMeter extends Component{
    state={
        slotSelected: {"id": "slot3", "location": {"lat": -36.239, "lng": 150.839}},
        time: 0
    }

   
    convertSecondToString = (seconds)=>{
        const hour = String(Math.floor(seconds / 3600)).padStart(2,'0');
        const minute = String(Math.floor(seconds % 3600 / 60)).padStart(2,'0');
        const second= String(Math.floor(seconds % 3600 % 60)).padStart(2,'0');

        return `${hour}:${minute}:${second}`;
    }

    calculateFee = (seconds) => {
        const rate = 0.02;
        return rate * seconds
    }
   

    render() {
        
        const {slotSelected} = this.state;
        const timeString = this.convertSecondToString(this.props.time);
        const fee = this.calculateFee(this.props.time);
        return (
            <Segment attached id="my-meter">
                <div id="slot-detail">
                    <Card color={slotSelected["availability"] === 1? "green": "red"}>
                        <Image src={mapImage}></Image>
                        <Card.Content>
                            <Card.Header><Icon name='product hunt'/>{slotSelected["id"]}</Card.Header>
                            <Card.Meta>
                                <span className='location'>{"lat: " + slotSelected["location"]["lat"]+ ", lng: "+slotSelected["location"]["lng"]}</span>
                            </Card.Meta>
                            <Card.Description>
                                <p>Parking Time: {timeString}</p>
                                <p>Fee: ${fee}</p>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            </Segment>
        )
    }
  
}


