import Card from 'react-bootstrap/Card';

export const CustomCard = (props)=>{
    return(
        <Card
          bg={"dark"}
          key={"dark"}
          text={'white'}
          border={"light"}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                ....
            </Card.Text>
          </Card.Body>
        </Card>
    )
} 