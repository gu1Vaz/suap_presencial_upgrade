import Card from 'react-bootstrap/Card';

export const CustomCard = (props)=>{
    return(
        <Card
          bg={"dark"}
          key={"dark"}
          text={'white'}
          border={"light"}
          style={{ width: '16rem', minHeight:'7rem' }}
          className="m-1"
        >
          <Card.Body>
            <Card.Title style={{fontSize:'17px'}}>{props.title}</Card.Title>
            <Card.Text>
                {props.data}
            </Card.Text>
          </Card.Body>
        </Card>
    )
} 