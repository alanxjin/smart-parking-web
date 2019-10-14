import React , { Component } from 'react';

import { Segment, Card, Icon,Label,Image} from 'semantic-ui-react';
import mapImage from "../map.png"

export default class Home extends Component{
    state = {
        slots: [
            {"id": "slot1", "location": {"lat": -34.397, "lng": 150.644}, "availability": 0},
            {"id": "slot2", "location": {"lat": -35.648, "lng": 150.374}, "availability": 1},
            {"id": "slot3", "location": {"lat": -36.239, "lng": 150.839}, "availability": 0},
            {"id": "slot4", "location": {"lat": -37.397, "lng": 150.239}, "availability": 1}
        ],
        slotSelectedId:"slot1"
    }
    selectSlotbyId = (slotId) => {
        this.setState({slotSelectedId:slotId});
    }
    render() {
        const {slots, slotSelectedId} = this.state;
        const slotSelected = slots.filter((slot)=> slot["id"] === slotSelectedId)[0];
        let slotElements = [];
        slots.forEach((slot) => {
            slotElements.push(<SlotCard key={slot["id"]} slot={slot} selectSlotbyId={this.selectSlotbyId}/>);
        })
        return (
            <Segment attached id="home">
                <div id="my-location">
                    <Icon name='location arrow' />
                    <Label>lat: -34.397</Label> <Label>lng: 150.644</Label>
                </div>
                <div id="slot-info">
                    <div id="slots"> 
                        {slotElements}
                    </div>
                    <div id="slot-detail">
                        <Card color={slotSelected["availability"] === 1? "green": "red"}>
                            <Image src={mapImage}></Image>
                            <Card.Content>
                                <Card.Header><Icon name='product hunt'/>{slotSelected["id"]}</Card.Header>
                                <Card.Meta>
                                    <span className='location'>{"lat: " + slotSelected["location"]["lat"]+ ", lng: "+slotSelected["location"]["lng"]}</span>
                                </Card.Meta>
                                <Card.Description>
                                    Availability: {slotSelected["availability"] === 1? "Empty": "Occuppied"}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            </Segment>
        )
    }
  
}


const SlotCard = (props) => {
    
    return (
        <Card onClick={() => props.selectSlotbyId(props.slot["id"])} color={props.slot["availability"] === 1? "green": "red"}>
            <Card.Content>
            <Card.Header><Icon name='product hunt' />{props.slot["id"]}</Card.Header>
            <Card.Meta>
                <span className='location'>{"lat: " + props.slot["location"]["lat"]+ ", lng: "+props.slot["location"]["lng"]}</span>
            </Card.Meta>
            
            </Card.Content>
        </Card>
    )
}