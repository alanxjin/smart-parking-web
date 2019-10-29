import React , { Component } from 'react';
import { Segment, Card, Icon,Label,Image} from 'semantic-ui-react';
import { usePosition } from 'use-position';
import mapImage from "../map.png";
import { db } from "./firebase-init"

export default class Home extends Component{
    state = {
        slots: [],
        slotSelectedId: 'slot1'
    }
    componentDidMount(){
        db.collection('slots').get().then(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            this.setState({slots: data});
        });
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
                    <Position></Position>
                </div>
                <div id="slot-info">
                    <div id="slots"> 
                        {slotElements}
                    </div>
                    <div id="slot-detail">
                        {slots && slotSelected && <Card color={slotSelected["availability"] === 1? "green": "red"}>
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
                        }
                    </div>
                </div>
            </Segment>
        )
    }
  
}


const Position = () => {
    const { latitude, longitude} = usePosition();
    return (
        <>
            <Label>{latitude}</Label> <Label>{longitude}</Label>  
        </>
    );
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