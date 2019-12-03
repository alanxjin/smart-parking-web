import React , { Component } from 'react';
import { Segment, Card, Image, Icon} from 'semantic-ui-react';
import mapImage from "../map.png"
import { db } from "./firebase-init"

export default class MyMeter extends Component{
    state={
        slots: [],
        time: 0
    }

    componentDidMount(){
        db.collection('slots').get().then(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            this.setState({slots: data});
        });
    }

    getTime = (slot) => {
        if (slot){
            var start_time = slot['start_time']
            var tempTime = new Date();
            var currentSeconds = (tempTime.getHours()*3600 + tempTime.getMinutes()*60 + tempTime.getSeconds());
            var startSeconds = Number(start_time.slice(0, 2))*3600 + Number(start_time.slice(3, 5))*60 + Number(start_time.slice(6, 8));
            var seconds = currentSeconds - startSeconds;
            const hour = String(Math.floor(seconds / 3600)).padStart(2,'0');
            const minute = String(Math.floor(seconds % 3600 / 60)).padStart(2,'0');
            const second= String(Math.floor(seconds % 3600 % 60)).padStart(2,'0');
            return `${hour}:${minute}:${second}`;
        } 
        else{
            return '00:00:00'
        }       
    }

    calculateFee = (time) => {
        var hour = Number(time.slice(0, 2));
        var minute = Number(time.slice(3, 5));
        var second = Number(time.slice(6, 8));
        var seconds = hour*3600 + minute*60 + second;
        
        const rate = 0.002;
        return (rate * seconds).toFixed(2)
    }
   

    render() {
        const {slots} = this.state;
        const slotSelected = slots.filter((slot) => slot['availability'] === 0)[0];
        const timeString = this.getTime(slotSelected);
        const fee = this.calculateFee(timeString);
        
        
        return (
            <Segment attached id="my-meter">
                <div id="slot-detail">
                    { slotSelected && <Card color={slotSelected["availability"] === 1? "green": "red"}>
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
                    }
                </div>
            </Segment>
        )
    }
  
}


